const asyncHandler = require('express-async-handler')
const { BankAccount } = require("../../models")
const { Op } = require('../../models/db')

const { makePagination, paginationResults } = require('../../utils/paginate');



exports.createBankAccount = asyncHandler(async (req, res) => {
    const { name, bankName, cardNumber } = req.body

    let bankAccount = await BankAccount.create({
        bank_member_name: name,
        bank_name: bankName,
        card_number: cardNumber
    })
        .catch((err) => { throw err })

    return res.status(201).json(bankAccount)
})

exports.getBankAccounts = asyncHandler(async (req, res) => {
    const { where, page, size } = req.query

    const { limit, offset, currentPage } = makePagination(page, size)

    const getWhere = where ? {
        [Op.or]: [
            { bank_member_name: { [Op.like]: `%${where}%` } },
            { bank_name: { [Op.like]: `%${where}%` } },
            { card_number: { [Op.like]: `%${where}%` } },
        ]
    } : null

    let banks = await BankAccount.findAndCountAll({
        where: getWhere,
        limit: limit,
        offset: offset
    })
        .then(data => {
            const result = paginationResults({
                totalItem: data.count, limit: limit,
                rows: data.rows, currentPage: currentPage
            })

            return { size: limit, ...result }
        })
        .catch((err) => { throw err })

    return res.status(200).json(banks)
})

exports.getBankAccountById = asyncHandler(async (req, res) => {
    const { bankId } = req.params

    const banks = await BankAccount.findOne({
        where: { id: bankId }
    })
        .catch((err) => { throw err })

    if (!banks) throw new Error('Bank not found')

    return res.status(200).json(banks)
})

exports.updateBankAccount = asyncHandler(async (req, res) => {
    const { bankId } = req.params
    const { name, bankName, cardNumber } = req.body

    const banks = await BankAccount.findOne({
        where: { id: bankId }
    })
        .catch((err) => { throw err })

    if (!banks) throw new Error('Bank not found')

    await banks.update({
        bank_member_name: name ? name : banks.bank_member_name,
        bank_name: bankName ? bankName : banks.bank_name,
        card_number: cardNumber ? cardNumber : banks.card_number
    })

    return res.status(200).json(banks)
})

exports.deleteBankAccount = asyncHandler(async (req, res) => {
    const { bankId } = req.params
    const { name, bankName, cardNumber } = req.body

    const banks = await BankAccount.findOne({
        where: { id: bankId }
    })
        .catch((err) => { throw err })

    if (!banks) throw new Error('Bank not found')

    await banks.destroy()

    return res.status(200).json({ message: "Bank data successfully deleted" })
})

