const { unlinkSync } = require("fs");
const { fn } = require("sequelize");
const { BASE_URL } = require("../configs/config");
const { Competition, Participant, ParticipantMember, User, Member, SubTheme, Invoice } = require("../models");
const { Op } = require("../models/db");
const jsonResponse = require("../utils/jsonResponse");
const fs = require('fs')
const { fileUploadHandler, isFormatValid } = require("../utils/uploadFile");

// @desc    Get all available competition
// @route   GET /competition/
// @access  Public
exports.getAll = async (req, res) => {
    const where = req.query.where
    const me = req.query.me
    const available = req.query.available

    var condition = where ? {
        [Op.or]: [
            { title: { [Op.like]: `%${where}%` } },
            { category: { [Op.like]: `%${where}%` } },
        ],
        [Op.and]: [
            { visible: { [Op.eq]: true } },
        ]
    } : null;


    var getMe = me ? { id: { [Op.eq]: me } } : available ? { id: { [Op.ne]: available } } : null

    var includeMember = (me || available) ? [{
        model: Member,
        as: 'member',
        where: getMe
    }] : null


    await Competition.findAll({
        where: condition,
        include: includeMember,
        order: [['register_start', 'ASC']]
    })
        .then((data) => {

            return res.status(200).json(data)
        })
        .catch((err) => {
            return res.status(500).json({
                message: err.message
            })
        })

}


exports.getCompetitionAndParticipant = async (req, res) => {
    const id = req.params.competitionId


    await Competition.findOne({
        where: {
            id: id,
            visible: true
        },
        include: [{
            model: SubTheme,
            attributes: ['name']
        }, {
            model: Member,
            as: 'member',
        }]
    })
        .then((data) => {
            if (!data) {
                return res.status(404).json({
                    success: true,
                    message: "Competition not found"
                })
            }

            return res.status(200).json(data)
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                errors: {
                    message: err.message,
                    stack: err.stack
                }
            })
        })
}

// @desc    Get selected competition
// @route   GET /competition/:id
// @access  Public
exports.getCompetition = async (req, res) => {
    const id = req.params.competitionId


    await Competition.findOne({
        where: {
            id: id
        },
        include: [{
            model: SubTheme,
            attributes: ['name']
        }]
    })
        .then((data) => {
            if (!data) {
                return res.status(404).json({
                    success: true,
                    message: "Competition not found"
                })
            }

            return res.status(200).json(data)
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                errors: {
                    message: err.message,
                    stack: err.stack
                }
            })
        })
}



// @desc    Get selected competition
// @route   POST /competition/
// @access  Private Moderator only
exports.createCompetition = async (req, res) => {
    const {
        title, description, fee, category, paymentMethod, type,
        minParticipant, maxParticipant,
        registerStart, registerDue, startDate, endDate,
    } = req.body
    const subTheme = req.body.subTheme

    await Competition.create({
        title: title,
        description: description,
        entry_fee: fee,
        payment_method: paymentMethod,
        type: type,
        category: category,
        min_participant: minParticipant,
        max_participant: maxParticipant,
        register_start: registerStart,
        register_due: registerDue,
        start_date: startDate,
        end_date: endDate,
        visible: true
    })
        .then(async (data) => {
            let theme = await setSubTheme({
                competitionId: data.id,
                subThemes: subTheme
            })

            return res.status(201).json(
                jsonResponse(true, "Competition created!", {
                    competition: data,
                    subTheme: theme
                })
            )
        })
        .catch((err) => {
            return res.status(422).json(
                jsonResponse(false, "Failed to create competition", { message: err.message, stack: err.stack })
            )
        })

}







