const multer = require("multer");
const mb = 10 * 1024 * 1024
const path = require('path')



const storage = multer.diskStorage({
    destination: path.join(__basedir, 'public/uploads/tmp'),
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

const uploadFile = async(req, res, next) => {
    upload(req, res, (err) => {
        if(err){
            return res.status(422).json({
                message: `Could not upload, ${err.message}`
            })
        }
        if(!req.file){
            return res.status(422).json({
                message: `Please upload a file`
            })
        }
        
        next()
    })
}


module.exports = {
    uploadFile,
}