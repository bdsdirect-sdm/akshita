import {Server} from 'socket.io'

export function setSocket(server:any) {
    const io = new Server(server ,{
        cors: {
            origin: "*",
            }
    })
    
    io.on("connection", (socket) => {
        console.log("Connection established!", socket.id);
    
        socket.on("joinRoom", (data: string) => {
            socket.join(data);
            console.log(`User ${socket.id} has joined room`, data);
            
            io.to(data).emit("message",{message:`New User Just joined the  room ${data}`, socketId:socket.id})
        })

        // socket.on("sendMessage", (messageData))
    })
}