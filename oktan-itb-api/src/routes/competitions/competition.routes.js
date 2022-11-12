const router = require('express').Router()

const { competition } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { isModerator, isAdmin } = require('../../middlewares/users/rolesValidation')

router.route('/').get([
    verifyToken
], competition.getAllCompetitions)

router.route('/:competitionId').get([
    verifyToken
], competition.getCompetitionById)


module.exports = router