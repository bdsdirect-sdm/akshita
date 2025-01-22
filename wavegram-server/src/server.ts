import app from "./index"
import { dbconnect } from "./config/dbconnect";
import { createServer } from "http";
import { setSocket } from "./socket/socket";
const server = createServer(app);
import { Local } from "./config/env";

setSocket(server)

dbconnect();

const port = Local.PORT;

server.listen(port, ()=>{
    console.log("Server is running on port : ", port)
})