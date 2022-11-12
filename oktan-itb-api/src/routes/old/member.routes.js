const router = require('express').Router()

const memberController = require('../controllers/member.controller')
const verify = require('../middlewares/userVerification')
const validate = require('../middlewares/formsValidation')
const uploadFile = require('../middlewares/fileUploader')


router.get('/me',
    [
        verify.protect
    ],
    memberController.getMe
    )

router.get('/:userId/',
    [
        verify.protect
    ],
    memberController.getOne
    )

router.get('/',
    [
        verify.protect, 
        // verify.isModerator
    ],
    memberController.findAll
    )

// router.put('/:userId/upload/card', 
//     [
//         verify.protect, 
//         uploadFile.uploadFile
//     ],
//         memberController.uploadIdCard,
//     )

router.put('/:userId', 
    [
        verify.protect, 
        validate.validateMemberEdit
    ],

    memberController.editProfileMember
)

module.exports = router