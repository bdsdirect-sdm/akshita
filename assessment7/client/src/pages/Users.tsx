import React from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  return (
    <>
      <button>
        <div>Buyer</div>
      </button>

      <button onClick={() => navigate("/signup")}>
        <div>Seller</div>
      </button>
    </>
  );
};

export default Users;