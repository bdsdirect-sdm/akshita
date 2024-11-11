import dotenv from 'dotenv';
dotenv.config({path: '.env'});

interface Config{
    Port:number,
    DB_Name: string,
    DB_User: string,
    DB_Password: string,
    Node_email: string,
    Email_key: string,
    Secret_key: string,
}

export const local:Config = {
    Port: Number(process.env.PORT),
    DB_Name: String(process.env.DB_NAME),
    DB_User: String(process.env.DB_USER),
    DB_Password: String(process.env.DB_PASSWORD),
    Node_email: String(process.env.NODE_EMAIL),
    Email_key: String(process.env.EMAIL_KEY),
    Secret_key: String(process.env.SECRET_KEY)
}