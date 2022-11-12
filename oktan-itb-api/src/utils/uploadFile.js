const path = require('path')
const crypto = require('crypto')
const fs = require('fs')


const randomFilename = (length) => {
    return crypto.randomBytes(length).toString('hex')
}

const isFormatValid = async(formats, filename) => {
    const formatAllowed = formats

    const ext = filename.substr(filename.lastIndexOf('.') + 1)
    .toLowerCase()

    if(formatAllowed.indexOf(ext) > -1) return ext

    return false
}

const saveFile = async(pathFrom, pathTo) => {
    try {
        if(!fs.existsSync(pathTo)){
            const destination = path.dirname(pathTo)
            fs.mkdirSync(destination, {recursive: true})
        }

        fs.renameSync(pathFrom, pathTo)

        return destination
    } catch (error) {
        return console.log(error)
    }
}

const fileUploadHandler = async(payload) => {
    const file = payload.file
    const nameFormat = payload.nameFormat ? payload.nameFormat : file.originalname
    const folder = payload.folder 
    const formatsType = payload.formats

    if(!folder){
        fs.unlinkSync(file.path)
        throw new Error("PLEASE ENTER A FOLDER")
    }

    if(!file){
        throw new Error("File not detected")
    }

    const formats = formatsType
    const ext = await isFormatValid(formats, file.originalname)

    if(!ext){
        fs.unlinkSync(file.path)
        throw new Error("Extention not supported")
    }

    // `${rand}.${ext}`
    const fileName = `${nameFormat}.${ext}`
    const fileURL = `public/uploads/${folder}/`
    const pathFrom = file.path
    const pathTo = path.join(__basedir, `${fileURL}${fileName}`)

    await saveFile(pathFrom, pathTo)
    if(!saveFile){ 
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
    randomFilename, 
    isFormatValid, 
    saveFile,
    fileUploadHandler
}