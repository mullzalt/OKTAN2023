const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')

const { User, VerificationToken, Member, Moderator, RefreshToken } = require('../../models')
const emailSender = require('../../utils/email/emailSender')
const { BASE_URL, WEB_URL, JWT_SECRET, JWT } = require('../../configs/config')
const { Op } = require('../../models/db')


// @desc    Register new user
// @route   POST /register
// @access  Public
exports.register = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body
    const { name, institute, phone } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username: username, 
        email: email,
        password: hashedPassword
    })
    .catch(err => {
        res.status(500)
        throw err
    })

    const member = await Member.create({
        name: name, 
        phone: phone, 
        institute: institute, 
        userId: user.id
    })
    .catch(err => {
        res.status(500)
        throw err
    })

    try {
        const verificationMail = await sendVerificationEmail(user.id)
        const sendMail = await emailSender(verificationMail)
    
        return res.status(200).json({
            user: user,
            member: member, 
            mail: sendMail,
        })
    } catch (err) {
        res.status(500)
        throw err
    }
})
   
    
    

// @desc    Login active user
// @route   POST /login
// @access  Public
exports.login = asyncHandler(async(req, res) => {
    const cookies = req.cookies
    
    const { identifier, password } = req.body
    
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { username: identifier },
                { email: identifier }
            ]
        }, 
        include: [{model: Member}, {model: Moderator}]
    })
    .catch((err) => {
        res.status(500)
        throw err
    })
    
    if (!user)  {
        res.status(400) 
        throw new Error("Username or email incorrect!")
    }
    
    let isPasswordValid = bcrypt.compareSync(password, user.password)
    
    if (!isPasswordValid) {
        res.status(400) 
        throw new Error('Password incorrect!')
    }
    
    if (!user.verified) {
        return res.status(403).json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.roles,
                verified: user.verified
            },
            profile: user.member ? user.member : user.moderator ? user.moderator: undefined,
        })
    }
    
    
    const userData = {
        user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.roles,
            verified: user.verified,
            name: user.member ? user.member.name : user.moderator ? user.moderator.name: undefined,
        },
        profile: user.member ? user.member : user.moderator ? user.moderator: undefined
    }
    
    let refreshToken = await createRefreshToken({userData: userData.user, userId: user.id})
    const accessToken = generateJwt(userData.user)
    
    if(cookies?.refreshToken){ 
        res.clearCookie('refreshToken');
    }

    return res.status(200)
    .cookie('refreshToken', refreshToken.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) 
    .json({accessToken: accessToken})
       
    })

// @desc    Logout and destoy cookies
// @route   DELETE /logout
// @access  Public
exports.logout = asyncHandler(async(req, res) => {
    const refreshToken = req.cookies.refreshToken

    if(!req.user){
        res.status(401)
        throw new Error('You not logged in')
    }

    if(!refreshToken){
        res.status(204)
        throw new Error('Refresh token not found')
    }

    const user = await User.findOne({
        where: {id: req.user.user.id}
    })

    if(!user){
        res.clearCookie('refreshToken');
        res.status(204)
        throw new Error('User not found')
    }

    await RefreshToken.destroy({
        where: {token: refreshToken}
    })
    .catch(err => {throw err})

    res.clearCookie('refreshToken');
    return res.status(200).json({message: "Log out success"});

})

// @desc    Get my profile
// @route   GET /me
// @access  Public
exports.getMe = asyncHandler(async(req, res) => {
    if(!req.user){
        res.status(401)
        throw new Error('Not logged in!')
    } 

    return res.status(200).json(req.user)
})


