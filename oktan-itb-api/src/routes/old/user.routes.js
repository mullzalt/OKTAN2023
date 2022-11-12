const router = require('express').Router()

const userController = require('../controllers/user.controller')
const verify = require('../middlewares/userVerification')

router.get('/',
    [
        verify.protect, 
        // verify.isAdmin
    ],
    userController.findAll
    )

// router.get('/:userId',
//     [
//         verify.protect
//     ],
//     userController.getOne
//     )

router.post('/password',
    userController.sendPasswordReset
    )

router.post('/password/:userId/forgot/:token',
    userController.forgotPasswordReset
    )

module.exports = router