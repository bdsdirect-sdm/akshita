import  { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import socket from "../utils/socket";
import { Local } from "../environment/env";
import api from "../api/axiosInstance";
import Button from "../components/Button"

const Chat = () => {
  const roomId = localStorage.getItem("room");
const doctor = JSON.parse(localStorage.getItem("doctor") as string);
  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<Array<any>>([]);
  
  const { patientName, user } = location.state || {};
  console.log("useruseruser",user);
  
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  // Redirect to login if token is missing
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchMessage = async () => {
    try {
      const response = await api.get(`${Local.GET_CHATDATA}/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessageList(response.data.chats || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessage();
    socket.emit("join_room",roomId)
  }, [roomId]); 

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const messageData = {
      room: roomId,
      author: name,
      message: message,
      sender: doctor.uuid,
      receiver: user?.referedto == doctor?.uuid ? user.referedby : doctor.uuid,
      time: new Date().toLocaleTimeString(),
    };

    try {
      socket.emit("sendMessage", messageData);

      console.log("messageDatamessageData",messageData)

      setMessageList((prevMessageList) => [
        ...prevMessageList,
        messageData,
      ]);

    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage(""); 
  };

  useEffect(() => {
    const messageListener = (data: any) => {
      setMessageList((prevMessageList) => [
        ...prevMessageList,
         data ,
      ]);
    };

    socket.on("message", messageListener);

    return () => {
      socket.off("message", messageListener); 
      localStorage.setItem("room","")
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex h-[100%]">
      <ChatBar />
      <div className="flex flex-col w-full p-8">
        <div className="p-2 rounded-t-md">
          <h2 className=" text-lg font-semibold">
            {patientName ? patientName : "Patient Name"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto mt-4 p-4 bg-gray-50 grow rounded-md border border-gray-300">
          <div className="space-y-4">
            {/* Rendering chat messages in ChatBody */}
            <ChatBody messageList={messageList} doctorId={doctor?.uuid} />
          </div>
        </div>

        <div className="flex items-center mt-4 border-t border-gray-300 pt-4">
          <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown} 
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Button
              onClick={sendMessage}
              type="button"
              className="px-4 py-2 rounded-r-md"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;