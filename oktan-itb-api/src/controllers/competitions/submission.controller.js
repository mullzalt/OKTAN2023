const asyncHandler = require('express-async-handler');
const { fileUploadHandler } = require('../../middlewares/fileHandler');

const fs = require("fs");
const path = require('path');
const { Op } = require('../../models/db')
const { BASE_URL, __BASEDIR } = require('../../configs/config');

const { makePagination, paginationResults, paginateResult } = require('../../utils/paginate');

const { Submission, Participant, Member, Competition, MemberNotification } = require("../../models");

exports.submitPapper = asyncHandler(async (req, res) => {
    const { participant, isOwner, submission, isSubmitted, fileUrl } = await submissionMiddleware(req, res)

    if (!isOwner) {
        res.status(403)
        throw new Error('Only owner can perform such actions')
    }

    if (!isSubmitted) {
        res.status(403)
        throw new Error('You have not sumbitted')
    }

    if (!fileUrl) {
        res.status(403)
        throw new Error('Please upload first!')
    }

    await submission.update({
        status: 'SENT'
    })

    return res.json(submission)
})

exports.createPapper = asyncHandler(async (req, res) => {
    const { participant, isOwner, isSubmitted } = await submissionMiddleware(req, res)

    if (!isOwner) {
        res.status(403)
        throw new Error('Only owner can perform such actions')
    }

    if (isSubmitted) {
        res.status(403)
        throw new Error('You have sumbitted')
    }

    const submission = await Submission.create({
        participantId: participant.id
    })

    return res.json({ participant, isOwner, submission })
})

exports.updatePapper = asyncHandler(async (req, res) => {
    const { participant, isOwner, isSubmitted, submission } = await submissionMiddleware(req, res)
    const { title, theme } = req.body

    if (!isSubmitted) {
        res.status(403)
        throw new Error('You have sumbitted')
    }

    if (!isOwner) {
        res.status(403)
        throw new Error('Only owner can perform such actions')
    }

    await submission.update({
        title: title,
        theme: theme
    })

    return res.json(submission)
})

exports.uploadPapper = asyncHandler(async (req, res) => {
    const { participant, isOwner, isSubmitted } = await submissionMiddleware(req, res)
    const { title, theme } = req.body

    if (!isSubmitted) {
        res.status(403)
        throw new Error('You have sumbitted')
    }

    if (!isOwner) {
        res.status(403)
        throw new Error('Only owner can perform such actions')
    }

    const submission = await Submission.findOne({
        where: { participantId: participant.id },
        include: [
            {
                model: Participant,
                include: [{ model: Member }, { model: Competition, attributes: ['id', 'title', 'category'] }]
            }
        ]
    })

    const upload = await fileUploadHandler({
        files: req.file,
        nameFormats: `${submission.participant.competition.category}23_${submission.theme}_${submission.participant.team_name}_${submission.participant.member.institute}`,
        folders: `submission/${submission.participant.competition.category}/${submission.participant.competition.id}`,
        fileFormats: ['pdf']
    })

    await submission.update({
        attachment: upload.filename,
        status: 'PENDING'
    })

    return res.json({ message: 'Upload paper successfull', data: submission })
})

exports.removePapper = asyncHandler(async (req, res) => {
    const { isOwner, isSubmitted, submission, filePath } = await submissionMiddleware(req, res)

    if (!isSubmitted) {
        res.status(403)
        throw new Error('You have sumbitted')
    }

    if (!isOwner) {
        res.status(403)
        throw new Error('Only owner can perform such actions')
    }

    if (!filePath) {
        res.status(403)
        throw new Error('You have not submitted a paper')
    }

    let msgs

    try {
        fs.unlinkSync(filePath)
        msgs = 'Successfully remove file'
    } catch (error) {
        res.status(500)
        throw error
    }

    await submission.update({
        attachment: null,
        status: 'PENDING'
    })

    return res.json({ message: msgs, data: submission })
})

exports.getPappers = asyncHandler(async (req, res) => {
    const { where, status, competition, size, page } = req.query
    const { currentPage, limit, offset } = makePagination(page, size)

    const submissions = await Submission.findAndCountAll({
        include: [
            {
                model: Participant,
                include: [{ model: Member }, { model: Competition, attributes: ['id', 'title', 'category'] }]
            }
        ]
    })

    return res.json({ submissions })
})

exports.getPapperById = asyncHandler(async (req, res) => {
    const { participant, fileUrl } = await submissionMiddleware(req, res)

    const submissions = await Submission.findOne({
        where: { participantId: participant.id },
        include: [
            {
                model: Participant,
                include: [{ model: Member }, { model: Competition, attributes: ['id', 'title', 'category'] }]
            }
        ]
    })
        .then(data => {
            return { ...data.toJSON() }
        })

    return res.json({ ...submissions, file_url: fileUrl })
})

exports.reviewPapper = asyncHandler(async (req, res) => {
    const { participant, fileUrl, submission, isSubmitted } = await submissionMiddleware(req, res)
    const { message, score } = req.body

    if (!isSubmitted) {
        res.status(404)
        return res.json({ message: 'this participant have not submit a papper yet' })
    }

    await submission.update({
        score: score
    })

    const newMessage = await upsertMessage({
        competitionId: participant.competition.id,
        memberId: participant.member.id,
        about: 'SUBMISSION',
        type: 'ACCEPTED',
        messages: message,
        from: req.user.profile.id
    })

    return res.json({
        submission
    })
})







const submissionMiddleware = async (req, res) => {
    const { participantId } = req.params

    const participant = await Participant.findOne({
        where: { id: participantId },
        include: [{ model: Member }, { model: Competition, attributes: ['id', 'title', 'category'] }]
    })

    if (!participant) {
        res.status(404)
        throw new Error('participant not found')
    }

    const isOwner = participant.memberId === req.user.profile.id ? true : false

    const submission = await Submission.findOne({
        where: { participantId: participant.id },
    })

    const isSubmitted = submission ? true : false

    let filePath
    let fileUrl


    if (isSubmitted) {
        filePath = submission.attachment ? path.join(__BASEDIR, `public/uploads/submission/${participant.competition.category}/${participant.competition.id}`, submission.attachment) : null

        fileUrl = submission.attachment ? `${BASE_URL}public/uploads/submission/${participant.competition.category}/${participant.competition.id}/${encodeURIComponent(submission.attachment.trim())}` : null
    }


    return { participant, isOwner, submission, isSubmitted, filePath, fileUrl }

}

const upsertMessage = async ({ competitionId, memberId, about, type, messages, from }) => {
    return await MemberNotification.findOne({
        where: { competitionId: competitionId, memberId: memberId, about: about, type: type, }
    })
        .then(async (data) => {
            if (data) return await data.update({
                message: messages,
                from: from
            })

            return await MemberNotification.create({
                competitionId: competitionId,
                memberId: memberId,
                about: about,
                from: from,
                type: type,
                message: messages
            })
        })
        .catch(err => { throw err })
}