import express from 'express';
import cors from 'cors';
import { Local } from './environment/env';
import sequelize from './config/db';
import userRouter from './routers/userRouter';
import {createServer} from 'http';
import setSocket from './socket/socket';
import Staff from './models/Staff';
import Message from './models/Message';

const app = express();

export const httpServer = createServer(app);
setSocket(httpServer);

app.use(cors());
app.use(express.json());
app.use("/", userRouter);
Message.sync({alter: true}).then(()=>{
    httpServer.listen(Local.SERVER_PORT,  () => {
        console.log(`Server is running on port ${Local.SERVER_PORT}`);
        });
}).catch((err)=>{
    console.log("Error: ", err);
})