import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import home from "../Assets/home.png"
import user_img from "../Assets/personal_injury.png"
import doctor from "../Assets/stethoscope.svg"
import appointments from "../Assets/date_range.svg"
import chat from "../Assets/mark_chat_read.svg"

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const doctype: any = localStorage.getItem("doctype");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="bg-white w-1/5 p-4 border-r-2"> 
            <div className='p-8 flex-row justify-around'>
            <ul className="flex flex-col space-y-4 text-left"> 
                {token && (
                    <>
                        <li className='flex justify-start hover:bg-teal-50 p-2 rounded'>
                            <img src={home} className='h-6 hover:teal-400'/>
                            <Link to="/dashboard" className="nav-link rounded px-2 hover:text-teal-400 text-[#232A2E] border-l-4">Dashboard</Link>
                        </li>
                        {doctype == 2 ? (
                            <li className='flex justify-start hover:bg-teal-50 p-2 rounded'>
                                <img src={user_img}/>
                                <Link to="/patient-od" className="nav-link rounded px-2 hover:text-teal-400 text-[#232A2E] border-l-4">Patients</Link>
                            </li>
                        ) : 
                        (
                            <li className='flex justify-start hover:bg-teal-50 p-2 rounded'>
                                <img src={user_img}/>
                                <Link to="/patient-md" className="nav-link rounded px-2 hover:text-teal-400 text-[#232A2E] border-l-4">Patients</Link>
                            </li>
                        )
                        }
                        
                        {doctype == 1 && (
                            <li className='flex justify-start hover:bg-teal-50 p-2 rounded'>
                                <img src={appointments}/>
                                <Link to="/view-appointments" className="nav-link rounded px-2 hover:text-teal-400 text-[#232A2E] border-l-4">Appointments</Link>
                            </li>
                        )}
                        <li className='flex justify-start hover:bg-teal-50 p-2 rounded'>
                            <img src={doctor}/>
                            <Link to="/doctor" className="nav-link rounded px-2 hover:text-teal-400 text-[#232A2E] border-l-4">Doctors</Link>
                        </li>
                        <li className='flex justify-start hover:bg-teal-50 p-2 rounded'>
                            <img src={chat}/>
                            <Link to="/chat" className="nav-link rounded px-2 hover:text-teal-400 text-[#232A2E] border-l-4">Chat</Link>
                        </li>
                        {/* <li className='flex justify-start hover:bg-teal-50 p-2 rounded'>
                            <img src={staff}/>
                            <Link to="/staff" className="nav-link rounded px-2 hover:text-teal-400 text-[#232A2E] border-l-4">Staff</Link>
                        </li> */}
                        {doctype == 2 && (
                            <li className='flex justify-start hover:bg-teal-50 p-2 rounded'>
                                <Link to="/add-patient" className="nav-link rounded px-2 hover:text-teal-400 text-[#232A2E] border-l-4">Add Referral Patient</Link>
                            </li>
                        )}
                    </>
                )}
            </ul>
            {/* <button className='px-3 py-2' onClick={handleLogout}>Logout</button> */}
            </div>

        </nav>
    );
}

export default Navbar;