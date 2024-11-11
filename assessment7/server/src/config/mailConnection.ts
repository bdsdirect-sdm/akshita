import nodemailer from "nodemailer"
import { local } from "./dotenv.config"

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: local.Node_email,
        pass: local.Email_key
    }
})

export const sendMail = (to:string, subject:string, html:any) => {
    transporter.sendMail({
        from: local.Node_email,
        to: to,
        subject: subject,
        html: html
    })
}
