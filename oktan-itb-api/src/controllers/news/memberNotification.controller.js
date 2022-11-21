const asyncHandler = require('express-async-handler');
const { Op } = require('../../models/db')

const { MemberNotification, Member, Competition, Moderator } = require("../../models");

exports.createAnnoucement = asyncHandler(async (req, res) => {
    const { message, from } = req.body


    const notification = await MemberNotification.create({
        about: 'MAIN',
        type: 'NEW',
        message: message,
        from: from
    })
        .catch(err => {
            res.status(500)
            throw err
        })

    return res.status(200).json(notification)
})

exports.getMainNotification = asyncHandler(async (req, res) => {
    const notification = await MemberNotification.findAll({
        where: {
            about: 'MAIN',
            type: 'NEW',
        }
    })
        .catch(err => {
            res.status(500)
            throw err
        })

    return (notification)
})

exports.sendNotification = asyncHandler(async (req, res) => {
    const { memberId, competitionId, about, type, message, from } = req.body

    const notification = await MemberNotification.findOne({
        where: {
            memberId: memberId,
            competitionId: competitionId,
            about: about
        }
    })
        .then((data) => {
            if (!data) {
                const create = data.create({
                    memberId: memberId,
                    competitionId: competitionId,
                    about: about,
                    type: type,
                    message: message,
                    from: from
                })

                return create
            }

            data.update({
                type: type,
                message: message,
                from: from
            })
            return data

        })
        .catch((err) => {
            res.status(500)
            throw err
        })


    return res.json(notification)
})


exports.getNotificationsByMembers = asyncHandler(async (req, res) => {
    const { memberId } = req.params
    const about = req.query.about
    const type = req.query.type

    const whereAbout = about ? { about: about } : null
    const whereTyype = type ? { type: type } : null

    const notification = await MemberNotification.findAll({
        where: {
            [Op.and]: [
                { memberId: memberId },
                whereAbout, whereTyype
            ]
        },
    })

    return res.json(notification)
})

exports.deleteNotifications = asyncHandler(async (req, res) => {
    const { notificationId } = req.params

    const notification = await MemberNotification.destroy({
        where: { id: notificationId }
    })

    return res.json(notification)
})