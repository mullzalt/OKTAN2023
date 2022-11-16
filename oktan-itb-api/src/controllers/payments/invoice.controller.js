const asyncHandler = require('express-async-handler')
const { BankAccount, Competition, Member, Invoice, MemberNotification, Participant } = require("../../models")
const { Op } = require('../../models/db')

const { makePagination, paginationResults } = require('../../utils/paginate');

exports.sendInvoice = asyncHandler(async (req, res) => {
    const { member, competition, alreadySent } = await securePayments(req, res)

    if (alreadySent) {
        throw new Error('Invoices have been sents')
    }

    const invoice = await Invoice.create({
        memberId: member.id,
        competitionId: competition.id
    })

    await MemberNotification.create({
        message: 'An invoice have been sent to you',
        memberId: member.id,
        competitionId: competition.id,
        about: 'INVOICE',
        type: 'NEW'
    })

    return res.status(200).json({ message: 'invoices sent', data: invoice })
})


exports.getMyInvoices = asyncHandler(async (req, res) => {
    const { member } = await securePayments(req, res)

    const invoices = await Invoice.findAll({
        where: { memberId: member.id }
    })

    return res.json(invoices)
})

exports.getInvoiceByCompetitionId = asyncHandler(async (req, res) => {
    const { member, alreadySent, messages, invoice, competition } = await securePayments(req, res)

    if (!alreadySent) {
        res.status(404)
        throw new Error('No invoice were found')
    }

    return res.json({ ...invoice.dataValues, messages, member, competition })
})

exports.getInvoicesLog = asyncHandler(async (req, res) => {
    res.json({ message: 'getInvoicesLog' })
})

exports.removePaymentProof = asyncHandler(async (req, res) => {
    res.json({ message: 'removePaymentProof' })
})

exports.savePayments = asyncHandler(async (req, res) => {
    res.json({ message: 'savePayments' })
})


exports.submitPayments = asyncHandler(async (req, res) => {
    res.json({ message: 'submitPayments' })
})


exports.verifyPayments = asyncHandler(async (req, res) => {
    res.json({ message: 'verifyPayments' })
})

exports.getInvoiceById = asyncHandler(async (req, res) => {
    res.json({ message: 'getInvoiceById' })
})

exports.uploadPaymentProof = asyncHandler(async (req, res) => {
    res.json({ message: 'uploadPaymentProof' })
})


const securePayments = async (req, res) => {
    const { memberId, competitionId } = req.params
    const isOwner = memberId === req.user.profile.id ? true : false

    if (!isOwner) {
        res.status(403)
        throw new Error('Only owner can perform such actions')
    }

    const member = await Member.findOne({
        where: { id: memberId }
    })

    if (!member) {
        res.status(404)
        throw new Error('Member not found')
    }

    let competition
    let alreadySent
    let msgs = []
    let invoice


    if (competitionId) {
        competition = await Competition.findOne({
            where: { id: competitionId }
        })

        if (!competition) {
            res.status(404)
            throw new Error('Competiton not found')
        }

        invoice = await Invoice.findOne({
            where: {
                [Op.and]: [
                    { competitionId: competition.id },
                    { memberId: member.id },
                ]
            },
        })

        alreadySent = invoice ? true : false
        const messages = await MemberNotification.findAll({
            where: { competitionId: competition.id, memberId: member.id }
        })
            .then(data => {
                msgs.push(data)
                return data
            })

        const hasNullMessage = checkEmptyInvoiceFields({ invoiceData: invoice })
        const nullMessage = hasNullMessage ? msgs.push(hasNullMessage) : null
    }


    return {
        competition,
        member,
        alreadySent,
        messages: msgs,
        invoice
    }
}

const checkEmptyInvoiceFields = ({ invoiceData }) => {
    if (!invoiceData) return null

    const hasNull = () => {
        for (var table in invoiceData) {
            if (target[table] === null || target[table] === '')
                return true;
        }
        return false;
    }

    if (hasNull) {
        return {
            message: "Empty Values, please complete forms",
            about: "MAIN",
            type: "MISSING_VALUES"
        }
    }
    else {
        return null
    }
}