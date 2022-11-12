const bcrypt = require('bcryptjs');
const { User, VerificationToken, Moderator } = require("../models");
const jsonResponse = require('../utils/jsonResponse');

const { makePagination, paginateResult } = require("../utils/paginate");

// @desc    Get current user logged
// @route   GET /moderator/me
// @access  Private, owner only
exports.getMe = async(req, res) =>{
    await Moderator.findOne({
        where: {
            userId: req.user.id
        }
    }).then((me) => {
        res.status(200).json({
            success: true,
            data: me
        })
    })
}

exports.getAllMod = async(req, res) => {

}

// @desc    Register new moderator
// @route   POST /moderator
// @access  Private, admin only
exports.newMod = async(req, res) => {
    const {name, position, phone, isAdmin} = req.body
    const {username, password, email} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    let role
    let moderator
    let register
    
    if(Boolean(isAdmin)  === true){
        role = "admin"
    }else{
        role = "panitia"
    }

    register = await User.create({
        username: username, 
        email: email, 
        password: hashedPassword,
        roles: role,
        verified: true
    })
    .then(async(user) => {
        moderator = await Moderator.create({
            name: name, 
            phone: phone, 
            position: position,
            userId: user.id
        })

        return user
    })
    .catch((err) => {
        return res.status(500).json(
            jsonResponse(false, "Failed to register new Moderator", {
                message: err.message
            })
        )
    })

    return res.status(201).json(
        jsonResponse(true, null, {
            id: register.id, 
            username: register.username, 
            email: register.username, 
            phone: register.phone,
            role: register.roles,
            position: position
        })
    )
}

// @desc    Edit current moderator profile
// @route   PUT /moderator/:id
// @access  Private, owner only