// @desc    Enroll competition
// @route   POST /competition/:competitionId/enroll/:participantId
// @access  Private owner only
exports.enrollTeamMember = async (req, res) => {
    let user = await User.findOne({
        where: { id: req.user.id }
    })

    const teamName = req.body.teamName
    if (!user) {
        return res.status(401).json(
            jsonResponse(false, "Please login before enrolling a competition!")
        )
    }

    let competition = await Competition.findOne({ where: { id: req.params.competitionId } })

    let enroll
    const payload = {
        competitionId: req.params.competitionId,
        userId: user.id,
        teamName: teamName,
        teamMembers: req.body.memberName
    }
    try {
        enroll = await enrollTeam(payload)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    let upload
    try {
        upload = await fileUploadHandler({
            file: req.file,
            nameFormat: `IDCARDS_PARTICIPANT_[${teamName}]_IDCARDS_[${competition.id}]_[${user.id}]`,
            folder: `participantCard/${competition.category}`,
            formats: ['pdf']
        })
    } catch (error) {
        req.file.path ? unlinkSync(req.file.path) :
            res.json({ message: error.message })
        enroll.destroy()
    }

    payload.participantId = enroll.id

    let status = (competition.payment_method === 'FREE') ? 'ACTIVE' : 'ENROLLED'

    await enroll.update({
        status: status,
        card_file: upload.filename
    })

    let setTeam = await setTeamMembers(payload)

    return res.json({
        enroll: enroll,
        team_member: setTeam
    })
}

exports.getTeamDetail = async (req, res) => {
    await Participant.findOne({
        where: {
            competitionId: req.params.competitionId,
            memberId: req.params.memberId
        },
        include: [{
            model: ParticipantMember,
            attributes: ['name']
        }]
    })
        .then(data => {
            if (!data) return res.json({ message: "Participant not enroll this competition" })

            return res.json(data)
        })
}


exports.getMyEnrollStatus = async (req, res) => {
    let user = await User.findOne({
        where: { id: req.user.id }
    })

    if (!user) {
        return res.status(401).json(
            jsonResponse(false, "Please login!")
        )
    }

    let member = await Member.findOne({
        where: { userId: user.id }
    })

    if (!member) {
        return res.status(401).json(
            jsonResponse(false, "Could not find member!")
        )
    }

    let competition = await Competition.findOne({
        where: { id: req.params.competitionId }
    })

    if (!competition) {
        return res.status(401).json(
            jsonResponse(false, "Could not find competition!")
        )
    }

    const url = BASE_URL + `public/uploads/participantCard/${competition.category}/`

    await Participant.findOne({
        where: {
            competitionId: competition.id,
            memberId: member.id
        },
        include: [{
            model: ParticipantMember,
            attributes: ['name']
        }]
    })
        .then(data => {
            if (!data) return res.json({ message: "Participant not enroll this competition" })
            return res.json(data)
        })
}


exports.getAllCard = async (req, res) => {
    let competition = await Competition.findOne({
        where: { id: req.params.competitionId }
    })

    if (!competition) return res.status(404).json({ message: 'Competition not found!' })

    const directoryPath = __basedir + `/public/uploads/participantCard/${competition.category}/`

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send({
                message: "Unable to scan files!",
            });
        }


        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: BASE_URL + `public/uploads/submission/${competition.category}/${competition.id}/` + encodeURIComponent(file.trim()),
            });
        });

        return res.status(200).send(fileInfos);
    });


}

exports.getOneCard = async (req, res) => {
    let card = await Participant.findOne({
        where: {
            [Op.and]: [
                { competitionId: req.params.competitionId },
                { memberId: req.params.memberId }
            ]
        },
        include: [
            { model: Member, as: 'member' },
            { model: Competition, as: 'competition' }
        ]
    })
        .then(data => {
            let fileInfo = {
                name: data.card_file,
                url: BASE_URL + `public/uploads/participantCard/${data.competition.category}/` + encodeURIComponent(data.card_file.trim()),
            }

            return fileInfo
        })
        .catch(err => {
            return res.status(500).json(err)
        })

    return res.json(card)
}



const enrollTeam = async (payload) => {


    let competition = await Competition.findOne({
        where: { id: payload.competitionId }
    })

    if (!competition) throw new Error('Competition not found')

    let member = await Member.findOne({
        where: { userId: payload.userId }
    })

    if (!member) {
        throw new Error('Only member can join')
    }

    let isParticipating = await Participant.findAndCountAll({
        where: [
            { memberId: member.id },
            { competitionId: payload.competitionId }
        ]
    })

    if (isParticipating.count > 0) {
        throw new Error('You already joined')
    }

    let payement_method = competition.getDataValue('payment_method')
    let isAllowedToJoin

    if (payement_method === 'REQUIRED') {
        isAllowedToJoin = false

    }

    if (payement_method === 'FREE') {
        isAllowedToJoin = true
    }

    if (payement_method === 'LATER') {
        isAllowedToJoin = true
    }

    return await Participant.create({
        allowedToJoin: isAllowedToJoin,
        team_name: payload.teamName,
        memberId: member.id,
        competitionId: competition.id
    })

}

const setSubTheme = async (payload) => {
    let themes = payload.subThemes

    let isAnArray = (Array.isArray(payload.subThemes))

    if (!isAnArray) {
        themes = new Array(payload.subThemes)
    }

    let theme = themes.map(name => ({
        competitionId: payload.competitionId,
        name: name
    }))

    try {
        return await SubTheme.bulkCreate(theme)
    } catch (error) {
        throw new Error(error.message)
    }

}

const setTeamMembers = async (payload) => {
    let members = payload.teamMembers
    let isAnArray = (Array.isArray(payload.teamMembers))

    if (!isAnArray) {
        members = new Array(payload.teamMembers)
    }

    let member = members.map(name => ({
        participantId: payload.participantId,
        name: name
    }))

    try {
        return await ParticipantMember.bulkCreate(member)
    } catch (error) {
        throw new Error(error.message)
    }
}


