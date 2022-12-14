const router = require('express').Router()

const { competition } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { isModerator, isAdmin } = require('../../middlewares/users/rolesValidation')

router.route('/').get([
    verifyToken
], competition.getCompetitions)
    .post([
        verifyToken, isModerator
    ], competition.createCompetition)


router.route('/:competitionId').get([
    verifyToken
], competition.getCompetitionById)
    .put([verifyToken, isModerator], competition.saveCompetition)

router.route('/:competitionId/publish').put([
    verifyToken, isModerator]
    , competition.publishCompetition)


module.exports = router