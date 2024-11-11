import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ErrorResponse {
  message: string;
}

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("authToken");
      const id = localStorage.getItem("user");
      console.log("IDDD:::", id)
      try {
        const response = await axios.get<Product[]>(
          `http://localhost:5000/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error fetching products");
        console.error("Fetch products error:", err); 
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user"); 
    navigate("/login");
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products List</h2>
      <ul className="list-group">
        {products.map((prod) => (
          <li
            key={prod.id}
            className="list-group-item d-flex align-items-center"
          >
            <img
              src={`http://localhost:5000/${prod.image}`}
              alt={`${prod.name}'s Profile`}
              className="rounded-circle me-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div>
              <h5>{prod.name}</h5>
              <p className="mb-0">Price: ${prod.price}</p>
              <p className="mb-0">Quantity: {prod.quantity}</p>
              {/*
              <p className="mb-0">Status: {prod.status}</p>
              */}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
