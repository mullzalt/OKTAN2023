const { Competition, Invoice, User, Member, Participant } = require("../models");
const { Op } = require("../models/db");
const BankAccount = require("../models/invoice/bankAccount.model");
const { fileUploadHandler } = require("../utils/uploadFile");
const fs = require('fs');
const { makePagination, paginateResult } = require("../utils/paginate");
const { fn } = require("sequelize");
const { BASE_URL } = require("../configs/config");



exports.createBankAccount = async (req, res) => {
    const { name, bankName, cardNumber } = req.body

    let bankAccount = await BankAccount.create({
        bank_member_name: name,
        bank_name: bankName,
        card_number: cardNumber
    })
        .catch((err) => {
            return res.status(500).json({
                message: `Unable to create bank account: ${err.message}`
            })
        })

    return res.status(201).json(bankAccount)
}

exports.getBankAccout = async (req, res) => {
    let where = req?.query.where ? req.query.where : null
    var condition = where ? {
        [Op.or]: [
            { bank_member_name: { [Op.like]: `%${where}%` } },
            { bank_name: { [Op.like]: `%${where}%` } },
            { card_number: { [Op.like]: `%${where}%` } },
        ]
    } : null

    let banks = await BankAccount.findAll({
        where: condition
    })
        .catch((err) => {
            return res.status(500).json({
                message: `Unable to get bank account: ${err.message}`
            })
        })

    return res.status(200).json(banks)
}

exports.getOneBankAccount = async (req, res) => {
    let banks = await BankAccount.findOne({
        where: { id: req.params.bankId }
    })
        .catch((err) => {
            return res.status(500).json({
                message: `Unable to get bank account: ${err.message}`
            })
        })

    if (!banks) return res.status(404).json({
        message: `Bank account not found`
    })

    return res.status(200).json(banks)
}

exports.updateBankAccount = async (req, res) => {
    const { name, bankName, cardNumber } = req.body
    let banks = await BankAccount.findOne({
        where: { id: req.params.bankId }
    })
        .catch((err) => {
            return res.status(500).json({
                message: `Unable to get bank account: ${err.message}`
            })
        })

    await banks.update({
        bank_member_name: name ? name : banks.bank_member_name,
        bank_name: bankName ? bankName : banks.bank_name,
        card_number: cardNumber ? cardNumber : banks.card_number
    })

    if (!banks) return res.status(404).json({
        message: `Bank account not found`
    })

    return res.status(200).json(banks)
}

exports.deleteBankAccount = async (req, res) => {
    let banks = await BankAccount.findOne({
        where: { id: req.params.bankId }
    })
        .catch((err) => {
            return res.status(500).json({
                message: `Unable to get bank account: ${err.message}`
            })
        })

    if (!banks) return res.status(404).json({
        message: `Bank account not found`
    })

    await banks.destroy()

    return res.status(200).json({ message: "Bank data successfully deleted" })
}


exports.sendInvoice = async (req, res) => {
    let credential
    try {
        credential = await checkCredential(req, res)
    } catch (err) {
        return res.status(400).json({ message: `Cannot create invoice: ${err.message}` })
    }

    let alreadySent = await Invoice.findOne({
        where: {
            [Op.and]: [
                { competitionId: credential.competition.id },
                { memberId: credential.member.id },
            ]
        }
    })

    if (alreadySent) return res.status(400).json({ message: `Invoices already sent!` })


    let invoice = await Invoice.create({
        total_ammount: credential.competition.entry_fee,
        competitionId: credential.competition.id,
        memberId: credential.member.id
    })
        .catch((err) => {
            return res.status(500).json({ message: `Cannot create invoice: ${err.message}` })
        })

    return res.status(200).json(invoice)
}

exports.getInvoice = async (req, res) => {
    const id = req.params.invoiceId

    // payments / ${ credential.competition.category } /${credential.competition.id}

    let invoice = await Invoice.findOne({
        where: { id: id },
        include: [
            { model: Competition, as: 'competition' },
            { model: Member, as: 'member' },
            { model: BankAccount, as: 'paymentTo' }
        ],
    })

        .catch((err) => {
            return res.status(500).json({ message: `Cannot get invoice: ${err.message}` })
        })



    if (!invoice) return res.status(404).json({ message: `Cannot get invoice: invoice not found` })

    return res.status(200).json(invoice)
}

exports.getMyInvoice = async (req, res) => {
    let credential
    try {
        credential = await checkCredential(req, res)
    } catch (err) {
        return res.status(400).json({ message: `Cannot get invoice: ${err.message}` })
    }

    let where = req?.query.status ? req.query.status : null
    var condition = where ? {
        [Op.and]: [
            { status: { [Op.eq]: `${where}` } },
            { memberId: credential.member.id }
        ]

    } : {
        [Op.or]: [
            { status: { [Op.eq]: `PAIDOFF` } },
            { status: { [Op.eq]: `REJECTED` } },
            { status: { [Op.eq]: `PENDING` } },
        ],
        [Op.and]: [
            { memberId: credential.member.id }
        ],
    };

    let invoice = await Invoice.findAll({
        where: condition,
        include: [
            { model: Competition, as: 'competition' },
            { model: Member, as: 'member' },
            { model: BankAccount, as: 'paymentTo' }
        ]
    })
        .catch((err) => {
            return res.status(500).json({ message: `Cannot get invoice: ${err.message}` })
        })

    return res.status(200).json(invoice)
}

