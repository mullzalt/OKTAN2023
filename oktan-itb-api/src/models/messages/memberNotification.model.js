const db = require("../db")
const Competition = require("../competition/competition.model")
const Member = require("../user/member.model")
const Moderator = require("../user/moderator.model")



const memberNotification = db.sequelize.define("member_notification", {
    message: {
        type: db.DataTypes.TEXT
    },
    from: {
        type: db.DataTypes.UUID,
        references: {
            model: Moderator,
            key: "id"
        }
    },
    memberId: {
        type: db.DataTypes.UUID,
        references: {
            model: Member,
            key: "id"
        }
    },
    competitionId: {
        type: db.DataTypes.UUID,
        references: {
            model: Competition,
            key: "id"
        }
    },
    about: {
        type: db.DataTypes.ENUM('MAIN', 'ENROLLMENT', 'INVOICE', 'SUBMISSION'),
        defaultValue: 'MAIN'
    },
    type: {
        type: db.DataTypes.ENUM('DENIED', 'ACCEPTED', 'WARNING', 'NEW'),
        defaultValue: 'DENIED'
    },
},
    {
        timestamps: false,
        freezeTableName: true
    })


module.exports = memberNotification
