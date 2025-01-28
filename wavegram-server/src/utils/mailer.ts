import nodemailer from 'nodemailer';
import { Local } from '../env';
import loginTemplate from './mailTemplate/loginTemplate';
import signupTemplate from './mailTemplate/signupTemplate';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: false,  // Transport layer security (TLS)
    auth: {
        user: Local.MAIL_USER,
        pass: Local.MAIL_PASS
    }
});

export function sendLoginEmail(token: string, email: string, fullName: string, message: string, senderName: string) {
    var template = loginTemplate(token, fullName, message, senderName);
    const mailOptions = {
        from: Local.MAIL_USER,
        to: email,
        subject: "Connect with your Friend!",
        html: template
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Error: ", error);
        }
        console.log('Email sent: ' + info.response);
        return info.response;
    });
}

export function sendSignupEmail(token: string, email: string, fullName: string, message: string, senderName: string) {
    var template = signupTemplate(token, fullName, message, senderName);
    const mailOptions = {
        from: Local.MAIL_USER,
        to: email,
        subject: "Join WaveGram and Add Friend",
        html: template
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Error: ", error);
        }
        console.log('Email sent: ' + info.response);
        return info.response;
    });
}

