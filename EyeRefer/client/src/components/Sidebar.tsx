import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { LiaUserInjuredSolid } from "react-icons/lia";
import { MdOutlineDateRange } from "react-icons/md";
import { PiStethoscope } from "react-icons/pi";
import { CiChat1 } from "react-icons/ci";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const doctype: any = localStorage.getItem("doctype");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="bg-white p-10 border-t-[1px] h-full"> 
            <div className=' flex-row justify-around text-base'>
            <ul className="flex flex-col space-y-2 text-left"> 
                {token && (
                    <>
                        <li className='flex justify-start hover:bg-teal-50 cursor-pointer'>
                        <NavLink 
                            to="/dashboard" 
                            className={({ isActive }) => 
                                isActive ? 'text-[#43D79E] flex flex-row px-4 py-3 hover:border-l-2 hover:border-[#43D79E]' : 
                                'flex flex-row px-4 py-3 hover:text-[#43D79E] hover:border-l-2 hover:border-[#43D79E]'
                            }
                            >
                            <GoHome className='text-2xl' />
                            <span className="nav-link rounded px-2">Dashboard</span>
                        </NavLink>

                            
                        </li>
                        {doctype == 2 ? (
                            <li className='flex justify-start hover:bg-teal-50  cursor-pointer '>
                                <NavLink to="/patient-od" className={({ isActive }) => 
                                isActive ? 'text-[#43D79E] flex flex-row px-4 py-3 hover:border-l-2 hover:border-[#43D79E]' : 
                                'flex flex-row px-4 py-3 hover:text-[#43D79E] hover:border-l-2 hover:border-[#43D79E]'
                            }
                            >
                                    <LiaUserInjuredSolid className='text-xl'/>
                                    <span className="nav-link rounded px-2 ">Patients</span>
                                </NavLink>
                                
                            </li>
                            // <li className='flex justify-start hover:bg-teal-50 px-4 py-3 rounded hover:text-teal-400 hover:border-l-teal-700 cursor-pointer'>
                            //     <LiaUserInjuredSolid className='text-2xl'/>
                            //     <NavLink to="/patient-od" className="nav-link rounded  text-[#232A2E] border-l-4">Patients</NavLink>
                            // </li>
                        ) : 
                        (
                            <li className='flex justify-start hover:bg-teal-50    cursor-pointer '>
                            <NavLink to="/patient-md" className={({ isActive }) => 
                                isActive ? 'text-[#43D79E] flex flex-row px-4 py-3 hover:border-l-2 hover:border-[#43D79E]' : 
                                'flex flex-row px-4 py-3 hover:text-[#43D79E] hover:border-l-2 hover:border-[#43D79E]'
                            }>
                                <LiaUserInjuredSolid className='text-2xl'/>
                                <span className="nav-link rounded px-2 ">Patients</span>
                            </NavLink>
                            
                        </li>
                        )
                        }
                        
                        {doctype == 1 && (
                            <li className='flex justify-start hover:bg-teal-50  cursor-pointer '>
                                <NavLink to="/view-appointments" className={({ isActive }) => 
                                isActive ? 'text-[#43D79E] flex flex-row px-4 py-3 hover:border-l-2 hover:border-[#43D79E]' : 
                                'flex flex-row px-4 py-3 hover:text-[#43D79E] hover:border-l-2 hover:border-[#43D79E]'
                            }>
                                    <MdOutlineDateRange className='text-xl'/>
                                    <span className="nav-link rounded px-2 ">Appointments</span>
                                </NavLink>
                                
                            </li>
                        )}

                            <li className='flex justify-start hover:bg-teal-50  cursor-pointer '>
                                <NavLink to="/doctor" className={({ isActive }) => 
                                isActive ? 'text-[#43D79E] flex flex-row px-4 py-3 hover:border-l-2 hover:border-[#43D79E]' : 
                                'flex flex-row px-4 py-3 hover:text-[#43D79E] hover:border-l-2 hover:border-[#43D79E]'
                            }>
                                    <PiStethoscope className='text-xl'/>
                                    <span className="nav-link rounded px-2 ">Doctors</span>
                                </NavLink>
                                
                            </li>

                            <li className='flex justify-start hover:bg-teal-50  cursor-pointer '>
                                <NavLink to="/chat" className={({ isActive }) => 
                                isActive ? 'text-[#43D79E] flex flex-row px-4 py-3 hover:border-l-2 hover:border-[#43D79E]' : 
                                'flex flex-row px-4 py-3 hover:text-[#43D79E] hover:border-l-2 hover:border-[#43D79E]'
                            }>
                                    <CiChat1 className='text-xl'/>
                                    <span className="nav-link rounded px-2 ">Chat</span>
                                </NavLink>
                                
                            </li>
                        {/* <li className='flex justify-start hover:bg-teal-50 p-4 rounded hover:text-teal-400 cursor-pointer'>
                            <img src={staff}/>
                            <NavLink to="/staff" className="nav-link rounded px-2 hover:text-teal-400 text-[#232A2E] border-l-4">Staff</NavLink>
                        </li> */}
                        {doctype == 2 && (
                            <>

                            <li className='flex justify-start hover:bg-teal-50  cursor-pointer '>
                                <NavLink to="/add-patient" className={({ isActive }) => 
                                isActive ? 'text-[#43D79E] flex flex-row px-4 py-3 hover:border-l-2 hover:border-[#43D79E]' : 
                                'flex flex-row px-4 py-3 hover:text-[#43D79E] hover:border-l-2 hover:border-[#43D79E]'
                            }>
                                    <LiaUserInjuredSolid className='text-xl'/>
                                    <span className="nav-link rounded px-2 ">Add Referral Patient</span>
                                </NavLink>
                            </li>
                            </>
                            
                            
                        )}

                            <li className='flex justify-start hover:bg-teal-50  cursor-pointer '>
                                <NavLink to="/staff-list" className={({ isActive }) => 
                                isActive ? 'text-[#43D79E] flex flex-row px-4 py-3 hover:border-l-2 hover:border-[#43D79E]' : 
                                'flex flex-row px-4 py-3 hover:text-[#43D79E] hover:border-l-2 hover:border-[#43D79E]'
                            }>
                                    <CiChat1 className='text-xl'/>
                                    <span className="nav-link rounded px-2 ">Staff</span>
                                </NavLink>
                            </li>
                    </>
                )}
            </ul>
            {/* <button className='px-3 py-2' onClick={handleLogout}>Logout</button> */}
            </div>

        </nav> 
    );
}

export default Navbar;