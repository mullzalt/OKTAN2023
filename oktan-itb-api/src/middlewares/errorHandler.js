const { NODE_ENV } = require("../configs/config")

const errorHandler = (err, req, res, next) => {
    if(!err) return next()
    const statusCode = res.statusCode ? res.statusCode : 500
  
    res.status(statusCode)

    const message = err.message
    const errors = err?.errors ? err.errors : undefined
    const stack = (NODE_ENV === 'production') ? undefined : err?.stack
  
    const errorMessage = {
        message, errors, stack
    }

    res.json(errorMessage)
  }
  
  module.exports = {
    errorHandler,
  }