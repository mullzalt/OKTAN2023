const express = require("express");
const router = express.Router();

const authRouter = require('./users/auth.routes')
const userRouter = require('./users/user.routes')
const memberRouter = require('./users/member.routes');


router.use('/', authRouter)
router.use('/users', userRouter)
router.use('/members', memberRouter)
router.use('/moderators', require('./users/moderator.routes'))

router.use('/competitions', require('./competitions/competition.routes'))
router.use('/competitions', require('./competitions/enroll.routes'))
router.use('/competitions', require('./competitions/participant.routes'))

router.use('/banks', require('./payments/banks.routes'))
router.use('/invoices', require('./payments/invoice.routes'))

module.exports = router