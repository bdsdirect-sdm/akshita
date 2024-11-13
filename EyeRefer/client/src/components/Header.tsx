import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/title_logo.webp';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const [isDropdownOpen, setDropdownOpen] = useState(false); 

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <>
            <header className="p-4 bg-white shadow">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="#" className="flex items-center text-gray-800">
                        <img src={logo} alt="EyeRefer" className="h-10" />
                        <p className='font-bold text-xl'>EYE REFER</p>
                    </Link>

                    <div className="flex items-center space-x-4">
                        {token ? (
                            <>
                                <div className="relative">
                                    <button
                                        // className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
                                        onClick={toggleDropdown} 
                                    >
                                        <span className='text-xl'>Hi, {name}!</span>
                                        <p className='text-gray-500 text-sm font-light'>Welcome back</p>
                                    </button>
                                    {isDropdownOpen && ( 
                                        <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                            <li>
                                                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                                            </li>
                                            <li>
                                                <Link to="/update-password" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Change Password</Link>
                                            </li>
                                            <li>
                                                <a
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-800 border border-gray-300 py-2 px-4 rounded hover:bg-gray-100">Login</Link>
                                <Link to="/" className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Sign-up</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <br />
            <Outlet />
        </>
    );
}

export default Header;
