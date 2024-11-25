import React, { useEffect, useState } from 'react';
import productsData from '../../products.json'; 
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

interface Product {
    id: number;              
    title: string;             
    image: string;             
    price: number;             
    category: string;          
    stock: number;             
    tags?: string[];           
    rating: number;            
    count: number;  
    seller: string;            
    description: string;       
}

interface CartItem {
    id: number;              
    title: string;            
    price: number;
    quantity: number; 
}

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1); 
  const [productsPerPage] = useState(8); 

  useEffect(() => {
    setProducts(productsData); 
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

 
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cartList");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id); 

        if (existingItem) {
            const updatedCart = prevCart.map(item => 
              item.id === product.id 
                ? { ...item, quantity: existingItem.quantity + 1 }
                : item
            );
            
            localStorage.setItem("cartList", JSON.stringify(updatedCart)); 
            return updatedCart; 
        } else {
            const newCart = [...prevCart, { id: product.id, title: product.title, price: product.price, quantity: 1 }];
            localStorage.setItem("cartList", JSON.stringify(newCart)); 
            return newCart; 
        }
    });

    console.log("Added to cart:", product);
};

  const buyNow = (product: Product) => {
    console.log("Buy now clicked for:", product);
  };
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
 
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
    <Header/>
    <div className="container mx-auto p-4">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map(product => (
          <div key={product.id} className="border rounded-lg shadow-md overflow-hidden border-solid-black hover:shadow-2xl">
            <div className='flex justify-center sm:px-12 p-4'>
                <img 
                src={product.image} 
                alt={product.title} 
                className="h-36 drop-shadow-md rounded-md m-auto" 
                />
            </div>
            
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2> 
              <p className="text-gray-700 mb-2">Price: <span className="font-bold">${product.price.toFixed(2)}</span></p>
              <div className="flex flex-col">
                <button 
                  className="bg-blue-600 text-lg text-white py-1 px-2 rounded hover:bg-blue-400 transition m-4"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
                {/* <button 
                  className="bg-blue-600 text-white py-1 px-2 text-lg rounded-md hover:bg-blue-400 transition m-4"
                  onClick={() => buyNow(product)}
                >
                  Buy Now
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button 
          className="border px-4 py-2 mx-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400 disabled:opacity-50"
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 mx-2 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-500'} border rounded`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        
        <button 
          className="border px-4 py-2 mx-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400 disabled:opacity-50"
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </>
    
  );
};

export default ProductListing;
