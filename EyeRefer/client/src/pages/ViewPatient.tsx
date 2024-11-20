import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { socket } from '../utils/socket';

const ViewPatient = () => {
    const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const {id} = useParams();

  console.log("ID:::::::::::", id)

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
    
  },[])

  const fetchPatient = async() => {
    
    try{
        
      const response = await api.get(`${Local.VIEW_PATIENT}/${id}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return response.data;
    }
    catch(err){
      toast.error(`${err}`);
    }
  }
 
  const { data: Patient, error, isLoading, isError } = useQuery({
    queryKey: ['patient'],
    queryFn: fetchPatient,
    select: (data)=> data.patientData || {},
    initialData: {}
  })

//   console.log(Patient.Patient.gender)
console.log(Patient)

  return (
    <>
        <div>
            <div>
                <h2 className='text-2xl fw-bold'>Basic Information</h2>
                <div className='bg-gray-300 p-4 m-4 w-fit'>
                    <p className='text-lg p-4'>Name: {Patient.firstname} {Patient.lastname}</p>
                    <p className='text-lg p-4'>Gender: {Patient.gender}</p> 
                    <p className='text-lg p-4'>Date of Birth: {Patient.dob}</p>
                    <p className='text-lg p-4'>Phone: {Patient.phone}</p>
                    <p className='text-lg p-4'>Email: {Patient.email}</p>
                </div>
                <h3 className='text-2xl fw-bold'>Reason of Consult</h3>
                <div className='bg-gray-300 p-4 m-4 w-min flex'>
                    
                    <p className='text-lg p-4'>Reason: {Patient.reason}</p>
                    <p className='text-lg p-4'>Laterality: {Patient.laterality}</p>
                    <p className='text-lg p-4'>Timing: {Patient.timing}</p>
                </div>
                <h3 className='text-2xl fw-bold'>Referral MD</h3>
                <div className='bg-gray-300 p-4 m-4 w-min flex'>
                    
                    <p className='text-lg p-4'>MD Name: {Patient.User?.firstname} {Patient.User?.lastname}</p>
                    <p className='text-lg p-4'>Location: {Patient.Address?.city}</p>
                </div>
                <h3 className='text-2xl fw-bold'>Appointment Details</h3>
                <div className='bg-gray-300 p-4 m-4 w-min flex'>
                    
                    <p className='text-lg p-4'>Appointment date/time: </p>
                    <p className='text-lg p-4'>Surgical: </p>
                </div>
                <h3 className='text-2xl fw-bold'>Documentation</h3>
                <div className='bg-gray-300 p-4 m-4 w-min flex'>
                    
                    <p className='text-lg p-4'>Medical Documents:</p>
                </div>
                <h3 className='text-2xl fw-bold'>Notes</h3>
                <div className='bg-gray-300 p-4 m-4 w-min flex'>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default ViewPatient