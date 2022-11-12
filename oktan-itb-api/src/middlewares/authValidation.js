const { check, validationResult } = require('express-validator')
const { User } = require('../models')

exports.validateSignIn = [
    check('identifier')
        .not().isEmpty()
        .withMessage("username or email must be filled!"),

    check('password')
        .not().isEmpty()
        .withMessage("Please fill your password"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array())
        }
        next()
    },
]

exports.validateSignUp = [
    check('username')
        .not().isEmpty()
        .withMessage('User name can not be empty!')
        .isLength({ min: 6, max: 18 })
        .withMessage('Username must be 6-18 characters long!')
        .custom(value => !/\s/.test(value))
        .withMessage('Space not allowed in username!'),

    check(['name', 'institute'])
        .not().isEmpty()
        .withMessage('Please fill this field!'),

    check('phone')
        .not().isEmpty()
        .withMessage('Must add phone number!')
        .isMobilePhone()
        .isLength({ min: 10 })
        .withMessage('Must be an valid phone number!'),

    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),

    check('password')
        .not().isEmpty()
        .withMessage('Password can not be empty!')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long!'),

    check('confirmPassword').custom(async (compare, { req }) => {
        const password = req.body.password
        if (password !== compare) {
            return Promise.reject("Password does not match!")
        }
    }),

    check('username').custom(async value => {
        let user = await User.findOne({
            where: { username: value }
        })
        if (user !== null) {
            return Promise.reject("Username already taken!")
        }
    }),

    check('email').custom(async value => {
        let user = await User.findOne({
            where: { email: value }
        })
        if (user !== null) {
            return Promise.reject("Email already used!")
        }
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array())
            }
        }

        next()
    },
]