const multer = require("multer");
const path = require('path')
const crypto = require('crypto')
const fs = require('fs')
const asyncHandler = require('express-async-handler');
const { __BASEDIR } = require("../configs/config");

const mb = 10 * 1024 * 1024



const storage = multer.diskStorage({
    destination: path.join(__BASEDIR, 'public/uploads/tmp'),
    filename: (req, file, cb) => {
        cb(null, file.originalname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: mb
    }
}).single('file')

const uploadFile = asyncHandler(async (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(422).json({
                message: `Could not upload, ${err.message}`
            })
        }
        if (!req.file) {
            throw new Error('Please Upload a file!')
        }

        next()
    })
})

const isFormatValid = async (formats, filename) => {
    const formatAllowed = formats

    const ext = filename.substr(filename.lastIndexOf('.') + 1)
        .toLowerCase()

    if (formatAllowed.indexOf(ext) > -1) return ext

    return false
}

const saveFile = async (pathFrom, pathTo) => {
    try {
        if (!fs.existsSync(pathTo)) {
            const destination = path.dirname(pathTo)
            fs.mkdirSync(destination, { recursive: true })
        }

        fs.renameSync(pathFrom, pathTo)

        return destination
    } catch (error) {
        return console.log(error)
    }
}

const fileUploadHandler = async ({ files, nameFormats, folders, fileFormats }) => {
    const file = files
    const nameFormat = nameFormats ? nameFormats : file.originalname
    const folder = folders
    const formatsType = fileFormats

    if (!file) {
        throw new Error("File not detected")
    }

    if (!folder) {
        fs.unlinkSync(file.path)
        throw new Error("Please enter folder destination")
    }

    const formats = formatsType
    const ext = await isFormatValid(formats, file.originalname)

    if (!ext) {
        fs.unlinkSync(file.path)
        throw new Error("Extention not supported")
    }


    const fileName = `${nameFormat}.${ext}`
    const fileURL = `public/uploads/${folder}/`
    const pathFrom = file.path
    const pathTo = path.join(__BASEDIR, `${fileURL}${fileName}`)

    await saveFile(pathFrom, pathTo)
    if (!saveFile) {
        fs.unlinkSync(pathFrom)
        throw new Error("Filed to save file")
    }


    return {
        filename: fileName,
        uploadFrom: pathFrom,
        destination: pathTo
    }
}


module.exports = {
    uploadFile,
    fileUploadHandler
}