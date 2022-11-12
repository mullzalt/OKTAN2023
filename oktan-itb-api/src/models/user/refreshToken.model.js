const crypto = require('crypto')

const { JWT } = require("../../configs/config")
const db = require("../db")
const User = require("./user.model")


const RefreshToken = db.sequelize.define("refresh_token", {
    token: {
        type: db.DataTypes.TEXT,
        allowNull: false,
    },
    expireIn: {
        type: db.DataTypes.DATE, 
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


User.hasOne(RefreshToken)


module.exports = RefreshToken
