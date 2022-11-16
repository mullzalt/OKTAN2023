const router = require('express').Router()

const { invoice } = require('../../controllers')
const verifyToken = require('../../middlewares/authJwt')
const { isModerator, isAdmin } = require('../../middlewares/users/rolesValidation')


router.route('/members/:memberId')
    .get([
        verifyToken
    ], invoice.getMyInvoices)

router.route('/members/:memberId/competitions/:competitionId')
    .post([
        verifyToken
    ], invoice.sendInvoice)
    .put([
        verifyToken
    ], invoice.savePayments)
    .get([
        verifyToken
    ], invoice.getInvoiceByCompetitionId)

router.route('/members/:memberId/competitions/:competitionId/proof')
    .post([
        verifyToken
    ], invoice.submitPayments)
    .put([
        verifyToken
    ], invoice.uploadPaymentProof)
    .delete([
        verifyToken
    ], invoice.removePaymentProof)

router.route('/moderators')
    .get([
        verifyToken,
        // isModerator
    ], invoice.getInvoicesLog)

router.route('/moderators/:invoiceId')
    .get([
        verifyToken,
        // isModerator
    ], invoice.getInvoiceById)
    .put([
        verifyToken,
        // isModerator
    ], invoice.verifyPayments)

module.exports = router