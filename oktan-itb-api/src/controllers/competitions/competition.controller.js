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


const saveOrInsertSubTheme = async (ids, names, competitionId) => {

    if (!ids && !names) { return }

    let newNames = names
    let newIds = ids
    let isAnArray = (Array.isArray(names)) && (Array.isArray(ids))

    if (!isAnArray) {
        newNames = new Array(newNames)
        newIds = new Array(newIds)
    }

    let subThemes = newNames.map((name, index) => {
        return {
            id: ids[index],
            name: names[index],
            competitionId: competitionId
        }
    })



    await SubTheme.destroy({
        where: { competitionId: competitionId }
    })

    const competition_sub_themes = await SubTheme.bulkCreate(subThemes, {
        fields: ['id', 'name', 'competitionId'],
        updateOnDuplicate: ['name']
    })

    return competition_sub_themes
}

exports.saveCompetition = asyncHandler(async (req, res) => {
    const competitionId = req.params.competitionId
    const {
        title, description,
        entry_fee, category, payment_method,
        min_participant, max_participant,
        register_due, register_start, start_date, end_date,

        subThemeId, subThemeName
    } = req.body

    const upsertSubTheme = await saveOrInsertSubTheme(subThemeId, subThemeName, competitionId)


    const competition = await Competition.findOne({
        where: { id: competitionId },
        include: [{
            model: SubTheme
        }]
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


exports.getCompetitions = asyncHandler(async (req, res) => {
    const { where, drafted, category, enrolled } = req.query

    const titleLike = where ? { title: { [Op.like]: `%${where}%` } } : null
    const categoryEq = category ? { category: { [Op.eq]: category } } : null
    const isDrafted = drafted ?
        drafted === 'true'
            ? { visible: { [Op.eq]: false } }
            : drafted === 'false'
                ? { visible: { [Op.eq]: true } }
                : null
        : null
    const isEnrolled = enrolled ?
        enrolled === 'true' ? true
            : enrolled === 'false' ? false
                : false
        : null

    let enrollConditon = null

    if (isEnrolled === true || isEnrolled === false) {
        enrollConditon = { '$member.id$': { [Op.eq]: req.user.profile.id } }
    }

    const condition = {
        [Op.and]: [
            titleLike, categoryEq, isDrafted, enrollConditon
        ]
    }

    const competitions = await Competition.findAll({
        where: condition,
        attributes: ['id'],
        include: [{ model: Member, as: 'member', attributes: [] }]
    })
        .then(async (data) => {
            if (isEnrolled === false) {
                const ids = data.map(v => {
                    return v.id
                })

                return await Competition.findAll({
                    where: {
                        [Op.and]: [
                            titleLike, categoryEq, isDrafted, { id: { [Op.notIn]: ids } }
                        ]
                    },
                    attributes: ['id']
                })
            }

            return data
        })
        .catch(err => { throw err })


    res.status(200)
    return res.json(competitions)
})

exports.getCompetitionById = asyncHandler(async (req, res) => {
    const competitionId = req.params.competitionId

    const checkEnroll = req.query.checkEnroll

    const competition = await Competition.findOne({
        where: { id: competitionId },
        include: [
            { model: SubTheme },
            { model: Member, as: 'member' }
        ]
    })
        .then(async (data) => {
            if (checkEnroll) {
                const memberIds = data.member.map(v => {
                    return v.id
                })

                const isParticipating = memberIds.includes(req.user.profile.id)

                return { ...data.toJSON(), isParticipating }
            }
            return data
        })
        .catch(err => { throw err })

    res.status(200)
    return res.json(competition)
})