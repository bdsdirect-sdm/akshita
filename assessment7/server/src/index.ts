import express, { Express, Request, Response } from 'express';
import serverInitialize from './models';
import userRoutes from "./routes/user.routes"
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";
import cors from "cors";
import path from 'path';
import productRouter from './routes/product.router';

const app: Express  = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

serverInitialize()

app.use("/", userRoutes);
app.use("/", productRouter)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

