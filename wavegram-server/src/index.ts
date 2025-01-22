import dotenv from "dotenv";
dotenv.config({path:`src/config/.env.${process.env.NODE_ENV}`});

import passport from "./config/passportConfig"
import express , { Request, Response} from "express";
import cors from "cors"
import { ErrorMiddleware } from "./middleware";
import allRoutes from "./routes";
import sequelize from "./config/dbconnect";

const app = express();

app.use(cors({
    origin:"*",
}))
app.use(express.json());
app.use(passport.initialize())
app.use("/", allRoutes)

app.get("/", (req : Request, res:any) => res.json({ success: true, message: "Server is Running"}));

app.use(ErrorMiddleware)
export default app;