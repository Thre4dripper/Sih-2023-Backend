require('dotenv').config()
import * as nodemailer from 'nodemailer'
import { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import process from 'process'

class EmailService {
    private transporter: Transporter<SMTPTransport.SentMessageInfo>

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: Number(process.env.NODEMAILER_PORT),
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        })
    }

    async sendEmail(email: string, html: string) {
        const mailOptions = {
            from: process.env.NODEMAILER_USER_FROM,
            to: email,
            subject: '',
            html: html,
        }
        const info = await this.transporter.sendMail(mailOptions)
        const success = info.accepted.length > 0
        return { success }
    }
}

export default new EmailService()