import { Router } from "express";
import { registerUser, loginUser, verifyUser, getUser, getDocList, getPatientList, addPatient, addAddress, getReferredPatients, addAppointments } from "../controllers/userController";
import userAuthMiddleware from "../middlewares/userAuth";
import signupValidation from "../middlewares/formValidation.ts/signupValidation";
import loginValidation from "../middlewares/formValidation.ts/loginValidation";
import upload from "../middlewares/multer";

const  router = Router();

router.post("/register",signupValidation, registerUser);
router.post("/login",loginValidation, loginUser);
router.put("/verify", verifyUser);
router.get('/user', userAuthMiddleware, getUser);
router.get('/doc-list', userAuthMiddleware, getDocList);
router.get('/patient-list', userAuthMiddleware, getPatientList);
router.post('/add-patient', upload.single('medicaldocs'), userAuthMiddleware, addPatient);
router.post('/add-address', userAuthMiddleware, addAddress);
router.get("/get-referred-patients", userAuthMiddleware, getReferredPatients);
router.post("/add-appointment", userAuthMiddleware, addAppointments);

export default router;