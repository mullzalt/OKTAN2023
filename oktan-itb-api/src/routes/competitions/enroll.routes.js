const router = require('express').Router()

const { enrollment } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { uploadFile } = require('../../middlewares/fileHandler')

router.route('/:competitionId/members/:memberId').post([
    verifyToken
], enrollment.enrollCompetiton)

router.route('/:competitionId/members/:memberId/card').put([
    verifyToken, uploadFile
], enrollment.uploadEnrollCard)

router.route('/:competitionId/members/:memberId/').put([
    verifyToken,
], enrollment.updateEnrollData)



module.exports = router