const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const { fn } = require('sequelize');

const { Op } = require('../../models/db');
const { Member, User, Moderator } = require('../../models');
const { makePagination, paginateResult } = require('../../utils/paginate');





exports.registerNewModerator = asyncHandler(async (req, res) => {
    const { name, position, phone, isAdmin } = req.body
    const { username, password, email } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    let role

    if (Boolean(isAdmin) === true) {
        role = "admin"
    } else {
        role = "panitia"
    }

    const register = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        roles: role,
        verified: true
    })
        .then(async (user) => {
            const moderator = await Moderator.create({
                name: name,
                phone: phone,
                position: position,
                userId: user.id
            })

            return { user, moderator }
        })
        .catch((err) => { throw err })

    return res.status(201).json(register)
})