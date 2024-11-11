import { Router } from 'express';
import { createUser, login } from '../controllers/user.controller';
import upload from '../middleware/multer.middleware';

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", upload.fields([
    {name: "image", maxCount: 1}, 
    {name: "logo", maxCount: 1}
]),  createUser);

export default userRouter;