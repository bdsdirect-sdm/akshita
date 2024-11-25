import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Signup from './pages/Signup';
import Cart from './pages/Cart';
import ProductListing from './pages/ProductListing';
import Checkout from './pages/Checkout';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/listing" element={<ProductListing/>}/>
        <Route path="/" element={<ProductListing/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;