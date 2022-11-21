const asyncHandler = require('express-async-handler')
const fs = require("fs");
const path = require('path');
const { Op, fn, col, UUIDV4 } = require("sequelize");
const { BASE_URL, __BASEDIR } = require('../../configs/config');
const { fileUploadHandler } = require('../../middlewares/fileHandler');

const { Competition, Participant, Invoice, Member, ParticipantMember, MemberNotification, SubTheme, Submission } = require("../../models");

exports.getEnrollmentData = asyncHandler(async (req, res) => {
    const { competition, member, enroll, isEnrolled, cardFile, messages, submission, isSubmitted } = await enrollMiddlewares(req, res)

    res.status(200)
    return res.json({ member, competition, enroll, isEnrolled, file: cardFile, messages, submission, isSubmitted })
})

exports.enrollCompetiton = asyncHandler(async (req, res) => {
    const { competition, member, enroll, isEnrolled, canRegister } = await enrollMiddlewares(req, res)

    if (!canRegister) {
        res.status(403)
        throw new Error('Registration Closed!')
    }

    if (isEnrolled) {
        res.status(403)
        throw new Error('Already Enrolled!')
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
        isAllowedToJoin = false
    }

    const createEnroll = await Participant.create({
        memberId: member.id,
        competitionId: competition.id,
        status: 'PENDING',
        allowedToJoin: isAllowedToJoin
    })
        .catch(err => { throw err })

    return res.json(createEnroll)
})

exports.uploadEnrollCard = asyncHandler(async (req, res) => {
    const { competition, member, enroll, isEnrolled } = await enrollMiddlewares(req, res)

    if (!isEnrolled) {
        res.status(403)
        throw new Error('Plese enroll first!')
    }

    const teamName = enroll?.team_name ? enroll?.team_name : member.name

    const upload = await fileUploadHandler({
        files: req.file,
        nameFormats: `IDCARDS_PARTICIPANT_[${teamName}]_[${competition.title}]_[${competition.category}]_[${member.name}]`,
        folders: `participantCard/${competition.category}`,
        fileFormats: ['pdf']
    })

    await enroll.update({
        card_file: upload.filename,
        status: 'ENROLLED',
    })

    const newMessage = await upsertMessage({
        competitionId: competition.id,
        memberId: member.id,
        about: 'ENROLLMENT',
        type: 'NEW',
        messages: '',
        actions: 'DELETE'
    })

    return res.json({ message: 'Upload card successfull', data: enroll })
})

exports.removeEnrollCard = asyncHandler(async (req, res) => {
    const { competition, member, enroll, isEnrolled, filePath } = await enrollMiddlewares(req, res)

    if (!isEnrolled) {
        res.status(403)
        throw new Error('Plese enroll first!')
    }

    if (!filePath) {
        res.status(403)
        throw new Error('Plese upload first!')
    }
    let msgs

    try {
        fs.unlinkSync(filePath)
        msgs = 'Successfully remove file'
    } catch (error) {
        throw error
    }

    await enroll.update({
        card_file: '',
        status: 'PENDING'
    })
        .catch(err => { throw err })

    return res.status(200).json({
        message: msgs,
        data: enroll
    })
})

const upsertTeamParticipant = async (ids, names, phones, participantIds) => {
    if (!ids && !names && !phones) { return }



    let newNames = names
    let newIds = ids
    let newphones = phones
    let isAnArray = (Array.isArray(names)) && (Array.isArray(ids)) && (Array.isArray(phones))

    if (!isAnArray) {
        newNames = new Array(newNames)
        newIds = new Array(newIds)
        newphones = new Array(phones)
    }

    let teamParticipants = newNames.map((name, index) => {
        return {
            name: newNames[index],
            phone: newphones[index],
            participantId: participantIds
        }
    })


    await ParticipantMember.destroy({
        where: { participantId: { [Op.eq]: participantIds } }
    }).then()
        .catch(err => { throw err })

    const team_members = await ParticipantMember.bulkCreate(teamParticipants)
        .catch(err => { throw err })

    return team_members
}


exports.updateEnrollData = asyncHandler(async (req, res) => {
    const { competition, member, enroll, isEnrolled } = await enrollMiddlewares(req, res)
    const { team_name, mentor_name, mentor_number,
        members_name, members_phone, members_ids } = req.body

    if (!isEnrolled) {
        res.status(403)
        throw new Error('Plese enroll first!')
    }

    const upsert = await upsertTeamParticipant(members_ids, members_name, members_phone, enroll.id)

    await enroll.update({
        team_name: team_name,
        mentor_name: mentor_name,
        mentor_number: mentor_number
    })
        .catch(err => { throw err })

    return res.json({ ...enroll.dataValues, team_members: upsert })
})


