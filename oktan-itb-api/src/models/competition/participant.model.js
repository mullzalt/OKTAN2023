const db = require("../db")
const Member = require("../user/member.model")
const Competition = require("./competition.model")

const Participant = db.sequelize.define("participant", {
    id: {
        type: db.DataTypes.UUID,
        defaultValue: db.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    allowedToJoin: {
        type: db.DataTypes.BOOLEAN,
        defaultValue: false
    },
    team_name: {
        type: db.DataTypes.STRING,
    },
    mentor_name: {
        type: db.DataTypes.STRING,
    },
    mentor_number: {
        type: db.DataTypes.STRING,
    },
    status: {
        type: db.DataTypes.ENUM('PENDING', 'ENROLLED', 'ACTIVE', 'PASSED', 'DISMISSED'),
        defaultValue: 'PENDING'
    },
    card_file: {
        type: db.DataTypes.TEXT
    }
},
    {
        freezeTableName: true,
    })

Member.belongsToMany(Competition, { through: Participant, as: 'competition' })
Competition.belongsToMany(Member, { through: Participant, as: 'member' })

Participant.belongsTo(Member);
Participant.belongsTo(Competition);
Member.hasMany(Participant);
Competition.hasMany(Participant)

module.exports = Participant