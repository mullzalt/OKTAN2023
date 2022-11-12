const router = require('express').Router()

const { BASE_URL, WEB_URL } = require('../../configs/config')
const auth = require('../controllers/auth.controller')
const validation = require('../../middlewares/authValidation')

router.post(
    '/register',
    validation.validateSignUp,
    auth.register
)

router.post(
    '/login',
    validation.validateSignIn,
    auth.login
)

router.get(
    '/:id/verify/:token/',
    auth.validateAccount
)

router.get(
    '/:userId/resend/token/',
    auth.resendVerificationToken
)

router.get(
    '/verified',
    (req, res) => {
        const valid = req.query.valid

        if (!valid) {
            res.redirect(302, WEB_URL)
        }

        res.redirect(302, WEB_URL)
    }
)

module.exports = router