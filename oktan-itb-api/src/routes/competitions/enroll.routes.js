const router = require('express').Router()

const { enrollment, invoice } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { uploadFile } = require('../../middlewares/fileHandler')
const { isModerator, isAdmin } = require('../../middlewares/users/rolesValidation')



router.route('/:competitionId/members/:memberId')
    .post([
        verifyToken
    ], enrollment.enrollCompetiton)
    .get([
        verifyToken
    ], enrollment.getEnrollmentData)
    .put([
        verifyToken,
    ], enrollment.updateEnrollData)

router.route('/:competitionId/members/:memberId/card')
    .delete([
        verifyToken
    ], enrollment.removeEnrollCard)
    .put([
        verifyToken, uploadFile
    ], enrollment.uploadEnrollCard)


router.route('/:competitionId/members/:memberId/verify').put([
    verifyToken, isModerator
], enrollment.updateStatus)



module.exports = router