exports.updateStatus = asyncHandler(async (req, res) => {
    const { competition, member, enroll, isEnrolled, messages } = await enrollMiddlewares(req, res)
    const { message, actions } = req.body

    const rejects = actions === 'REJECT' ? true : false
    const accepts = actions === 'ACCEPT' ? true : false

    if (rejects) {
        const updateEnroll = await enroll.update({
            status: 'PENDING'
        })
        const newMessage = await upsertMessage({
            competitionId: competition.id,
            memberId: member.id,
            about: 'ENROLLMENT',
            type: 'DENIED',
            messages: message
        })

        return res.json({ messages: 'Successfully rejected request', team: updateEnroll, notify: newMessage })
    }

    if (accepts) {
        const updateEnroll = await enroll.update({
            status: 'ACTIVE'
        })
        const newMessage = await upsertMessage({
            competitionId: competition.id,
            memberId: member.id,
            about: 'ENROLLMENT',
            type: 'ACCEPTED',
            messages: message
        })

        return res.json({ message: 'Successfully accepts request', team: updateEnroll, notify: newMessage })
    }

    res.status(422)
    throw new Error('Please enter an action')

})

const upsertMessage = async ({ competitionId, memberId, about, type, messages, actions }) => {
    return await MemberNotification.findOne({
        where: { competitionId: competitionId, memberId: memberId, about: about }
    })
        .then(async (data) => {
            if (data && actions === 'DELETE') {
                data.destroy()
                return
            }

            if (actions === 'DELETE') {
                return
            }

            if (data) return await data.update({
                message: messages,
                type: type
            })

            return await MemberNotification.create({
                competitionId: competitionId,
                memberId: memberId,
                about: about,
                type: type,
                message: messages
            })
        })
        .catch(err => { throw err })
}

const enrollMiddlewares = async (req, res) => {
    const competitionId = req.params.competitionId
    const memberId = req.params.memberId

    const competition = await Competition.findOne({
        where: { id: competitionId },
        include: [{ model: SubTheme }]
    })

    if (!competition) {
        res.status(404)
        throw new Error('Competition not Found')
    }

    const member = await Member.findOne({
        where: { id: memberId }
    })

    if (!member) {
        res.status(404)
        throw new Error('Member not found')
    }

    const enroll = await Participant.findOne({
        where: [
            { competitionId: { [Op.eq]: competitionId } },
            { memberId: { [Op.eq]: memberId } }
        ],
        include: [{
            model: ParticipantMember, as: 'team_members'
        }]
    })
        .catch(err => {
            res.status(500)
            throw err
        })

    const submission = await Submission.findOne({
        where: { participantId: enroll.id }
    }).catch(err => {
        res.status(500)
        throw err
    })

    let msgs = []

    const { isRegisterOpen } = checkCompetitionDates({ competition: competition })
    const canRegister = isRegisterOpen

    const messages = await MemberNotification.findOne({
        where: { competitionId: competitionId, memberId: memberId, about: 'ENROLLMENT' }
    })
        .then(data => {
            if (data) {
                msgs.push(data)
            }
            return data
        })
        .catch(err => { throw err })

    const isEnrolled = enroll ? true : false
    const isSubmitted = submission ? true : false

    const hasNullMessage = checkEmptyEnrollFields({ enrollData: enroll })

    hasNullMessage.map(col => {
        msgs.push({
            type: 'MISSING_VALUES',
            field: col,
        })
    })


    const cardFile = enroll?.card_file ? `${BASE_URL}public/uploads/participantCard/${competition.category}/${encodeURIComponent(enroll.card_file.trim())}` : null
    const filePath = enroll?.card_file ? path.join(__BASEDIR, 'public/uploads/participantCard', competition.category, enroll.card_file) : null

    return {
        competition,
        member,
        enroll,
        isEnrolled,
        messages: msgs,
        canRegister,
        cardFile,
        filePath,
        isSubmitted,
        submission
    }
}



const checkEmptyEnrollFields = ({ enrollData }) => {

    let emptyCols = []

    const checkNull = (target) => {
        for (var key in target) {
            if (target[key] === null)
                emptyCols.push(key)
        }
    }

    if (enrollData) {
        checkNull(enrollData.dataValues)
    }

    return emptyCols
}

const checkCompetitionDates = ({ competition }) => {
    const { register_due, register_start, start_date, end_date } = competition

    let isRegisterOpen = true
    let isEventStarted = true

    if (!register_due || !register_start || !start_date || !end_date) {
        isRegisterOpen = false
        isEventStarted = false
        return { isRegisterOpen, isEventStarted }
    }

    const rO = new Date(register_start)
    const rC = new Date(register_due)
    const eO = new Date(start_date)
    const eC = new Date(end_date)
    const dateNow = new Date()


    if (dateNow < rO || dateNow > rC) {
        isRegisterOpen = false
    }

    if (dateNow < eO || dateNow > eC) {
        isEventStarted = false
    }


    return { isRegisterOpen, isEventStarted }
}