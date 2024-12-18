import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.svg';
import dropDown from "../Assets/chevron-down.png";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const profile_photo = localStorage.getItem("profile_photo")
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // Close dropdown if click is outside the dropdown
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    // Close dropdown when a link is clicked
    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const pf = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;
  
    console.log("PROFILEEEKE", pf)

    return (
        <>
            <div className="sticky-top-0 p-3 bg-white shadow">
                <div className="mx-7 flex justify-between items-center py-2">
                    <Link to="/dashboard" className="flex items-center text-gray-800">
                        <img src={logo} alt="EyeRefer" className="h-15" />
                    </Link>

                    <div className="flex items-center space-x-4">
                        {token ? (
                            <>
                                <div className="relative" ref={dropdownRef}>
                                    <button onClick={toggleDropdown}>
                                        <div className='flex justify-evenly'>
                                            <img src={profile_photo ? profile_photo : pf} alt='' className='w-12 h-12 rounded-full' />
                                            <div>
                                                <span className='text-2xl font-bold'>Hi, {name}</span>
                                                <p className='text-gray-500 font-bold font-xl'>Welcome back</p>
                                            </div>
                                            <img src={dropDown} className='h-8 p-2'/>
                                        </div>
                                    </button>
                                    {isDropdownOpen && (
                                        <ul className="absolute right-0 mt-4 w-64 bg-white rounded-md shadow-lg z-10">
                                            <li>
                                                <Link
                                                    to="/profile"
                                                    className="block px-6 py-3 text-gray-800 hover:bg-gray-100"
                                                    onClick={() => { closeDropdown(); }}
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/update-password"
                                                    className="block px-6 py-3 text-gray-800 hover:bg-gray-100"
                                                    onClick={() => { closeDropdown(); }}
                                                >
                                                    Change Password
                                                </Link>
                                            </li>
                                            <li>
                                                <a
                                                    className="block px-6 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => { handleLogout(); closeDropdown(); }}
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
            </div>
        </>
    );
}

export default Header;
