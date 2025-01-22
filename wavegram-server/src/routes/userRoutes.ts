import { Router } from "express";
import { addComment, changePassword, changePicture, createWave, getBasicDetails, getPersonalDetails, getPreferences, loginUser, signup, updateBasicDetails, updatePersonalDetails, updatePreferences } from "../controller/user.controller";
import { uploader } from "../middleware/multer.middlerware";

const userRoutes = Router()

userRoutes
    .post("/signup", signup)
    .post("/login", loginUser)
    .post("/create-wave", uploader.fields([{name: 'photos'}, {name: 'videos'}]), createWave)
    .post("/add-comment", addComment)

    .put("/change-password/:userId", changePassword)
    .put("/update-personal-details/:userId", updatePersonalDetails)
    .put("/update-basic-details/:userId", updateBasicDetails)
    .put("/change-picture/:userId", uploader.single('profilePhoto'), changePicture)
    .put("/update-preferences/:userId", updatePreferences)

    .get("/basic-details/:userId", getBasicDetails)
    .get("/personal-details/:userId", getPersonalDetails)
    .get("/preferences/:userId", getPreferences)
    
export default userRoutes