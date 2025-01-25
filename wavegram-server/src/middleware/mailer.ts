import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "dipchip1702@gmail.com",
    pass: "ypoa txnr qtzn scyj",
  },
});