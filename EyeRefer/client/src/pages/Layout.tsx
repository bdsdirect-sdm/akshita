import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
    <div className='h-screen flex flex-col'>
            <Header />
            <div className="flex ">
                <Navbar />
                <Outlet/>
            </div>
            <Footer/>
    </div>
   
        </>
  )
}

export default Layout