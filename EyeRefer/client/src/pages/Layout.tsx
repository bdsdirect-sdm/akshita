import React from 'react'
import Header from '../components/Header'
import { Navbar } from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
            <Header />
            <div className="flex h-screen">
                <Navbar />
                <div className="flex-grow p-4 bg-gray-100">
                    <Outlet/>
                </div>
            </div>
        </>
  )
}

export default Layout