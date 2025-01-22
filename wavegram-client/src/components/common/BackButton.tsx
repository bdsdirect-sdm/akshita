import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const BackButton = () => {
  //   const classname = `${className} bg-[#35c0e4] flex justify-center items-center text-white px-4 py-3 rounded text-xl font-bold hover:bg-[#3498db] flex flex-row`
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <IoIosArrowBack />
    </button>
  );
};

export default BackButton;
