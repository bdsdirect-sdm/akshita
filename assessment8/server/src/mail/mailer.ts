import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "dipchip1702@gmail.com",
        pass: "ypoa txnr qtzn scyj"
    }
})

export const sendMail = (to:string, subject:string, totalCost: string) => {
    transporter.sendMail({
        from: "dipchip1702@gmail.com",
        to: to,
        subject: subject,
        html: `<h2>Your order has been confirmed! You paid: ${totalCost}</h2>`
    })
}