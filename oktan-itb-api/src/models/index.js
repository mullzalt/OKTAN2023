const mysql = require('mysql2/promise')

const { DATABASE, NODE_ENV } = require("../configs/config");



const initDatabase = async () => {
    const { DB, HOST, USER, PASSWORD } = DATABASE
    const connection = await mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD
    })
        .then(conn => {
            const res = conn.query(`CREATE DATABASE IF NOT EXISTS ${DB}`)
            return res
        })
        .then(result => {
            console.log(result[0][0])
        })
        .catch((err) => {
            console.log(err.message)
        })

    syncDatabase()

}

const syncDatabase = async () => {
    const db = require('./db')

    let options

    if (NODE_ENV === "production" || NODE_ENV === "development") {
        options = false
    } else {
        options = true
    }

    await db.sequelize.sync({ force: options })
        .then(() => {
            console.log("DB successfully synced, forced:", options)
        })
        .catch((err) => {
            console.log("Something went wrong: ", err.message)
        })
}



module.exports = {
    initDatabase,
    User: require('./user/user.model'),
    VerificationToken: require('./user/verificationToken.model'),
    PasswordResetToken: require('./user/passwordToken.model'),
    RefreshToken: require('./user/refreshToken.model'),
    Member: require('./user/member.model'),
    Moderator: require('./user/moderator.model'),

    Competition: require('./competition/competition.model'),
    Participant: require('./competition/participant.model'),
    ParticipantMember: require('./competition/teamMember.model'),
    Submission: require('./competition/competitionSubmission.model'),
    SubTheme: require('./competition/subTheme.model'),

    Invoice: require('./invoice/invoice.model'),
    BankAccount: require('./invoice/bankAccount.model')

}