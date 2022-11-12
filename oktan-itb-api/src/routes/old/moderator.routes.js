const router = require('express').Router()

const moderatorController = require('../controllers/moderator.controller')
const verify = require('../middlewares/userVerification')
const validate = require('../middlewares/formsValidation')

router.post('/',
    [
        verify.protect,
        // verify.isAdmin,
        validate.validateNewMod
    ], 
    moderatorController.newMod
)

module.exports = router