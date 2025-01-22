import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import icon from "../assets/icon.png";

const Sidebar = () => {
  const token = sessionStorage.getItem("token");

  const menuItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/profile", label: "My Profile" },
    { to: "/preferences", label: "Preferences" },
    { to: "/friends", label: "Friends" },
    { to: "/create-waves", label: "Create Waves" },
    { to: "/change-password", label: "Change Password" },
  ];

  return (
    <nav className="bg-[#3E5677] border-t-[1px] h-full w-80 py-4">
      <Link to="/dashboard" className="flex items-center justify-center p-2">
        <img src={logo} alt="WaveGram" className="h-16 mt-4" />
      </Link>
      <div className="flex-row justify-center text-base">
        <ul className="flex flex-col space-y-2 text-left p-2 mx-6">
          {token &&
            menuItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-start hover:bg-[#BEA16E] rounded-md cursor-pointer"
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "flex flex-row px-4 py-3 bg-[#BEA16E] rounded-md w-full"
                      : "flex flex-row px-4 py-3 hover:border-[#BEA16E] w-full"
                  }
                >
                  <span className="nav-link rounded px-2 text-white flex flex-row text-sm">
                    <img src={icon} alt={item.label} className="mr-2" />
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
