const db = require("../db")
const User = require("./user.model")

const Moderator = db.sequelize.define("moderator", {
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
    position: {
        type: db.DataTypes.STRING
    }
    },
    {
        timestamps: false, 
        freezeTableName: true
    })

User.hasOne(Moderator, {
    foreignKey: {
        name: 'userId',
        type: db.DataTypes.UUID
    }
})
Moderator.belongsTo(User)

module.exports = Moderator