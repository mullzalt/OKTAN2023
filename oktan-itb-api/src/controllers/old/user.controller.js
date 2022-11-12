const crypto = require('crypto')
const { Op } = require('../models/db');
const { fn } = require('sequelize');
const bcrypt = require('bcryptjs')

const { User, PasswordResetToken} = require("../models");
const jsonResponse = require("../utils/jsonResponse");
const { makePagination, paginateResult } = require("../utils/paginate");





// @desc    Get current user logged
// @route   GET /user/me
// @access  Private 
exports.getOne = async(req, res) => {
    const userId = req.params.userId

    await User.findOne({
        where: {id: userId},
        attributes: {
            exclude: ['password']
        }
    })
    .then((user) => {
        if(!user) return res.status(404).json(jsonResponse(false, "User not found", null))

        return res.status(200).json(
            jsonResponse(true, null, user)
        )
    })
    .catch((err) => {
        return res.status(500).json(
            jsonResponse(false, "Unable to get user.", {message: err.message})
        )
    })
}

// @desc    Get current user logged
// @route   GET /user/fetchAll
// @access  Private Admin Only
exports.findAll = async(req, res) => {
    const {where, size, page} = req.query
    
    var condition = where ? { 
        [Op.or]: [
            {username: {[Op.like]: `%${where}%`}},
            {email: {[Op.like]: `%${where}%`}},
            {roles: {[Op.like]: `%${where}%`}},
        ]
    } : null;

    const paginate = makePagination(page, size)
    
    await User.findAndCountAll({
        where: condition,
        limit: paginate.limit, 
        offset: paginate.offset,
        attributes: {
            exclude: ['password']
        }
    })
    .then((data) => {
        const result = paginateResult(data,paginate.currentPage, paginate.limit)

        return res.status(200).json({
            size: paginate.limit,
            currentPage : result.currentPage,
            totalPage: result.totalPages,
            totalItem: result.totalItem, 
            users: result.rows
        })
    })
    .catch((err) => {
        res.status(500).json({
            success: false, 
            message: "Failed to get user data", 
            errors: {
                message: err.message
            }
        })
    })
}


exports.sendPasswordReset = async(req, res) => {
    let user = await User.findOne({
        where: {[Op.or]: [
            {username: {[Op.eq]:req.body.identifier }},
            {email: {[Op.eq]: req.body.identifier}},
        ]}, 
        attributes: {
            exclude: ['password']
        }
    })

    if(!user) return res.status(404).json({message: "User not found"})

    let fiveMinutes = new Date()
    fiveMinutes.setMinutes(fiveMinutes.getMinutes() + 15)

    let sendToken = await PasswordResetToken.create({
        token: crypto.randomBytes(32).toString('hex'),
        userId: user.id, 
        expireIn: fiveMinutes
    })
    .catch((err) => {
        return res.status(500).json({message: err.message})
    })


    // return res.status(200).json({message: "Send Reset Password Token done successfully."})
    return res.status(200).json(sendToken)
}

exports.forgotPasswordReset = async(req, res) => {
    const {password, confirmPassword}  = req.body

    let passToken = await PasswordResetToken.findOne({
        where: {[Op.and]: [
            {userId: req.params.userId},
            {token: req.params.token}
        ]}
    })
    .catch(err => {
        return res.status(500).json({message: err.message})
    })

    if(!passToken) res.status(404).json({message: 'Token not existing'})
    
    const due = new Date(passToken.expireIn)
    const now = new Date(Date.now())

    if ((due - now) < 0) return res.json({message: 'Token expired'})

    let updateUser = await User.findOne({
        where: {id: req.params.userId}
    })

    if(!updateUser) return res.status(404).json({message: "User not found"})

    if(password !== confirmPassword) res.status(400).json({message: "Password does not match!"})
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await updateUser.update({
        password: 'asdfasdf'
    })

    return res.json(updateUser)

}