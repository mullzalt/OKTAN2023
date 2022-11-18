const asyncHandler = require('express-async-handler');
const { fileUploadHandler } = require('../../middlewares/fileHandler');
const { BankAccount, Competition, Member, Invoice, MemberNotification, Participant } = require("../../models")
const { Op } = require('../../models/db')

const { makePagination, paginationResults, paginateResult } = require('../../utils/paginate');

exports.sendInvoice = asyncHandler(async (req, res) => {
    const { member, competition, alreadySent } = await securePayments(req, res)

    if (alreadySent) {
        throw new Error('Invoices have been sents')
    }

    const invoice = await Invoice.create({
        memberId: member.id,
        competitionId: competition.id
    })

    await upsertMessage({
        competitionId: competition.id,
        memberId: member.id,
        about: 'INVOICE',
        type: 'NEW',
        messages: 'An invoice have been sent to you'
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
    const { where, size, page, status } = req.query

    const getWhere = where ? {
        [Op.or]: [
            { '$member.name$': { [Op.like]: `%${where}%` } },
            { '$member.institute$': { [Op.like]: `%${where}%` } },
            { '$competition.title$': { [Op.like]: `%${where}%` } },
            { '$competition.category$': { [Op.like]: `%${where}%` } },
        ]
    } : null

    const { limit, currentPage, offset } = makePagination(page, size)

    const getStatus = status ? { status: { [Op.eq]: status } } : null

    const condition = {
        [Op.and]: [
            getWhere,
            getStatus
        ]
    }

    const invoices = await Invoice.findAndCountAll({
        where: condition,
        include: [
            { model: Member, as: 'member' },
            { model: Competition, as: 'competition' },
            { model: BankAccount, as: 'paymentTo' }
        ],
        limit: limit,
        offset: offset
    })
        .then(data => {
            const result = paginateResult(data, currentPage, limit)

            return { ...result, size: limit }
        })

    return res.json(invoices)
})

exports.removePaymentProof = asyncHandler(async (req, res) => {
    const { member, alreadySent, messages, invoice, competition } = await securePayments(req, res)

    if (!invoice.proof_file) {
        res.status(404)
        return res.json({ message: 'Please upload first!' })
    }

    const proofFile = `${BASE_URL}public/uploads/payments/${competition.category}/${competition.id}/${encodeURIComponent(invoice.proof_file.trim())}`


    const filePath = enroll?.card_file ? path.join(__BASEDIR, `payments/${competition.category}/${competition.id}`, enroll.card_file) : null

    let msgs

    try {
        fs.unlinkSync(filePath)
        msgs = 'Successfully remove file'
    } catch (error) {
        throw error
    }

    await invoice.update({
        proof_file: null
    })

    return res.json({ message: msgs })
})

exports.savePayments = asyncHandler(async (req, res) => {
    const { member, alreadySent, messages, invoice, competition } = await securePayments(req, res)
    const { bank_customer, bank_number, payment_to } = req.body

    if (!alreadySent) {
        res.status(404)
        throw new Error('No invoice were found')
    }

    const bankAccount = await BankAccount.findOne({
        where: { id: payment_to }
    })

    if (!bankAccount) {
        res.status(404)
        return res.json({ messages: 'Payment to not found', payment_to: payment_to })
    }

    await invoice.update({
        bank_customer: bank_customer,
        bank_number: bank_number,
        paymentToId: payment_to
    })

    return res.json({ invoice, bankAccount })
})


exports.submitPayments = asyncHandler(async (req, res) => {
    const { member, alreadySent, messages, invoice, competition } = await securePayments(req, res)


    if (!alreadySent) {
        res.status(404)
        throw new Error('No invoice were found')
    }

    await invoice.update({
        status: 'PENDING'
    })

    return res.json(invoice)
})


exports.verifyPayments = asyncHandler(async (req, res) => {
    const { invoiceId } = req.params
    const { actions, messages } = req.body

    let verifyAction = {
        invoiceStatus: '',
        ParticipantStatus: '',
        isAllowedToJoin: false
    }

    if (actions === 'REJECT') {
        verifyAction.invoiceStatus = 'REJECTED'
        verifyAction.ParticipantStatus = 'ENROLLED'
        verifyAction.isAllowedToJoin = false
    }

    if (actions === 'APPROVE') {
        verifyAction.invoiceStatus = 'PAIDOFF'
        verifyAction.ParticipantStatus = 'ACTIVE'
        verifyAction.isAllowedToJoin = true
    }

    if (actions !== 'APPROVE' || actions !== 'REJECT') {
        res.status(422)
        return res.json({ message: 'Actions can only be either APPROVE or REJECT' })
    }

    const invoice = await Invoice.findOne({
        where: { id: invoiceId },
        include: [
            { model: Competition, as: 'competition' },
            { model: Member, as: 'member' },
            { model: BankAccount, as: 'paymentTo' },
        ]
    })

    if (!invoice) {
        res.status(404)
        throw new Error('Invoice not found')
    }

    const participant = await Participant.findOne({
        where: [{ memberId: invoice.member.id }, { competitionId: invoice.competition.id },]
    })

    if (!participant) {
        res.status(404)
        throw new Error('Participant not found')
    }

    await invoice.update({
        status: verifyAction.invoiceStatus,
    })

    await participant.update({
        status: verifyAction.ParticipantStatus,
        allowedToJoin: verifyAction.isAllowedToJoin
    })

    if (actions === 'REJECT') {
        await upsertMessage({
            competitionId: invoice.competition.id,
            memberId: invoice.id,
            about: 'INVOICE',
            type: 'DENIED',
            messages: messages
        })
    }

    if (actions === 'APPROVE') {
        await upsertMessage({
            competitionId: invoice.competition.id,
            memberId: invoice.member.id,
            about: 'INVOICE',
            type: 'ACCEPTED',
            messages: messages
        })
    }

    return res.json(invoice, participant)
})

exports.getInvoiceById = asyncHandler(async (req, res) => {
    const { invoiceId } = req.params

    const invoice = await Invoice.findOne({
        where: { id: invoiceId },
        include: [
            { model: Competition, as: 'competition' },
            { model: Member, as: 'member' },
            { model: BankAccount, as: 'paymentTo' },
        ]
    })

    if (!invoice) {
        res.status(404)
        throw new Error('Invoice not found')
    }

    return res.json(invoice)
})

exports.uploadPaymentProof = asyncHandler(async (req, res) => {
    const { member, alreadySent, messages, invoice, competition } = await securePayments(req, res)

    const upload = await fileUploadHandler({
        files: req.file,
        nameFormats: `[PAYMENTPROOF]_[${member.id}]_[${competition.id}]`,
        folders: `payments/${competition.category}/${competition.id}`,
        fileFormats: ['pdf', 'png', 'jpg', 'jpeg']
    })

    await invoice.update({
        proof_file: upload.filename
    })

    return res.status(200).json({ message: 'Upload proof success!' })
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
        const messages = await MemberNotification.findOne({
            where: { competitionId: competition.id, memberId: member.id }
        })
            .then(data => {
                if (!data) return

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

const upsertMessage = async ({ competitionId, memberId, about, type, messages }) => {
    return await MemberNotification.findOne({
        where: { competitionId: competitionId, memberId: memberId, about: about, type: type }
    })
        .then(async (data) => {
            if (data) return await data.update({
                message: messages
            })

            return await MemberNotification.create({
                competitionId: competitionId,
                memberId: memberId,
                about: about,
                type: type,
                message: messages
            })
        })
        .catch(err => { throw err })
}