exports.submitPayment = async (req, res) => {
    let credential
    try {
        credential = await checkCredential(req, res)
    } catch (err) {
        return res.status(400).json({ message: `Cannot get invoice: ${err.message}` })
    }

    let invoice = await Invoice.findOne({
        where: {
            [Op.and]: [
                { competitionId: credential.competition.id },
                { memberId: credential.member.id },
            ]
        }
    })
        .catch((err) => {
            return res.status(500).json({ message: `Cannot get invoice: ${err.message}` })
        })

    if (!invoice) return res.status(404).json({ message: `Cannot get invoice: invoice not found` })

    let upload
    try {
        upload = await fileUploadHandler({
            file: req.file,
            nameFormat: `[PAYMENTPROOF]_[${credential.member.id}]_[${credential.competition.id}]`,
            folder: `payments/${credential.competition.category}/${credential.competition.id}`,
            formats: ['pdf', 'png', 'jpg', 'jpeg']
        })
    } catch (error) {
        if (req.file.path) fs.unlinkSync(req.file.path)
        return res.json({ message: error.message })
    }

    await invoice.update({
        proof_file: upload?.filename,
        status: 'PENDING'
    })
        .catch(err => {
            return res.status(500).json({ message: `Cannot update invoice: ${err.message}` })
        })

    return res.json(invoice)
}

exports.updateSubmitPayment = async (req, res) => {
    let credential
    try {
        credential = await checkCredential(req, res)
    } catch (err) {
        return res.status(400).json({ message: `Cannot get invoice: ${err.message}` })
    }

    let invoice = await Invoice.findOne({
        where: {
            [Op.and]: [
                { competitionId: credential.competition.id },
                { memberId: credential.member.id },
            ]
        }
    })
        .catch((err) => {
            return res.status(500).json({ message: `Cannot get invoice: ${err.message}` })
        })

    if (!invoice) return res.status(404).json({ message: `Cannot get invoice: invoice not found` })

    await invoice.update({
        bank_customer: req.body.bankCustomer,
        bank_number: req.body.bankNumber,
        paymentToId: req.body.paymentTo
    })
        .catch(err => {
            return res.status(500).json({ message: `Cannot update invoice: ${err.message}` })
        })

    return res.status(200).json(invoice)
}

exports.setPaymentStatus = async (req, res) => {
    let invoice = await Invoice.findOne({
        where: { id: req.params.invoiceId },
        include: [
            { model: Competition, as: 'competition' },
            { model: Member, as: 'member' },
            { model: BankAccount, as: 'paymentTo' },
        ]
    })

    if (!invoice) return res.status(404).json({ message: `Cannot get invoice: invoice not found` })

    let participant
    try {
        await invoice.update({
            status: req.body.status,
            message: req.body.message
        })

        participant = await Participant.findOne({
            where: [{ memberId: invoice.member.id }, { competitionId: invoice.competition.id },]
        })

        participant.update({
            allowedToJoin: (req.body.status === 'PAIDOFF') ? true : false,
            status: (req.body.status === 'PAIDOFF') ? 'ACTIVE' : 'ENROLLED'
        })
    } catch (err) {
        return res.status(500).json({ message: `Cannot update invoice: ${err.message}` })
    }
    await invoice.update({
        status: req.body.status,
        message: req.body.message
    })


    return res.status(200).json({ invoice, participant })
}

exports.getPaymentLog = async (req, res) => {
    const { where, size, page, status } = req.query

    const paginate = makePagination(page, size)


    var condition = where ? {
        [Op.or]: [
            { '$member.name$': { [Op.like]: `%${where}%` } },
            { '$competition.title$': { [Op.like]: `%${where}%` } },
            { '$competition.category$': { [Op.like]: `%${where}%` } },
        ],
        [Op.and]: [
            { status: { [Op.eq]: status ? status : "PENDING" } }
        ]

    } : status ? { status: { [Op.eq]: status } } :
        { status: { [Op.eq]: 'PENDING' } }

    let invoice = await Invoice.findAndCountAll({
        where: condition,
        limit: paginate.limit,
        offset: paginate.offset,
        include: [
            { model: Member, as: 'member' },
            { model: Competition, as: 'competition' },
            { model: BankAccount, as: 'paymentTo' }
        ],
        order: [['updatedAt', 'DESC']]
    })
        .then((data) => {
            const result = paginateResult(data, paginate.currentPage, paginate.limit)

            let rowsToFill = result.rows



            return {
                size: paginate.limit,
                currentPage: result.currentPage,
                totalPage: result.totalPages,
                totalItem: result.totalItem,
                payments: result.rows
            }
        })
        .catch((err) => {
            return res.status(500).json({ message: `Cannot get invoice: ${err.message}` })
        })

    return res.status(200).json(invoice)
}



const checkCredential = async (req, res) => {
    let user = await User.findOne(
        { where: { id: req.user.id } }
    )

    if (!user) throw new Error('Please login first')

    let member = await Member.findOne({
        where: { userId: user.id }
    })

    if (!member) throw new Error('Member not found, Please login first')

    let competition = req.params?.competitionId ? await Competition.findOne({
        where: { id: req.params.competitionId }
    }).then(data => {
        if (!data) throw new Error('Competition not found')
        return data
    }) : null


    return { competition, member, user }

}