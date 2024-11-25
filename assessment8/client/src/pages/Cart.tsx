import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number; 
}

const Cart = () => {
  const navigate = useNavigate();
  const cartLocalStorage: CartItem[] = JSON.parse(localStorage.getItem("cartList") || "[]");
  const [cartList, setCartList] = useState<CartItem[]>(cartLocalStorage);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  const deleteFromLocalStorage = (itemToDelete: number) => {
    const updatedCart = cartList.filter((item) => item.id !== itemToDelete);
    setCartList(updatedCart);
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return; 
    setCartList(prevCart => 
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const totalQuantity = cartList.reduce((total, item) => total + item.quantity, 0);
  const totalCost = cartList.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  return (
    <>
    <Header/>
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h1>
      <div className="space-y-4">
        {cartList.length > 0 ? (
          cartList.map(item => (
            <div key={item.id} className="flex justify-between items-center border p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="font-semibold text-lg text-gray-800">{item.title}</h2>
                <p className="text-gray-600">Price: <span className="font-bold">${item.price.toFixed(2)}</span></p>
                <p className="flex items-center">
                  Quantity: 
                  <input 
                    type="number" 
                    value={item.quantity} 
                    min="1" 
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="ml-2 border rounded p-1 w-16 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-green-300"
                  />
                </p>
              </div>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition duration-200"
                onClick={() => deleteFromLocalStorage(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        )}
      </div>

      {cartList.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow flex justify-between">
            <div>
                <p className="text-lg font-semibold">Total quantity: <span className="font-bold">{totalQuantity}</span></p>
                <p className="text-lg font-semibold">Total cost: <span className="font-bold">${totalCost}</span></p>
            </div>
          
          <button 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition duration-200"
            onClick={() => {
              localStorage.setItem("totalAmount", totalCost);
              navigate("/checkout")}
            }
          >
            Pay Now
          </button>
        </div>
      )}

      <button 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition duration-200"
        onClick={() => navigate("/listing")}
      >
        Add Items
      </button>
    </div>
    </>
    
  );
};

export default Cart;
