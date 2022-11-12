const { User, Member, Moderator} = require("../models");
const { Op } = require('../models/db');
const { makePagination, paginateResult } = require("../utils/paginate");

const path = require('path');
const fs = require('fs')
const { isFormatValid, randomFilename, saveFile } = require("../utils/uploadFile");
const { BASE_URL } = require("../configs/config");
const { fn, col } = require("sequelize");
const jsonResponse = require("../utils/jsonResponse");



// @desc    Get current user logged
// @route   GET /member/me
// @access  Private 
exports.getMe = async(req, res) => {
    await User.findOne({
        where: {id: req.user.id}, 
        include: [
            {model: Member},
        ],
        
    })
    .then(me => {
        if(!me){
            return res.status(401).json({message: 'Please login'})
        }

        return res.status(200).json(me)
    })
}



// @desc    Get current user logged
// @route   GET /member/me
// @access  Private 
exports.getOne = async(req, res) => {
    const userId = req.params.userId
    const url = (BASE_URL + 'public/uploads/idcard/').toString()

    await Member.findOne({
        where: {
            userId: userId
        },
        include: [{
            model: User,
            attributes: ['username', 'email']
        }],
        attributes: {
            include: [
                [
                    fn('CONCAT', url, col('id_card_path')), 
                    'id_card'
                ]
            ],
            exclude: ['id_card_path']
        }
    })
    .then((user) => {
        if(!user) return res.status(404).json(jsonResponse(false, "Member not found"))

        return res.status(200).json(
            jsonResponse(true, null, [user])
        )
    })
    
}

// @desc    Get current user logged
// @route   GET /member/fetchAll
// @access  Private Moderator Only
exports.findAll = async(req, res) => {
    const {where, size, page} = req.query

    var condition = where ? { 
        [Op.or]: [
            {name: {[Op.like]: `%${where}%`}},
            {institute: {[Op.like]: `%${where}%`}},
            {phone: {[Op.like]: `%${where}%`}},
        ]
        
    } : null;

    const paginate = makePagination(page, size)
    

    await Member.findAndCountAll({
        where: condition,
        limit: paginate.limit, 
        offset: paginate.offset,
        include: [{
            model: User,
            attributes: ['id', 'username', 'email'],
            nested: true
        }]
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
            message: "Failed to get member data", 
            errors: {
                message: err.message
            }
        })
    })
}


// @desc    Edit profile 
// @route   PUT /member/:userId/edit
// @access  Private Owner Only
exports.editProfileMember = async(req, res) => {
    const {name, institute, phone} = req.body
    const id = req.params.userId


    let member = await Member.findOne({
        where: {
            userId: id
        },
        attributes: {
            exclude: ['userId', 'id_card_path']
        }
    })
    .then((data) => {
        if(!data){
            return res.status(404).json({
                success: false, 
                message: "Member not found!"
            })
        }

        data.update({
            name: name ? name : data.name,
            institute: institute ? institute : data.institute, 
            phone: phone ? phone : data.phone
        })

        return data
    })
    .catch((err) => {
        return res.status(500).json({
            success: false, 
            message: "Can not update, something went wrong",
            errors: {
                message: err
            }
        })
    })


    return res.status(200).json({
        success: true, 
        message: "Profile successfully updated.", 
        data: {
            member: member,
        }
    })
}
