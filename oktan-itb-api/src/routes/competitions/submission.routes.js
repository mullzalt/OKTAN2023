const router = require('express').Router()

const { submission } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { uploadFile } = require('../../middlewares/fileHandler')
const { isModerator, isAdmin } = require('../../middlewares/users/rolesValidation')

router.route('/participants/:participantId')
    .post([
        verifyToken
    ], submission.createPapper)
    .get([
        verifyToken
    ], submission.getPapperById)
    .put([
        verifyToken
    ], submission.updatePapper)


router.route('/participants/:participantId/paper')
    .post([
        verifyToken
    ], submission.submitPapper)
    .put([
        verifyToken, uploadFile
    ], submission.uploadPapper)
    .delete([
        verifyToken
    ], submission.removePapper)

router.route('/moderators/')
    .get([
        verifyToken, isModerator
    ], submission.getPappers)

router.route('/moderators/:participantId')
    .put([
        verifyToken, isModerator
    ], submission.reviewPapper)




module.exports = router