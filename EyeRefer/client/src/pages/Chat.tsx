import React, { useState } from 'react'
import socket from "../utils/socket"
import ChatBar from "../components/ChatBar"

const Chat = () => {

  const [message, setMessage] = useState("");  
  const [messageList, setMessageList] = useState<Array<any>>([]);
  const name = localStorage.getItem("name");
  const roomId = localStorage.getItem("room");

    const sendMessage = () => {
      console.log("Hellooo");
        if(message !== "") {
            const messageData = {
                room: roomId,
                author: name, 
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            
        // console.log("message data", name, " ", roomId, " ", messageData);
            socket.emit("sendMessage", messageData);  //send to backend
            // setMessageList((prevMessageList) => [...prevMessageList, message]);
            // console.log("MESSAGE", messageList);
        }
        setMessage("")
    }

    socket.on("message", (data) => {
      // console.log("Message receievd from server", data)
      setMessageList((prevMessageList) => [...prevMessageList, data.message]);
            console.log("MESSAGE", messageList);
    })


  return (
    <div className="flex h-screen">
      
      <ChatBar/>
      <div className="flex flex-col flex-1 p-4">
    
        <div className="bg-teal-700 p-4 rounded-t-md">
          <h2 className="text-white text-xl">Patient Name</h2>
        </div>

        <div className="flex-1 overflow-y-auto mt-4 p-4 bg-gray-50 rounded-md border border-gray-300">
          <div className="space-y-4">
            
            
          </div>
        </div>

        <div className="flex items-center mt-4 border-t border-gray-300 pt-4">
          <form className="flex w-full">
            <input
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(event) => {setMessage(event.target.value)}}
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={sendMessage}
              type="button"
              className="bg-teal-900 text-white px-4 py-2 rounded-r-md hover:bg-teal-700"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat