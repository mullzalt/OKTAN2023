const nodeMailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const { BASE_URL, EMAIL } = require('../../configs/config')


const emailSender = async({
    type, name, username, link, email, subject
}) => {

    const templateFile = type === 'VERIFICATION' ? 'verification.html' : type === 'PASS_RESET' ? 'forgotEmail.html' : null

    const filePath = path.join(__basedir, `/src/utils/templates/${templateFile}`)
    const source = fs.readFileSync(filePath, 'utf-8')
    const template = handlebars.compile(source)

    const replacement = {
        name: name, 
        username: username, 
        link: link,
    }

    const htmlToSend = template(replacement)

    try {
        const transporter = nodeMailer.createTransport({
            host: EMAIL.HOST,
            service: EMAIL.SERVICE, 
            port: EMAIL.PORT,
            secure: true,
            requireTLS: true,
            auth: {
                user: EMAIL.USER,
                pass: EMAIL.PASS
            }, 
            from: `OKTAN ITB 2023 <${EMAIL.USER}>`
        })

        return await transporter.sendMail({
            from: `OKTAN ITB 2023 <${EMAIL.USER}>`,
            to: email, 
            subject: subject, 
            attachments: [{
                filename: 'logo.png',
                path: path.join(__basedir, `/public/img/logo.png`),
                cid: 'logo'
            }],
            html: htmlToSend,
        })
    } catch (error) {
		throw new Error(error.message)
    }
}

module.exports = emailSender