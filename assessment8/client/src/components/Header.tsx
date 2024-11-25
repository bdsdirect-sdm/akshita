import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-black w-full p-4 md:p-6 flex justify-between items-center shadow-md'>
            <p className='text-white font-bold text-2xl'>ShopStore</p>
            <button 
                className="flex items-center bg-blue-600 text-white py-2 px-4 text-lg rounded-md hover:bg-blue-500 transition duration-300"
                onClick={() => navigate("/cart")}
            >
                <IoCartOutline className="text-xl mr-2" /> 
                Cart
            </button>
        </div>
    );
}

export default Header;
