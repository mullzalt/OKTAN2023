module.exports = {
    auth: require('./users/auth.controller'),
    member: require('./users/member.controller'),
    moderator: require('./users/moderator.controller'),
    competition: require('./competitions/competition.controller')
}

