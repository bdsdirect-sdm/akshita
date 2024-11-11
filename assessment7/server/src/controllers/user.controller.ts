import Product from "../models/product.model"
import User from "../models/user.model"
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../config/mailConnection";
import { welcomeEmail } from "../utils/welcomeEmail";
import { local } from "../config/dotenv.config";

const jwt_key = local.Secret_key;

export interface userInterface {
    id: number;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    company: string; 
    address: string;
    password: string; 
    image: string;
    logo: string;
  }

export const login = async (req: any, res: any) => {
    try {
        // console.log("BODYY::::", req.body)
        const { email, password } = req.body;
    
        const user = await User.findOne({ where: { email } });
        if (!user) {
          res.status(401).json({ message: "Invalid email id" });
          return;
        }

        // console.log("USER:::", user)
        
        const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);
        if (!isPasswordValid) {
          res.status(401).json({ message: "wrong password" });
          return;
        }
    
        const token = jwt.sign(
          {
            id: user.dataValues.id,
            fname: user.dataValues.fname,
            lname: user.dataValues.lname,
            email: user.dataValues.email,
            company: user.dataValues.brand,
            phone: user.dataValues.phone,
            address: user.dataValues.address,
          },
          jwt_key
        );
        // console.log("TOKENNNNN", token)
    
        res.status(200).json({
          user,
          token,
        });
      } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

export const createUser = async (req: any, res: any) => {
    try {
        const {
            id,
            fname,
            lname,
            company,
            email,
            phone,
            address
        } = req.body;

        const filesData: any = req.files;
    
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: "Email already exists" });
        }
    
        const generateRandomPassword = (length: number): string => {
          return Math.random().toString(36).slice(-length);
        };
    
        const randomPass = generateRandomPassword(6);
    
        const hashedPassword = await bcrypt.hash(randomPass, 10);
    
        let userDetails: userInterface = { 
            id,
            fname,
            lname,
            company,
            email,
            phone,
            address,
            password: hashedPassword,
            image: filesData.image[0].path,
            logo: filesData.logo[0].path
      }
    
      const user = await User.create(userDetails as any);
        
        await sendMail(
          email,
          "Welcome Message",
          welcomeEmail(randomPass, fname + " " + lname)
        )
    
        return res.status(201).json({ user });
    
      } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user" });
      }
}