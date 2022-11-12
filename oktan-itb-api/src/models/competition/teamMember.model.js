const db = require("../db")
const Participant = require("./participant.model")

const TeamMember = db.sequelize.define("team_member", {
    id: {
        type: db.DataTypes.UUID,
        defaultValue: db.DataTypes.UUIDV4,
        allowNull: false, 
        primaryKey: true
    },
    name: {
        type: db.DataTypes.STRING
    },
    phone: {
        type: db.DataTypes.STRING
    },
    },
    {
        timestamps: false, 
        freezeTableName: true
    })

Participant.hasMany(TeamMember, {
    foreignKey: {
        name: 'participantId',
        as: 'teamMembers'
    }
})
TeamMember.belongsTo(Participant)

module.exports = TeamMember
