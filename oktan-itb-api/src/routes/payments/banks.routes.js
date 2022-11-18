const router = require('express').Router()

const { bankAccount } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { isModerator, isAdmin } = require('../../middlewares/users/rolesValidation')



router.route('/')
    .post([
        verifyToken, isAdmin
    ], bankAccount.createBankAccount)
    .get([
        verifyToken,
    ], bankAccount.getBankAccounts)


router.route('/:bankId')
    .get([
        verifyToken
    ], bankAccount.getBankAccountById)
    .put([
        verifyToken, isAdmin
    ], bankAccount.updateBankAccount)
    .delete([
        verifyToken, isAdmin
    ], bankAccount.deleteBankAccount)


module.exports = router