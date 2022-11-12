const db = require("../db")
const User = require("./user.model")

const Member = db.sequelize.define("member", {
    id: {
        type: db.DataTypes.UUID, 
        defaultValue: db.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: db.DataTypes.STRING
    },
    institute: {
        type: db.DataTypes.STRING
    }, 
    phone: {
        type: db.DataTypes.STRING
    }, 
    id_card_path: {
        type: db.DataTypes.TEXT
    }
    },
    {
        timestamps: false, 
        freezeTableName: true
    })

User.hasOne(Member, {
    foreignKey: {
        name: 'userId',
        type: db.DataTypes.UUID
    }
})
Member.belongsTo(User)

module.exports = Member