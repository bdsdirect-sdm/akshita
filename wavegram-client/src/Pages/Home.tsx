import React, { useEffect } from "react";
import { FormProps } from "../interfaces/interfaces";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const Home: React.FC<FormProps> = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
        navigate("/login");
    }
}, [token, navigate]);

  return (
    <>
      <div className="h-screen flex flex-row">
        <Sidebar />
        <div className="w-full h-screen flex flex-col">
          <div className="flex-shrink-0">
            <Header />
          </div>

          <div className="bg-[#f4f5fa] p-4 h-screen flex-grow overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
