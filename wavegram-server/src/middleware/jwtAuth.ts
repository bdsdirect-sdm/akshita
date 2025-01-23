import passport from "passport";
import { Request, Response, NextFunction } from "express";
import {catchAsyncError} from "./index"
import {AppError, makeResponse} from "../utils" 
import { constantValues } from "../constants";


/**** PASSPORT ****/
// const jwtAuthMiddelware = (allowedRoles:Array<string>) => catchAsyncError( async (req:Request, res:Response, next:NextFunction) => {
//     passport.authenticate("bearer",{session:false}, (err:any, user:any, info:any) =>{
//         if(err) {
//             return makeResponse(res, constantValues.msgCode.failureCode,
//                 constantValues.msgType.failedStatus,constantValues.msg.invalidCredentials)
//         }
//         if (['DELETED', 'BLOCKED'].includes(user?.info?.status)) {
//             return makeResponse(res, constantValues.msgCode.unAuthorizedUser, constantValues.msgType.failedStatus,
//               constantValues.msg.unAuthorizedUser);
//         }
//         if(allowedRoles.includes(user?.info?.userType)){
//             req.user = user;
//             next();
//         }
//         else{
//             throw new AppError(constantValues.msg.invalidCredentials,constantValues.msgCode.badRequest)
//         }
//     })
// }) 

// const jwtSuperAdmin = catchAsyncError( async (req:Request, res:Response, next:NextFunction    ) => {
//     passport.authenticate("bearer",{session:false}, (err:any, user:any, info:any) =>{
//         if(err) {
//             return next(err)
//         }
//         if(!user) { 
//             return res.status(401).json({error:"Unauthorized"})
//         }
//         if(user.userType === "superAdmin"){
//             req.user = user;
//             next();
//         }
//         else{
//             throw new AppError(constantValues.msg.invalidCredentials,constantValues.msgCode.badRequest)
//         }

//     }) 
// })  

// const jwtUser = catchAsyncError( async (req:Request, res:Response, next:NextFunction    ) => {
//     passport.authenticate("bearer",{session:false}, (err:any, user:any, info:any) =>{
//         if(err) {
//             return next(err)
//         }
//         if(!user) { 
//             return res.status(401).json({error:"Unauthorized"})
//         }
//         if(user.userType === "user"){
//             req.user = user;
//             next();
//         }
//         else{
//             throw new AppError(constantValues.msg.invalidCredentials,constantValues.msgCode.badRequest)
//         }

//     }) 
// }) 

import jwt from 'jsonwebtoken';
import { Local } from '../env';

const Secret:any = Local.SECRET_KEY;

const userAuthMiddleware = async(req:any, res:any, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token){
        res.status(403);
    }

    jwt.verify(token, Secret, (err: any, id: any)=>{
        if(err){
            res.status(401).json({"message": err});
        }
        req.user = id;
        next();
    });
};

export default userAuthMiddleware;