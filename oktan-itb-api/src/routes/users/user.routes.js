const router = require('express').Router()

const verifyToken = require('../../middlewares/authJwt')
const user = require('../../controllers/users/user.controller')
const { isAdmin } = require('../../middlewares/users/rolesValidation')


router.route('/').get([
    verifyToken, isAdmin
], user.getAllUser)


module.exports = router