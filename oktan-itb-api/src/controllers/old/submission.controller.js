const { Competition, Participant, ParticipantMember, User, Member, SubTheme, Invoice, Submission } = require("../models");
const { Op } = require("../models/db");
const jsonResponse = require("../utils/jsonResponse");
const fs = require('fs')

const { fileUploadHandler } = require("../utils/uploadFile");
const { BASE_URL } = require("../configs/config");



exports.getMyPaper = async (req, res) => {

    let check

    try {
        check = await checkEnrollment(req, res)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    const url = BASE_URL + `public/uploads/submission/${check.competition.category}/${check.competition.id}/`


    let file
    let file_url

    let myPaper = await Participant.findOne({
        where: { id: check.participant.id, competitionId: check.competition.id },
        include: [{
            model: Submission
        }]
    }

    ).then((data) => {
        if (!data) {
            return res.status(404).json({ message: "have not submit yet" })
        }

        return data
    })
        .catch((err) => {
            return res.status(500).json({ message: err.message })
        })

    file = myPaper?.competition_submission?.attachment ? myPaper?.competition_submission?.attachment : null

    if (file === null) return res.status(404).json({ message: "Paper tidak ditemukan" })

    file_url = url + encodeURIComponent(file.trim())

    return res.status(200).json({ submission: myPaper.competition_submission, file_url: file_url })
}

exports.submitPapper = async (req, res) => {
    const { title, theme, mentor, mentor_id_number } = req.body


    let check

    try {
        check = await checkEnrollment(req, res)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    let competition = await Competition.findOne({
        where: { id: req.params.competitionId }
    })

    const participantId = check.participant.id
    const institute = check.member.institute
    const teamName = check.participant.team_name
    const category = check.competition.category


    let submit = await Submission.create({
        title: title,
        theme: theme,
        mentor: mentor,
        mentor_id_number: mentor_id_number,
        participantId: participantId
    })

    let upload
    try {
        upload = await fileUploadHandler({
            file: req.file,
            nameFormat: `${category}23_${theme}_${teamName}_${institute}`,
            folder: `submission/${competition.category}/${competition.id}`,
            formats: ['pdf']
        })
    } catch (error) {
        req.file.path ? fs.unlinkSync(req.file.path) :
            res.json({ message: error.message })
        submit.destroy()
        return
    }

    await submit.update({
        attachment: upload.filename
    })

    return res.json(submit)
}

exports.getAllPapeer = async (req, res) => {
    let competition = await Competition.findOne({
        where: { id: req.params.competitionId }
    })

    if (!competition) return res.status(404).json({ message: 'Competition not found!' })

    const directoryPath = __basedir + `/public/uploads/submission/${competition.category}/${competition.id}`

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

exports.deletePapper = async (req, res) => {
    let check

    try {
        check = await checkEnrollment(req, res)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    let deletePapper = await Submission.findOne({
        where: { participantId: check.participant.id }
    })

    try {
        const deletePath = __basedir + `/public/uploads/submission/${check.competition.category}/${check.competition.id}`
        const filename = deletePapper?.attachment ? deletePapper.attachment : false

        if (!filename) {
            return res.status(404).json({ message: "file not found", deletePapper })
        }

        deletePapper.update({ attachment: null })

        fs.unlinkSync(`${deletePath}/${filename}`)
        return res.status(200).json({ message: `delete Success:${filename} ` })
    }
    catch (error) {
        return res.status(500).json(error.message)
    }


}

const checkEnrollment = async (req, res) => {
    let user = await User.findOne({
        where: { id: req.user.id }
    })

    if (!user) {
        throw new Error('Please login first!')
    }

    let member = await Member.findOne({
        where: { userId: user.id }
    })

    if (!member) {
        throw new Error('Could not find member!')
    }

    let competition = await Competition.findOne({
        where: { id: req.params.competitionId }
    })

    if (!competition) {
        throw new Error('Could not find competition!')
    }

    let participant = await Participant.findOne({
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
            if (!data) throw new Error('not enrolled')

            return data
        })

    return { participant, competition, user, member }
}