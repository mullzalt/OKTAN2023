const db = require("../db")
const User = require("./user.model")

const PasswordResetToken = db.sequelize.define("password_token", {
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
    }, 
    expireIn: {
        type: db.DataTypes.DATE, 
    }
    },
    {
        timestamps: false, 
        freezeTableName: true
    })

User.hasOne(PasswordResetToken)
PasswordResetToken.belongsTo(User)

module.exports = PasswordResetToken