import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProductListing from './pages/ProductListing';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Profile from './pages/Profile';
// import Update from './pages/Update';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Users/>}/>
         <Route path="/signup" element={<Signup/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path='/products' element={<ProductListing/>}/>
        {/* 
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/:id" element={<Update/>}/> */} */
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;