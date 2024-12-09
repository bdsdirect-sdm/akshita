import {Server} from 'socket.io'
import { joinNotification, joinRoom, sendMessage, sendNotification } from './events';

function setSocket(server:any) {
    var io = new Server(server ,{
        cors: {
            origin: "*",
            }
    })
    
    io.on("connection", (socket) => {
        console.log("Connection established!", socket.id);
        joinRoom(socket);
        sendMessage(socket,io);
        joinNotification(socket,io);
        sendNotification(socket,io)
    })

}

export default setSocket;