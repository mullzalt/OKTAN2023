const db = require("../db")

const User = db.sequelize.define("user", {
        id: {
            type: db.DataTypes.UUID,
            defaultValue: db.DataTypes.UUIDV4,
            allowNull: false, 
            primaryKey: true
        },
        email: {
            type: db.DataTypes.STRING,
        },
        username: {
            type: db.DataTypes.STRING,
        }, 
        password: {
            type: db.DataTypes.STRING
        },
        verified: {
            type: db.DataTypes.BOOLEAN, 
            defaultValue: false
        },
        roles: {
            type: db.DataTypes.ENUM('peserta', 'panitia', 'admin'),
            defaultValue: 'peserta'
        }
    },
    {
        tableName: "user",
        timestamps: false
    }
)


module.exports = User