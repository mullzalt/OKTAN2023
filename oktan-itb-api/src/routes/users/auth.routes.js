const router = require('express').Router()
const { check, validationResult } = require('express-validator')

const { auth } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { validateRegister, validateLogin } = require('../../middlewares/users/authValidation')



router.route('/register')
    .post([
        validateRegister
    ],auth.register)

router.route('/login')
.post([
        validateLogin
    ],auth.login)

router.route('/validation/:userId/verify/:token')
.get(auth.validateAccount)

router.route('/validation/:userId')
.post(auth.resendVerificationToken)

router.route('/refresh')
.get(auth.refreshUserToken)

router.route('/logout')
.delete([
    verifyToken
],auth.logout)

router.route('/me')
.get([
    verifyToken
],auth.getMe)

module.exports = router