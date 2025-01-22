import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const name = localStorage.getItem("name");
  const profile_photo = localStorage.getItem("profile_photo");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  console.log(token);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
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
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  // Close dropdown when a link is clicked
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const pf = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

  // console.log("PROFILEEEKE", pf);

  return (
    <>
      <div className="sticky-top-0 p-3 bg-white shadow-md">
        <div className="mx-7 flex justify-end items-center py-2">
          <div className="flex items-center space-x-4">
              <>
                <div className="relative" ref={dropdownRef}>
                  <button onClick={toggleDropdown}>
                    <div className="flex justify-evenly">
                      <img
                        src={profile_photo ? profile_photo : pf}
                        alt="pfp"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="px-4">
                        <span className="text-lg font-bold">Good Day</span>
                        <p className="text-gray-500 font-bold text-sm">
                          {name}
                        </p>
                      </div>
                      {/* <img src={dropDown} className="h-8 p-2" /> */}
                    </div>
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute right-0 mt-4 w-64 bg-white rounded-md shadow-lg z-10">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-6 py-3 text-gray-800 hover:bg-gray-100"
                          onClick={() => {
                            closeDropdown();
                          }}
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/preferences"
                          className="block px-6 py-3 text-gray-500 hover:bg-gray-100"
                          onClick={() => {
                            closeDropdown();
                          }}
                        >
                          Preferences
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/friends"
                          className="block px-6 py-3 text-gray-500 hover:bg-gray-100"
                          onClick={() => {
                            closeDropdown();
                          }}
                        >
                          Friends
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/create-waves"
                          className="block px-6 py-3 text-gray-500 hover:bg-gray-100"
                          onClick={() => {
                            closeDropdown();
                          }}
                        >
                          Create Waves
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/change-password"
                          className="block px-6 py-3 text-gray-500 hover:bg-gray-100"
                          onClick={() => {
                            closeDropdown();
                          }}
                        >
                          Change Password
                        </Link>
                      </li>
                      <li>
                        <a
                          className="block px-6 py-3 text-gray-500 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleLogout()
                            closeDropdown();
                          }}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
