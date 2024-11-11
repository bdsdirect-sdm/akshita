import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile:React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => {navigate("/add-address")}}>Add address</button>
    </>
  )
}

export default Profile