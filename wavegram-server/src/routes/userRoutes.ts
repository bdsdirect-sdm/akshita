import { Router } from "express";
import { addComment, changePassword, changePicture, createWave, getBasicDetails, getPersonalDetails, getPreferences, loginUser, signup, updateBasicDetails, updatePersonalDetails, updatePreferences } from "../controller/user.controller";

const userRoutes = Router()

userRoutes
    .post("/signup", signup)
    .post("/login", loginUser)
    .post("/create-wave", createWave)  //req.files undefined cuz of multer?
    .post("/add-comment", addComment)

    .put("/change-password/:userId", changePassword)
    .put("/update-personal-details", updatePersonalDetails)
    .put("/update-basic-details", updateBasicDetails)
    .put("/change-picture", changePicture)
    .put("/update-preferences", updatePreferences)

    .get("/basic-details", getBasicDetails)
    .get("/personal-details", getPersonalDetails)
    .get("/preferences", getPreferences)
    
export default userRoutes