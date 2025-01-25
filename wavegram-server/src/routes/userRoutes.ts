import { Router } from "express";
import { addComment, changePassword, changePicture, createWave, getBasicDetails, getPersonalDetails, getPreferences, getWave, getWaves, inviteFriend, loginUser, signup, updateBasicDetails, updatePersonalDetails, updatePreferences } from "../controller/user.controller";
import { uploader } from "../middleware/multer.middlerware";
import userAuthMiddleware from "../middleware/jwtAuth";

const userRoutes = Router()

userRoutes
    .post("/signup", signup)
    .post("/login", loginUser)
    .post("/create-wave", userAuthMiddleware, uploader.fields([{name: 'photos'}, {name: 'videos'}]), createWave)  //done
    .post("/add-comment", addComment)
    .post("/invite", userAuthMiddleware, inviteFriend)

    .put("/change-password", userAuthMiddleware, changePassword) //done
    .put("/update-personal-details", userAuthMiddleware, updatePersonalDetails) //done
    .put("/update-basic-details", userAuthMiddleware, updateBasicDetails) //(done)
    .put("/change-picture", userAuthMiddleware, uploader.single('profilePhoto'), changePicture)
    .put("/update-preferences", userAuthMiddleware, updatePreferences)

    .get("/basic-details", userAuthMiddleware, getBasicDetails) //done
    .get("/personal-details", userAuthMiddleware, getPersonalDetails) //done
    .get("/preferences", userAuthMiddleware, getPreferences)
    .get("/waves/", userAuthMiddleware, getWaves)  //done
    .get("/wave/:id", userAuthMiddleware, getWave)
    
export default userRoutes