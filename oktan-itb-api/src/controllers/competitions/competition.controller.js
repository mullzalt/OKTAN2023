const asyncHandler = require('express-async-handler')
const { fn, col } = require('sequelize')
const { Op } = require('../../models/db')

const { Competition, Participant, Member, SubTheme } = require('../../models')
const { BASE_URL } = require('../../configs/config')



exports.createCompetition = asyncHandler(async (req, res) => {
    const competition = await Competition.create({
        visible: false
    })
        .catch(err => { throw err })

    return res.status(201).json(competition)
})

exports.saveCompetition = asyncHandler(async (req, res) => {
    const competitionId = req.params.competitionId
    const {
        title, description,
        entry_fee, category, payment_method,
        min_participant, max_participant,
        register_due, register_start, start_date, end_date,
    } = req.body

    const competition = await Competition.findOne({
        where: { id: competitionId }
    })
        .catch(err => { throw err })

    if (!competition) throw new Error('Competition not found')

    await competition.update({
        title: title,
        description: description,

        entry_fee: entry_fee,
        category: category,
        payment_method: payment_method,

        min_participant: min_participant,
        max_participant: max_participant,

        register_due: register_due,
        register_start: register_start,
        start_date: start_date,
        end_date: end_date,
    })
        .catch(err => { throw err })

    return res.status(200).json(competition)


})

exports.publishCompetition = asyncHandler(async (req, res) => {
    const competitionId = req.params.competitionId
    const { publish } = req.body


    const competition = await Competition.findOne({
        where: { id: competitionId }
    })
        .catch(err => { throw err })

    if (!competition) throw new Error('Competition not found')

    const setPublish = competition.visible
        ? false : true

    await competition.update({
        visible: setPublish
    })


    return res.status(200).json(competition)
})



exports.getAllCompetitions = asyncHandler(async (req, res) => {
    const where = req.query.where
    const visible = req.query.visible === 'true'
        ? true
        : req.query.visible === 'false'
            ? false : true

    const isEnrolled = req.query.isEnrolled === 'true'
        ? { '$member.id$': { [Op.eq]: req.user.profile.id } }
        : req.query.isEnrolled === 'false'
            ? { '$member.id$': { [Op.eq]: req.user.profile.id } }
            : {}

    var condition = where || req.query.visible
        ? {
            [Op.or]: [
                { title: { [Op.like]: `%${where}%` } },
                { category: { [Op.like]: `%${where}%` } },
            ],
            [Op.and]: [
                { visible: visible },
                isEnrolled
            ]
        }
        : null;


    const competitions = await Competition.findAll({
        where: condition,
        order: [['register_start', 'ASC']],
        include: [
            {
                model: Member,
                as: 'member',
                attributes: []
            },
            {
                model: SubTheme,
            }
        ],
    })
        .then((data) => {
            return data
        })
        .catch((err) => { throw err })

    if (req.query.isEnrolled === 'false') {
        let newCondition = {
            [Op.or]: [],
            [Op.and]: [
                { visible: true },]
        }
        let test = competitions.map(comp => newCondition[Op.or].push({ id: { [Op.ne]: comp.id } }))
        const notEnrolled = await Competition.findAll(
            { where: newCondition, condition }
        )
        return res.status(200).json(notEnrolled)
    }


    return res.status(200).json(competitions)
})


exports.getCompetitionById = asyncHandler(async (req, res) => {
    const competitionId = req.params.competitionId

    const participant = req.query.participant

    const getMe = participant
        ? { model: Member, as: 'member', attributes: [] }
        : { model: Member, as: 'member' }

    const competition = await Competition.findOne({
        where: { id: competitionId },
        include: [getMe,
            {
                model: SubTheme,
            }
        ]
    })
        .then(async (data) => {
            let participantData

            if (participant) {
                let isParticipating = await Participant.findOne({
                    where: {
                        competitionId: data.id,
                        memberId: participant
                    }
                })

                participantData = isParticipating
                    ? isParticipating : null
            }


            return {
                ...data.toJSON(),
                participant: participantData,
            }
        })
        .catch(err => { throw err })

    if (!competition) {
        res.status(404)
        throw new Error('Competition not found')
    }

    return res.status(200).json(competition)
})