const db = require("../db")
const User = require("./user.model")

const VerificationToken = db.sequelize.define("verification_token", {
    token: {
        type: db.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    userId:{
        type: db.DataTypes.UUID, 
        references: {
            model: "user", 
            key: "id"
        }
    }
    },
    {
        timestamps: false, 
        freezeTableName: true
    })

User.hasOne(VerificationToken)

module.exports = VerificationToken