const asyncHandler = require('express-async-handler')
const fs = require("fs");
const { Op, fn, col } = require("sequelize");
const { BASE_URL } = require('../../configs/config');
const { fileUploadHandler } = require('../../middlewares/fileHandler');


const { Competition, Participant, Invoice, Member, ParticipantMember } = require("../../models");


exports.enrollCompetiton = asyncHandler(async (req, res) => {
    const { competition, member, enroll, isEnrolled } = await enrollMiddlewares(req, res)

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
        isAllowedToJoin = true
    }

    const createEnroll = await Participant.create({
        memberId: member.id,
        competitionId: competition.id,
        status: 'PENDING',
        isAllowedToJoin: isAllowedToJoin
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
        nameFormats: `IDCARDS_PARTICIPANT_[${teamName}]_IDCARDS_[${competition.id}]_[${member.id}]`,
        folders: `participantCard/${competition.category}`,
        fileFormats: ['pdf']
    })

    await enroll.update({
        card_file: upload.filename,
    })

    return res.json({ message: 'Upload card successfull', data: enroll })
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
            id: newIds[index],
            name: newNames[index],
            phone: newphones[index],
            participantId: participantIds
        }
    })


    await ParticipantMember.destroy({
        where: { participantId: { [Op.eq]: participantIds } }
    })

    const team_members = await ParticipantMember.bulkCreate(teamParticipants, {
        fields: ['id', 'name', 'phone', 'participantId'],
        updateOnDuplicate: ['name', 'phone']
    })

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
    return res.json(upsert)

    await enroll.update({
        team_name: team_name,
        mentor_name: mentor_name,
        mentor_number: mentor_number
    })
        .catch(err => { throw err })

    await ParticipantMember.destroy({
        where: { participantId: enroll.id }
    }).catch(err => { throw err })

    const teamMembers = await ParticipantMember.bulkCreate(memberName)
        .catch(err => { throw err })


    return res.json({ ...enroll.dataValues, team_members: teamMembers })
})






const enrollMiddlewares = async (req, res) => {
    const competitionId = req.params.competitionId
    const memberId = req.params.memberId

    const competition = await Competition.findOne({
        where: { id: competitionId }
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
        ]


    })
        .catch(err => { throw err })

    const isEnrolled = enroll ? true : false

    return { competition, member, enroll, isEnrolled }
}