import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
            <Header />
            <div className="flex h-screen">
                <Navbar />
                <Outlet/>
            </div>
            <Footer/>
        </>
  )
}

export default Layout