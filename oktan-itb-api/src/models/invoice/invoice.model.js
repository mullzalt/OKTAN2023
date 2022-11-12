const db = require("../db")

const Competition = require("../competition/competition.model")
const User = require("../user/user.model")
const BankAccount = require("./bankAccount.model")
const Member = require("../user/member.model")


const Invoice = db.sequelize.define("invoice", {
    id: {
        type: db.DataTypes.UUID,
        defaultValue: db.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    total_ammount: {
        type: db.DataTypes.DOUBLE
    },
    bank_customer: {
        type: db.DataTypes.STRING
    },
    bank_number: {
        type: db.DataTypes.STRING
    },
    proof_file: {
        type: db.DataTypes.TEXT
    },
    status: {
        type: db.DataTypes.ENUM('UNPAID', 'PENDING', 'REJECTED', 'PAIDOFF'),
        defaultValue: 'UNPAID'
    },
    message: {
        type: db.DataTypes.TEXT
    }

},
    {
        freezeTableName: true,
    })

Member.belongsToMany(Competition, { through: Invoice, as: 'competitionInvoice' })
Competition.belongsToMany(Member, { through: Invoice, as: 'memberInvoice' })
Invoice.belongsTo(Member);
Invoice.belongsTo(Competition);
Member.hasMany(Invoice);
Competition.hasMany(Invoice)

Invoice.belongsTo(BankAccount, { as: 'paymentTo' })
BankAccount.hasMany(Invoice)

module.exports = Invoice