const { Theme } = require("../models");
const { Op } = require("../models/db");
const jsonResponse = require("../utils/jsonResponse");
const { makePagination, paginateResult } = require("../utils/paginate");


// @desc    Get Theme
// @route   GET /themes
// @access  Public
exports.getAll = async(req, res) => {
    const name = req.query.name
    const size = req.query.size ? parseInt(req.query.size) : 10
    const page = req.query.page ? parseInt(req.query.page) : 1

    const paginate = makePagination(page, size)
    const condition = name ? { name: { [Op.like]: `%${name}%` } } : null

    await Theme.findAndCountAll({
        where: condition,
    })
    .then((data) => {
        if(data.count < 1) {
            return res.status(200).json(
                jsonResponse(true, "There is currently no data", []))    
        }

        const result = paginateResult(data,paginate.currentPage, paginate.limit)

        return res.status(200).json({
            size: paginate.limit,
            currentPage : result.currentPage,
            totalPage: result.totalPages,
            totalItem: result.totalItem, 
            themes: result.rows
        })
    })
    .catch((err) => {
        return res.status(500).json(
            jsonResponse(false, "Unable to get themes.", {message: err.message})
        )
    })
}


// @desc    Get Theme
// @route   GET /themes/:id
// @access  Public
exports.getOne = async(req, res) => {
    await Theme.findOne({
        where: {id: req.params.themeId}
    })
    .then((data) => {
        if(data === null) return res.status(404).json(
            jsonResponse(true, "Theme not found", null)
        )

        return res.status(201).json(
            jsonResponse(true, null, data)
        )
    })
    .catch((err) => {
        return res.status(500).json(
            jsonResponse(false, "Unable to get theme", {message: err.message})
        )
    })
}

// @desc    POST Theme
// @route   POST /theme
// @access  Private, Moderator only
exports.createTheme = async(req, res) => {
    const name = req.body.name

    if(!name) return res.status(422).json(
        jsonResponse(false, "Name cannot be empty!",null)
    )

    await Theme.create({
        name: name
    })
    .then((data) => {
        return res.status(201).json(
            jsonResponse(true, "Theme created successfully", data)
        )
    })
    .catch((err) => {
        return res.status(500).json(
            jsonResponse(false, "Unable to cread theme", {message: err.message})
        )
    })
}

// @desc    Edit Theme
// @route   PUT /theme
// @access  Private, Moderator only
exports.editTheme = async(req, res) => {
    if(!req.body.name) return res.status(422).json(
        jsonResponse(false, "Please enter a name!")
    )

    let theme = await Theme.findOne({
        where: {id: req.params.themeId}
    })
    .then(async(data) => {
        await data.update({
            name: req.body.name
        })
        return data
    })
    .catch((err) => {
        return res.status(500).json(
            jsonResponse(false, "Unable to cread theme", {message: err.message})
        )
    })

    return res.status(200).json(
        jsonResponse(true, "Theme successfully updated", theme)
    )
}

// @desc    Delete Theme
// @route   DELETE /theme
// @access  Private, Moderator only
exports.deleteTheme = async(req, res) => {
    return res.send("DELETE competition")
}
