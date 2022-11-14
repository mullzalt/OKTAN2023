const router = require('express').Router()

const { member, moderator } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { validateNewMod } = require('../../middlewares/formsValidation')
const { isModerator, isAdmin } = require('../../middlewares/users/rolesValidation')



router.route('/').post([
    // verifyToken, isAdmin, 
    validateNewMod
], moderator.registerNewModerator)


module.exports = router