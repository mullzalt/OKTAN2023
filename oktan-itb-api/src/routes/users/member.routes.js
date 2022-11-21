const router = require('express').Router()

const { member } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { memberEditProfile } = require('../../middlewares/users/editValidation')
const { isModerator } = require('../../middlewares/users/rolesValidation')


router.route('/').get([
    verifyToken, isModerator
], member.getMembers)

router.route('/:memberId').get([
    verifyToken, isModerator
], member.getMemberById)

router.route('/:memberId').put([
    verifyToken, memberEditProfile
], member.editProfile)

module.exports = router