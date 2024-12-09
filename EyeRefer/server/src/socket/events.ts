import Message from '../models/Message';
import Notification from '../models/Notification';

export const joinRoom = (socket: any) => (
    socket.on("join_room", (data: string) => {
        socket.join(data);
        console.log(`User ${socket.id} has joined room`, data);
    })
)

export const sendMessage = (socket: any,io:any) => (
    socket.on("sendMessage", async (data: any) => {
        console.log("Message received", data);
        const room = data.room;
        const author = data.author;
        const message = data.message;
        const time = data.time;
        const sender = data.sender;
        const receiver = data.receiver;
        // io.to(room).emit("message", data);
        const messages = await Message.create( {room, author, message, time,sender,receiver });
        if(messages) {}

        socket.to(room).emit("message",data)  //data sent to frontend

    })
)

export const joinNotification = (socket: any,io:any) => {
    socket.on("joinnotification", (data: any) => {
        console.log("joined notificatison", data?.id);
        console.log(`User ${socket.id} joined room: ${data?.id}`);
        socket.join(data?.id);
      });
}

export const sendNotification = (socket: any,io:any) => {
    socket.on("sendNotification", async (data: any) => {
        console.log("Received data from client:", data);
        console.log("xxxxxx", data.room);
        console.log(`User ${socket.id}`);
        io.to(data.room).emit("notification", { message: data.message });
        await Notification.create({
          message: data.message,
          // receiver_id: parseInt(data.room),
          room_id: data.room,
        });
    });
}
