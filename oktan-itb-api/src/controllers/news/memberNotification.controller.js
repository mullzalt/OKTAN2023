const asyncHandler = require('express-async-handler');
const { Op } = require('../../models/db')

const { MemberNotification, Member, Competition } = require("../../models");

exports.createAnnoucement = asyncHandler(async (req, res) => {

})

exports.sendPrivateNotification = asyncHandler(async (req, res) => {

})

exports.getNotifications = asyncHandler(async (req, res) => {
    const { memberId } = req.params

    const notification = await MemberNotification.findAll({
        where: { memberId: memberId }
    })

    return res.json(notification)
})

exports.deleteNotifications = asyncHandler(async (req, res) => {
    const { memberId } = req.params

    const { about, type } = req.query

    const isHasAbout = about ? { about: about } : null
    const isHasType = type ? { type: type } : null


    const condition = {
        [Op.and]: [
            { memberId: memberId }, isHasAbout, isHasType
        ]
    }

    const notification = await MemberNotification.destroy({
        where: condition
    })

    return res.json(notification)
})