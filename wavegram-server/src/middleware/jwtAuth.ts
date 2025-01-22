import passport from "passport";
import { Request, Response, NextFunction } from "express";
import {catchAsyncError} from "./index"
import {AppError, makeResponse} from "../utils" 
import { constantValues } from "../constants";

const jwtAuthMiddelware = (allowedRoles:Array<string>) => catchAsyncError( async (req:Request, res:Response, next:NextFunction) => {
    passport.authenticate("bearer",{session:false}, (err:any, user:any, info:any) =>{
        if(err) {
            return makeResponse(res, constantValues.msgCode.failureCode,
                constantValues.msgType.failedStatus,constantValues.msg.invalidCredentials)
        }
        if (['DELETED', 'BLOCKED'].includes(user?.info?.status)) {
            return makeResponse(res, constantValues.msgCode.unAuthorizedUser, constantValues.msgType.failedStatus,
              constantValues.msg.unAuthorizedUser);
        }
        if(allowedRoles.includes(user?.info?.userType)){
            req.user = user;
            next();
        }
        else{
            throw new AppError(constantValues.msg.invalidCredentials,constantValues.msgCode.badRequest)
        }
    })
}) 

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


export default {
    jwtAuthMiddelware
}