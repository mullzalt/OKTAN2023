const express = require("express");
const router = express.Router();

const authRouter = require('./users/auth.routes')
const userRouter = require('./users/user.routes')
const memberRouter = require('./users/member.routes')

router.use('/', authRouter)
router.use('/users', userRouter)
router.use('/members', memberRouter)
router.use('/moderators', require('./users/moderator.routes'))

router.use('/competitions', require('./competitions/competition.routes'))


module.exports = router