// import { createUser, getProfile, updateUser, userLogin } from "../controllers/userController";
import { Router } from 'express';
import { checkout } from '../controllers/user';

const router = Router();

// router.post("/signup", createUser);
// router.get("/profile", getProfile);
// router.post("/login", userLogin);
// router.put("/update", updateUser);
router.post("/checkout", checkout)

export default router;