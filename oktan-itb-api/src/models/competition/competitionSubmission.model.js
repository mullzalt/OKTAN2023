const db = require("../db")
const Participant = require("./participant.model")

const Submission = db.sequelize.define("competition_submission", {
    id: {
        type: db.DataTypes.UUID,
        defaultValue: db.DataTypes.UUIDV4,
        allowNull: false, 
        primaryKey: true
    },
    title: {
        type: db.DataTypes.STRING
    },
    theme:{
        type: db.DataTypes.STRING
    },
    mentor: {
        type: db.DataTypes.STRING
    }, 
    mentor_id_number: {
        type: db.DataTypes.STRING
    }, 
    attachment: {
        type: db.DataTypes.TEXT
    }
    },
    {
        freezeTableName: true
    })

Participant.hasOne(Submission, {
    foreignKey: {
        name: 'participantId',
    }
})
Submission.belongsTo(Participant)

module.exports = Submission
