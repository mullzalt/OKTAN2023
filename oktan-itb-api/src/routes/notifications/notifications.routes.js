const router = require('express').Router()

const { memberNotification } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { isModerator, isAdmin } = require('../../middlewares/users/rolesValidation')

router.route('/:memberId')
    .get([
        verifyToken
    ], memberNotification.getNotifications)



module.exports = router