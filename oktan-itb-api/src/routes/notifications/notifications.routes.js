const router = require('express').Router()

const { memberNotification } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { isModerator, isAdmin } = require('../../middlewares/users/rolesValidation')

router.route('/:memberId')
    .get([
        verifyToken
    ], memberNotification.getNotificationsByMembers)

router.route('/')
    .post([
        verifyToken, isModerator
    ], memberNotification.createAnnoucement)
    .put([
        verifyToken
    ], memberNotification.sendNotification)
    .get([
        verifyToken
    ], memberNotification.getMainNotification)

router.route('/:notificationId')
    .delete([
        verifyToken, isModerator
    ], memberNotification.deleteNotifications)





module.exports = router