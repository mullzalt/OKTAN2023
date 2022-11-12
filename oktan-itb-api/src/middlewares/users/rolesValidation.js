const asyncHandler = require('express-async-handler')



exports.isAdmin = asyncHandler(async(req, res, next) => {
    const user = req.user.user
    if(!user){
        res.status(404)
        throw new Error('User not found')
    }
    if(user.role === "admin"){
        return next()
    }

    res.status(403)
    throw new Error('Only admin can acess this content!')
})

exports.isModerator =  asyncHandler(async(req, res, next) => {
    const user = req.user.user
    if(!user){
        res.status(404)
        throw new Error('User not found')
    }
    if(user.role === "admin" || user.roles === "panitia"){
        return next()
    }

    res.status(403)
    throw new Error('Only moderator can acess this content!')
})

exports.isMember =  asyncHandler(async(req, res, next) => {
    const user = req.user.user
    if(!user){
        res.status(404)
        throw new Error('User not found')
    }
    if(user.role === "peserta"){
        return next()
    }

    res.status(403)
    throw new Error('Only member can acess this content!')
})