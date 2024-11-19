import React, { useState } from 'react'

const Chat = () => {

  const [message, setMessage] = useState("");  
  const [messageList, setMessageList] = useState<Array<any>>([]);
  const name = localStorage.getItem("name");

    const sendMessage = () => {
        if(message !== "") {
            const messageData = {
                room: roomId,
                author: name, 
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            socket.emit("sendMessage", messageData);
        }
        setMessage("")
    }

    const roomId = localStorage.getItem("room");

  return (
    <div className="flex h-screen">
      <div className="flex flex-col p-4 border-r-2 border-gray-300 w-1/4">
        <p className="text-lg font-semibold">Patient</p>
        <p className="mt-2">John Doe</p>
      </div>

      <div className="flex flex-col flex-1 p-4">
    
        <div className="bg-green-900 p-4 rounded-t-md">
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
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={sendMessage}
              type="submit"
              className="bg-green-900 text-white px-4 py-2 rounded-r-md hover:bg-green-700"
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