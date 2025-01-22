import passport from "passport"
import {Strategy as BearerStrategy} from "passport-http-bearer"
import jwt, {JwtPayload} from "jsonwebtoken"
import {AppError} from "../utils"
import { constantValues } from "../constants";


const verifyToken = async (token: string): Promise<any> => {
    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.SECREAT_KEY as string) as JwtPayload;
      // You can also validate the decoded payload or fetch the user from DB
      return { id: decoded.id, username: decoded.name, email:decoded.email, doctorType:decoded.userType };
    } catch (err:any) {
      if(err.name === "TokenExpiredError" ){
        throw new AppError(constantValues.msg.expiredToken, constantValues.msgCode.badRequest)
      }
      else{
        throw new AppError(constantValues.msg.invalidToken, constantValues.msgCode.badRequest)
      }
    }
  };

passport.use(
   new BearerStrategy(async (token, done) => {
        try{ 
            const user = await verifyToken(token);                                                                                               
            if(!user){
                return  done(null, false);
            }
            return done(null,user)
        }
        catch(err){
            return done(err)
        }
    })
)

export default passport;