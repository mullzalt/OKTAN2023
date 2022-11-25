require('dotenv').config()
const path = require('path')


module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.BASE_URL,
    WEB_URL: process.env.WEB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    PORT: process.env.PORT || 8000,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    __BASEDIR: path.resolve(__dirname, '..', '..'),



    DATABASE: {
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        DB: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },

    EMAIL: {
        USER: process.env.MAIL_USER,
        PASS: process.env.MAIL_PASS,
        HOST: process.env.MAIL_HOST,
        SERVICE: process.env.MAIL_SERVICE,
        PORT: process.env.MAIL_PORT,
        SECURE: Boolean(process.env.MAIL_SECURE)
    },

    JWT: {
        jwtExpiration: 3600,        // 1 hour
        jwtRefreshExpiration: 86400 //24 hours
    }
}