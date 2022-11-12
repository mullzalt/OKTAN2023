const nodeMailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const { BASE_URL, EMAIL } = require('../../configs/config')

const sendEmail = async({...payload}) => {
    const filePath = path.join(__basedir, '/src/utils/templates/verification.html')
    const source = fs.readFileSync(filePath, 'utf-8')
    const logoURL = `${BASE_URL}/public/img/logo.png`
    const template = handlebars.compile(source)

    const replacement = {
        name: payload.name, 
        username: payload.username, 
        link: payload.link,
        logo: logoURL,
        BASE_URL: BASE_URL
    }

    const htmlToSend = template(replacement)

    try {
        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail", 
            port: 587,
            secure: true,
            auth: {
                user: EMAIL.USER,
                pass: EMAIL.PASS
            }
        })

        await transporter.sendMail({
            from: `OKTAN ITB 2023 <${EMAIL.USER}>`,
            to: payload.email, 
            subject: payload.subject, 
            html: htmlToSend,
        })

        console.log({...payload})
        
    } catch (error) {
        console.log("email not sent!");
		throw new Error(error)
    }
}

module.exports = sendEmail