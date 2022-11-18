const asyncHandler = require('express-async-handler')
const { fn, col } = require('sequelize')
const { Op } = require('../../models/db')

const { BASE_URL, __BASEDIR } = require('../../configs/config')

const { Member, Participant, Competition } = require("../../models");
const { makePagination, paginationResults } = require('../../utils/paginate');

exports.getParticipants = asyncHandler(async (req, res) => {
    const competitionId = req.params.competitionId

    const { where, status, paid, size, page } = req.query
    const { currentPage, limit, offset } = makePagination(page, size)

    const { competitionCategory } = await getCompetitionById(competitionId)

    const getWhere = where ? {
        [Op.or]: [
            { team_name: { [Op.like]: `%${where}%` } },
            { mentor_name: { [Op.like]: `%${where}%` } },
            { mentor_number: { [Op.like]: `%${where}%` } },
            { '$member.name$': { [Op.like]: `%${where}%` } },
            { '$member.phone$': { [Op.like]: `%${where}%` } },
            { '$member.institute$': { [Op.like]: `%${where}%` } },
        ]
    } : null

    const getStatus = status ? { status: { [Op.eq]: status } } : null
    const isPaid = paid === 'true'
        ? { allowedToJoin: true }
        : paid === 'false'
            ? { allowedToJoin: false }
            : null

    const condition = {
        [Op.and]: [
            { competitionId: competitionId },
            getWhere,
            getStatus, isPaid
        ]
    }

    const file_path = BASE_URL + 'public/uploads/participantCard/' + competitionCategory + '/'


    const participant = await Participant.findAndCountAll({
        where: condition,
        include: [{ model: Member }],
        limit: limit,
        offset: offset
    })
        .then(data => {
            const newRows = []

            const file_urls = data.rows.map((v, index) => {
                const file_url = v.card_file ? `${file_path}${encodeURIComponent(v.card_file.trim())}` : null
                newRows.push({ ...v.toJSON(), file_url })
            })

            const result = paginationResults({ totalItem: data.count, limit: limit, rows: newRows, currentPage: currentPage })

            return { size: limit, ...result }
        })
        .catch(err => { throw err })


    return res.json(participant)

})

const getCompetitionById = async (competitionId) => {
    const competition = await Competition.findOne({
        where: { id: competitionId }
    })
        .catch(err => { throw err })

    if (!competition) throw new Error('Competiton not found')

    const competitionCategory = competition.category

    return { competition, competitionCategory }
}