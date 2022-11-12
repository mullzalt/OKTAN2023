const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs/config')
const { User } = require('../models')

exports.protect = async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({message: "No token provided!"})
    }

    let decoded

    try {
        const Decoded = jwt.verify(token, JWT_SECRET)
        decoded = Decoded
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    

    req.user = await User.findOne({
        where: {
            id: decoded.id
        },
        attributes: {
            exclude: ['password']
        }
    })
    .catch((err) => {
        return res.status(401).json({
            message: err.message
        })
    })  

    if(!req.user){
        return res.status(401).json({
            message: "User not existed! You are using a invalid token"
            + " Please try to login again."
        })
    }


    next()
}

exports.isOwner = async(req, res, next) => {
    
}

exports.isAdmin = async(req, res, next) => {
    const user = req.user
    if(!user){
        return res.status(400).json({message: "User not found"})
    }
    if(user.roles === "admin"){
        return next()
    }

    res.status(403).json({message: "Only admin can access!"})
}

exports.isModerator = async(req, res, next) => {
    const user = req.user
    if(!user){
        return res.status(400).json({message: "User not found"})
    }
    if(user.roles === "panitia" || user.roles === "admin"){
        return next()
    }

    res.status(403).json({message: "Only admin or moderator can access!"})
    
}
exports.isMember = async(req, res, next) => {
    const user = req.user
    if(!user){
        return res.status(400).json({message: "User not found"})
    }
    if(user.roles === "peserta"){
        return next()
    }

    res.status(403).json({message: "Only member can access this!"})
}