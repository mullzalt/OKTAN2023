module.exports = {
    auth: require('./users/auth.controller'),
    member: require('./users/member.controller'),
    moderator: require('./users/moderator.controller'),

    competition: require('./competitions/competition.controller'),
    enrollment: require('./competitions/enroll.controller'),
    participant: require('./competitions/participant.controller'),
    submission: require('./competitions/submission.controller'),

    invoice: require('./payments/invoice.controller'),
    bankAccount: require('./payments/bankAccount.controller'),

    memberNotification: require('./news/memberNotification.controller')
}

