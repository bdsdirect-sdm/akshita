import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Navbar/> 
          <div className="w-full overflow-y-auto bg-gray-200">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
