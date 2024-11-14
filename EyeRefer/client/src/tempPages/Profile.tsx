import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile:React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className='flex flex-row'>
    <div className='bg-gray-300 p-4 text-center m-4'>
      <h2>Basic information</h2>
      <label>Name:</label>
      <label>Gender:</label>
      <label>Phone:</label>
      <label>Email:</label>
    </div>
    <div className='bg-gray-300 p-4 text-center m-4'>
      <h2>Address information</h2>
      <button className='text-white bg-blue-600 rounded-sm' onClick={() => {navigate("/add-address")}}>Add address +</button>
    </div>
    </div>
      
    </>
  )
}

export default Profile