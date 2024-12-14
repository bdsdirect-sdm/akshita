import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button"
import { Local } from "../environment/env"
import api from "../api/axiosInstance"
import { useQuery } from "@tanstack/react-query"

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchDoctorProfile = async() => {
    try {
      const response = await api.get(`${Local.GET_DOCTOR}`, {
        headers: {
          Authorization: `Bearer: ${token}`
        } 
      })
      console.log("RESPONSE DOC", response.data.doctor)
      return response.data.doctor;
    } catch (err) {
      console.log("ERROR", err)
    }
  }

  const {data: Doctor, error, isLoading, isError} = useQuery({
    queryKey: ['doctor'],
    queryFn: fetchDoctorProfile
  })

  console.log("doccyhdhh dh", Doctor)
  
  return (
    <>
      <p className='text-2xl font-bold p-12'>Profile</p>
      <div className='flex flex-row bg-white mx-12 rounded items-center justify-start min-h-screen'>
        <div className='flex flex-col justify-between w-full p-4'>
          <div className='flex flex-row bg-gray-300 m-4 justify-between'>
            <div>
              <img alt='user' className='bg-white'/>
              <label>{Doctor?.firstname}</label>
            </div>
            
            <Button>EDIT PROFILE</Button>
          </div>

          <div className='bg-gray-100 shadow-md rounded p-6 justify-start text-center m-4 '>

            <div className='flex flex-row'>
              <div className='flex flex-col text-left w-1/3'>
                <div className='p-2'>
                  <label className='font-bold'>Name:</label>
                  <span className='text-gray-500 px-2 font-bold'>{Doctor?.firstname} {Doctor?.lastname}</span>
                </div>
                <div className='p-2'>
                  <label className='font-bold'>Phone:</label>
                  <span className='text-gray-500 px-2 font-bold'>{Doctor?.phone}</span>
                </div>
              </div>
             
              
              <div className='flex flex-col'>
                <div className='flex flex-col text-left'>
                  <div className='p-2'>
                    <label className='font-bold'>Gender:</label>
                    <span className='text-gray-500 px-2 font-bold'>{Doctor?.gender}</span>
                  </div>
                  <div className='p-2'>
                    <label className='font-bold'>Email:</label>
                    <span className='text-gray-500 px-2 font-bold'>{Doctor?.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end'>
            <Button 
                onClick={() => navigate("/add-address")}
                className="p-12 m-4"
              >
                Add Address
            </Button>
          </div>
          
          <div className='bg-gray-100 shadow-md rounded p-6 justify-start text-center m-4 '>
            <h2 className='text-2xl font-medium mb-4 text-left'>Address Information</h2>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
