const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')

const { JWT_SECRET } = require("../configs/config");
const { User, Member, Moderator } = require("../models");


const catchError = (err, res) => {
    if(err instanceof jwt.TokenExpiredError){
        res.status(401)
        throw new Error('Unauthorized! Access Token was expired!')
    }

    throw new Error('Unauthorized!')
}

const verifyToken = asyncHandler(async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        res.status(401)
        throw new Error('No token provided!')
    }

    let decoded = jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){ 
            return catchError(err, res)
        }

        return decoded
    })

    const user = await User.findOne({
        where: {
            id: decoded.id
        },
        attributes: {
            exclude: ['password']
        }, 
        include: [{model: Member}, {model: Moderator}]
    })
    .catch((err) => {throw err})  

    if(!user){
        return res.status(401).json({
            message: "User not existed! You are using a invalid token, please try to login again."
        })
    }

    req.user = {
        user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.roles,
            verified: user.verified
        },
        profile: user.member ? user.member : user.moderator ? user.moderator: undefined,
    }


    next()

})

module.exports = verifyToken
