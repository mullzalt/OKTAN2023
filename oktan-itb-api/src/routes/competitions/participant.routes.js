const router = require('express').Router()

const { participant } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { isModerator, isAdmin } = require('../../middlewares/users/rolesValidation')

router.route('/:competitionId/members/').get([
    verifyToken
], participant.getParticipants)




module.exports = router