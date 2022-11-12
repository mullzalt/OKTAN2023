const crypto = require('crypto')
const { fn } = require('sequelize');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')

const { Op } = require('../../models/db');
const { User, PasswordResetToken } = require('../../models');
const { makePagination, paginateResult } = require('../../utils/paginate');


// @desc    Get users
// @route   GET /users
// @access  Private Admin Only

exports.getAllUser = asyncHandler(async(req, res) => {
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
    .catch((err) => {throw err})
})