// @desc    Refresh user Token
// @route   GET /refresh
// @access  Public
exports.refreshUserToken = asyncHandler(async(req, res) => {
    const requestToken = req.cookies.refreshToken
    
    if(!requestToken){
        res.status(401)
        throw new Error('Refresh token is required')
    }

    let refreshToken = await RefreshToken.findOne({
        where: {token: requestToken}
    })
    .catch(err => {throw err})

    if(!refreshToken){
        res.status(401)
        throw new Error('Refresh token not exist!')
    }

    if(verifyExpiration(refreshToken)){
        RefreshToken.destroy({
            where: {token: refreshToken.token}
        })

        res.status(401)
        throw new Error('Refresh token was expired. Please make a new signin request')
    }

    const user = await User.findOne({
        where: {id: refreshToken.userId}, 
        include: [{model: Member}, {model: Moderator}]
    })
    .catch(err => {throw err})

    const userData = {
        user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.roles,
            verified: user.verified,
            name: user.member ? user.member.name : user.moderator ? user.moderator.name: undefined,
        },
        profile: user.member ? user.member : user.moderator ? user.moderator: undefined
    }

    let newAccessToken = generateJwt(userData.user)

    return res.status(200).json({
        accessToken: newAccessToken
    })
})



// @desc    Validate new user
// @route   GET /validation/:userId/verify/:token
// @access  Public
exports.validateAccount = asyncHandler(async (req, res) => {
    const user = await User.findOne({
        where: { id: req.params.userId }
    })
    .catch((err) => {
        res.status(500)
        throw err
    })

    if (!user) {
        res.status(404) 
        throw new Error('User not found')
    }

    if (user.verified) {
        return res.redirect(302, `${WEB_URL}login`)
    }

    const token = await VerificationToken.findOne({
        where: {
            token: req.params.token,
            userId: req.params.userId
        }
    })

    if (!token) {
        res.status(404) 
        throw new Error('Token not valid!')
    }
    
    await user.update({ verified: true })
    .then(async () => {
        await user.save()
        await token.destroy()

        return res.redirect(302, `${WEB_URL}authentication/verified`)
    })
    .catch((err) => {
        res.status(500)
        throw err
    })

}) 


// @desc    Resend token 
// @route   POST /validation/:userId/
// @access  Public
exports.resendVerificationToken = asyncHandler(async (req, res) => {
    const id = req.params.userId

    try {
        const data = await sendVerificationEmail(id)
        await emailSender(data)
        res.status(200).json({
            message: 'Resend email success', 
            data: data
        })
    } catch (err) {
        res.status(500)
        throw err
    }

}) 


const sendVerificationEmail = asyncHandler(async (UserId) => {
    let tokenToSend

    if (!UserId) {
        throw new Error('No user provided!')
    }

    const user = await User.findOne({
        where: { id: UserId },
        include: [{ model: Member, attributes: ['name'] }]
    })
    .catch(err => {
        res.status(500)
        throw err
    })

    if (!user) {
        throw new Error('User not found.')
    }

    if (user.verified === true) {
        throw new Error('User already verified.')
    }

    const token = await VerificationToken.findOne({
        where: { userId: user.id }
    })

    if (token) {
        tokenToSend = token.token
    } else {
        let newToken = await generateVerificationToken(UserId)
        tokenToSend = newToken.token
    }


    try {
        let data = {
            type: 'VERIFICATION',
            name: user.member.name,
            email: user.email,
            username: user.username,
            token: tokenToSend,
            subject: "Validasi akun Oktan ITB 2023",
            link: `${BASE_URL}v1/validation/${user.id}/verify/${tokenToSend}`
        }

        return data
    } catch (error) {
        throw error
    }
}) 



const generateVerificationToken = asyncHandler(async (id) => {
    return await VerificationToken.create({
        token: crypto.randomBytes(32).toString('hex'),
        userId: id
    })
        .then(token => { return token })
        .catch(err => {
            throw err
        })
})

const generateJwt = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT.jwtExpiration
    })
}



const createRefreshToken = async({userData, userId}) => {
    let expireAt = new Date()

    expireAt.setSeconds(expireAt.getSeconds() + JWT.jwtRefreshExpiration)

    let refreshToken = await RefreshToken.findOne({
        where: {userId: userId}
    })
    .then(async(token) => {
        if(token) return await token.update({
            token: generateJwt(userData),
            expireIn: expireAt.getTime()
        })

        return await RefreshToken.create({
            token: generateJwt(userData),
            userId: userId,
            expireIn: expireAt.getTime()
        })
    })

    return refreshToken
}

const verifyExpiration = (token) => {
    return token.expireIn.getTime() < new Date().getTime()
}