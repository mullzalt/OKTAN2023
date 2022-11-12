const { check, validationResult } = require('express-validator')
const { User, Member } = require('../../models')


exports.memberEditProfile = [
    check(['name', 'institute'])
        .not().isEmpty()
        .withMessage('Please fill this field!'),

    check('phone')
        .isMobilePhone().isLength({ min: 10 })
        .withMessage('Must be an valid phone number!'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422)
            throw {
                message: "Invalid update data",
                errors: errors.array(),
                stack: (new Error()).stack
            }
        }

        next()
    },

]