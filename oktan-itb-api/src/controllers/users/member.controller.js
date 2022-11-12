const asyncHandler = require('express-async-handler')
const { fn } = require('sequelize');

const { Op } = require('../../models/db');
const { Member, User } = require('../../models');
const { makePagination, paginateResult } = require('../../utils/paginate');



// @desc    Get all member
// @route   GET /members
// @access  Private Moderator only
exports.getMembers = asyncHandler(async(req, res) => {
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
            attributes: ['username', 'email']
        }],
    })
    .then((data) => {
        const result = paginateResult(data,paginate.currentPage, paginate.limit)

        return res.status(200).json({
            size: paginate.limit,
            currentPage : result.currentPage,
            totalPage: result.totalPages,
            totalItem: result.totalItem, 
            members: result.rows
        })
    })
    .catch((err) => {throw err})
})

// @desc    Get one member
// @route   GET /members/:id
// @access  Private Moderator only
exports.getMember = asyncHandler(async(req, res) => {
    const memberId = req.params.memberId

    const member = await Member.findOne({
        where: {id: memberId}, 
        include: [
            {model: User, attributes: ['id', 'username', 'email']}
        ]
    })
})


// @desc    Edit profile data
// @route   PUT /members/:memberId
// @access  Private Owner Only
exports.editProfile = asyncHandler(async(req, res) => {
    const {name, institute, phone} = req.body
    const userMemberId = req.user?.profile?.id ? req.user.profile.id : null
    const memberId = req.params.memberId

    const member = await Member.findOne({
        where: {id: memberId}
    })

    if(!member){
        res.status(404)
        throw new Error('Member not found')
    }

    if(memberId !== userMemberId){
        res.status(403)
        throw new Error('Not authorized to edit this!')
    }

    await member.update({
        name: name, 
        institute: institute, 
        phone: phone
    })
    .catch(err => {throw err})


    return res.status(200).json(member)
})


