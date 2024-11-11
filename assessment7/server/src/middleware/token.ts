import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret: string = "123"; 
export const JWT = async (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.split(" ")[1]; 

  if (!token) {
    console.log("NO token found")
    return res.sendStatus(403); 
  }

  try {
    const payload = await jwt.verify(token, secret);
    console.log("herer token",payload)
    req.user = payload
    next();
  } catch (err: any) {
        console.error("Token verification error:", err.message);
        return res.sendStatus(401); 
  }
};
