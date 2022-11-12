const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { User, VerificationToken, Member, Moderator } = require("../../models");
const sendEmail = require('../../utils/email/sendVerification');
const { BASE_URL, JWT_SECRET, WEB_URL } = require('../../configs/config');
const { Op } = require('../../models/db');
const jsonResponse = require('../../utils/jsonResponse');

// @desc    Register new user
// @route   POST /auth/register
// @access  Public
exports.register = async (req, res) => {
    const { username, email, password } = req.body
    const { name, institute, phone } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    let token
    let member
    

    let register = await User.create({
        username: username,
        email: email,
        password: hashedPassword
    })
        .then(async (user) => {
            member = await Member.create({
                name: name,
                phone: phone,
                institute: institute,
                userId: user.id
            })

            token = await resendToken(user.id)
            await sendEmail(token)

            return user
        })
        .catch((err) => {
            return res.status(500).json(
                jsonResponse(false, "Failed to create user.", { message: err.message }))
        })

    return res.status(201).json(
        jsonResponse(true, null, {
            verification_token: token.token,
            name: member.name,
            id: register.id,
            username: register.username,
            email: register.email,
            role: register.roles,
            verified: register.verified,
        })
    )

}

// @desc    Validate credentials
// @route   POST /auth/signin
// @access  Public
exports.login = async (req, res) => {
    const { identifier, password } = req.body

    let user = await User.findOne({
        where: {
            [Op.or]: [
                { username: identifier },
                { email: identifier }
            ]
        }, 
        include: [{model: Member}, {model: Moderator}]
    })
        .catch((err) => {
            return res.status(500).json(
                jsonResponse(false, "Something went wrong, unable to login.", err))
        })

    if (!user) {
        return res.status(400).json(
            jsonResponse(false, "Email or username incorrect!"))
    }

    let isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json(
            jsonResponse(false, "Password incorrect!"))
    }


    if (!user.verified) {
        return res.status(403).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.roles,
            verified: user.verified,
        })
    }

    res.status(200).json(
        jsonResponse(true, null, {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.roles,
            verified: user.verified,
            token: await generateJwt(user.id),
            profile: user.member ? user.member : user.moderator ? user.moderator: undefined,
        })
    )
}

// @desc    Validate accounts via links 
// @route   GET /auth/:id/verify/:token
// @access  Public
exports.validateAccount = async (req, res) => {
    let user = await User.findOne({
        where: { id: req.params.id }
    })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not Found"
        })
    }

    if (user.verified) {
        return res.redirect(302, `${WEB_URL}login`)
    }

    let token = await VerificationToken.findOne({
        where: {
            token: req.params.token,
            userId: req.params.id
        }
    })

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "token not valid!"
        })
    }

    await user.update({ verified: true })
        .then(async () => {
            await user.save()
            await token.destroy()

            return res.redirect(302, `${WEB_URL}authentication/verified`)
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                message: "Internal server error.",
                errors: {
                    message: err.message
                }
            })
        })

}


exports.resendVerificationToken = async (req, res) => {
    id = req.params.userId

    try {
        let data = await resendToken(id)
        console.log(data)
        await sendEmail(data)
        res.status(200).json(
            jsonResponse(true, "Resend email success.", {
                email: data.email,
                subject: data.subject
            })
        )
    } catch (error) {
        res.status(400).json(
            jsonResponse(false, null, { message: error.message })
        )
    }

}

const resendToken = async (UserId) => {
    let tokenToSend

    if (!UserId) {
        throw new Error('No user provided!')
    }

    const user = await User.findOne({
        where: { id: UserId },
        include: [{ model: Member, attributes: ['name'] }]
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

    let data = {
        name: user.member.name,
        email: user.email,
        username: user.username,
        token: tokenToSend,
        subject: "Validasi akun Oktan ITB 2023",
        link: `${BASE_URL}v1/${user.id}/verify/${tokenToSend}`
    }

    return data
}

const generateVerificationToken = async (id) => {
    return await VerificationToken.create({
        token: crypto.randomBytes(32).toString('hex'),
        userId: id
    })
        .then(token => { return token })
        .catch(err => {
            throw new Error(err.message)
        })
}

const generateJwt = async (id) => {
    return await jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d'
    })
}