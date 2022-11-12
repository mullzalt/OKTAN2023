const {DATABASE} = require('../configs/config')
const {Sequelize, Op, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    DATABASE.DB, 
    DATABASE.USER, 
    DATABASE.PASSWORD, 
    {
        host: DATABASE.HOST,
        dialect: DATABASE.dialect,
        pool: {
            max: DATABASE.pool.max, 
            min: DATABASE.pool.min,
            acquire: DATABASE.pool.acquire, 
            idle: DATABASE.pool.idle
        }
    }
)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.Op = Op
db.DataTypes = DataTypes

module.exports = db
