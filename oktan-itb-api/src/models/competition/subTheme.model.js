const db = require("../db")
const Competition = require("./competition.model")

const subTheme = db.sequelize.define("competition_sub_theme", {
    name: {
        type: db.DataTypes.STRING
    }
    },
    {
        timestamps: false, 
        freezeTableName: true
    })

Competition.hasMany(subTheme)
subTheme.belongsTo(Competition, {
    foreignKey: 'competitionId'
})

module.exports = subTheme
