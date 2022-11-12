const db = require("../db")

const BankAccount = db.sequelize.define("bank_account", {
    id: {
        type: db.DataTypes.UUID,
        defaultValue: db.DataTypes.UUIDV4,
        allowNull: false, 
        primaryKey: true
    },
    bank_member_name: {
        type: db.DataTypes.STRING,
    },
    bank_name: {
        type: db.DataTypes.STRING,
    }, 
    card_number: {
        type: db.DataTypes.STRING
    },    
},
{
    freezeTableName: true,
    timestamps: false
})


module.exports = BankAccount