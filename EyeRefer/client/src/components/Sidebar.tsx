import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const doctype: any = localStorage.getItem("doctype");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className=" bg-white w-1/6 p-4 border-r-2"> 
            <ul className="flex flex-col space-y-2"> 
                {token && (
                    <>
                        <li>
                            <Link to="/dashboard" className="nav-link hover:text-teal-400 rounded px-3 py-2">Dashboard</Link>
                        </li>
                        {doctype == 2 ? (
                            <li>
                                <Link to="/patient-od" className="nav-link hover:text-teal-400 rounded px-3 py-2">Patients</Link>
                            </li>
                        ) : 
                        (
                            <li>
                                <Link to="/patient-md" className="nav-link hover:text-teal-400 rounded px-3 py-2">Patients</Link>
                            </li>
                        )
                        }
                        
                        {doctype == 1 && (
                            <li>
                                <Link to="/view-appointments" className="nav-link hover:text-teal-400 rounded px-3 py-2">Appointments</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/doctor" className="nav-link hover:text-teal-400 rounded px-3 py-2">Doctors</Link>
                        </li>
                        <li>
                            <Link to="/chat" className="nav-link hover:text-teal-400 rounded px-3 py-2">Chat</Link>
                        </li>
                        <li>
                            <Link to="/staff" className="nav-link hover:text-teal-400 rounded px-3 py-2">Staff</Link>
                        </li>
                        {doctype == 2 && (
                            <li>
                                <Link to="/add-patient" className="nav-link hover:text-teal-400 rounded px-3 py-2">Add Referral Patient</Link>
                            </li>
                        )}
                    </>
                )}
            </ul>

            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;