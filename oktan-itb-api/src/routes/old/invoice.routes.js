const router = require('express').Router()

const invoice = require('../controllers/invoice.controller')
const { uploadFile } = require('../middlewares/fileUploader')
const verify = require('../middlewares/userVerification')


router.post('/banks',
    // [verify.protect, verify.isModerator], 
    invoice.createBankAccount
)

router.get('/banks/:bankId',
    // [verify.protect, verify.isModerator], 
    invoice.getOneBankAccount
)

router.get('/banks/',
    // [verify.protect, verify.isModerator], 
    invoice.getBankAccout
)

router.put('/banks/:bankId',
    // [verify.protect, verify.isModerator], 
    invoice.updateBankAccount
)
router.delete('/banks/:bankId',
    // [verify.protect, verify.isModerator], 
    invoice.deleteBankAccount
)

router.post('/invoices/me/:competitionId/',
    [verify.protect],
    invoice.sendInvoice
)

router.get('/invoices/get/:invoiceId',
    [verify.protect],
    invoice.getInvoice
)

router.get('/invoices/me',
    [verify.protect],
    invoice.getMyInvoice
)

router.put('/invoices/me/:competitionId/submit',
    [
        verify.protect,
        uploadFile
    ],
    invoice.submitPayment
)

router.put('/invoices/me/:competitionId/update',
    [verify.protect],
    invoice.updateSubmitPayment
)

router.get('/invoices/',
    [
        verify.protect,
        // verify.isModerator

    ],
    invoice.getPaymentLog
)

router.put('/invoices/set/:invoiceId',
    [
        verify.protect,
        // verify.isModerator

    ],
    invoice.setPaymentStatus
)


module.exports = router