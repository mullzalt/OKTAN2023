const {check,  validationResult} = require('express-validator')
const { User, Member} = require('../models')



exports.validateNewMod = [
    check('username')
        .not().isEmpty()
        .withMessage('User name can not be empty!')
        .isLength({min: 6})
        .withMessage('Username must be atleas 6 characters long!')
        .custom(value => !/\s/.test(value))
        .withMessage('Space not allowed in username!'),

    check('phone')
        .isMobilePhone()
        .isLength({min: 10})
        .optional({nullable: true})
        .withMessage('Please enter a valid phone number'),

    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),

    check('isAdmin')
        .not().isEmpty()
        .isBoolean()
        .withMessage('Value can only be either true or false'),

    check('password')
        .not().isEmpty()
        .withMessage('Password can not be empty!')
        .bail()
        .isLength({min: 6})
        .withMessage('Password must be atleas 6 characters long!'),

    check('username').custom(async value => {
        let user = await User.findOne({
            where: {username: value}
        })
        if(user !== null){
            return Promise.reject("Username already taken!")
        }
    }),

    check('email').custom(async value => {
        let user = await User.findOne({
            where: {email: value}
        })
        if(user !== null){
            return Promise.reject("Email already used!")
        }
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        }
        
        next()
    },
]

exports.validateCompetition = [
    // title, description, fee, category, minParticipant, maxParticipant, registerDue, startDate, endDate, 
    check(['title', 'description', 'fee', 'category', 'minParticipant', 'maxParticipant', 'registerDue', 'startDate', 'endDate'])
        .not().isEmpty()
        .withMessage('Cannot leave this field empty!'),

    check(['fee', 'minParticipant', 'maxParticipant'])
        .isNumeric()
        .withMessage('Please enter numeric'),

    check(['registerDue', 'startDate', 'endDate'])
        .isDate()
        .withMessage('Please enter a correct date time!'),

    check('category')
        .isIn(['ISOTERM', 'CRYSTAL'])
        .withMessage('Value must be either ISOTERM or CRYSTAl'),    


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        }
        next()
    },
]

exports.validateMemberEdit = [
    
    check('phone')
        .isMobilePhone()
        .optional({nullable: true})
        .isLength({min: 10})
        .withMessage('Please enter a correct phone number.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        }
        next()
    },
]

