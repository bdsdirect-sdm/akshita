import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DoctorList: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const doctype = localStorage.getItem("doctype");

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  const fetchDoctors = async() => {
    try{
      const response = await api.get(`${Local.VIEW_DOCTORS}`, {
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
 
  const { data: Doctors, error, isLoading, isError } = useQuery({
    queryKey: ['doctor'],
    queryFn: fetchDoctors
  })

  if(isLoading){
    return(
      <>
        <div>Loading...</div>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </>
    )}

  if(isError){
    return(
      <>
      <div className='text-danger' >Error: {error.message}</div>
      </>
      )}

  console.log("Doctor-List------------>", Doctors);
  return (
    <>
    <div>
      <div></div>
      <div>
      <table className="table my-4">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Doctor name</th>
      <th scope="col">Referral placed</th>
      <th scope="col">Referral completed</th>
      <th scope="col">Avg time of contact</th>
      <th scope="col">Avg time of consult</th>
      <th scope="col">Phone</th>
      <th scope="col">Email</th>
      <th scope="col">Type</th>
    </tr>
  </thead>
  <tbody>
    {Doctors.docList.map((doctor: any, index: number) =>(
      <>
      <tr>
        <td className='fw-bold' > {index+1} </td>
        <td>{doctor.firstname + " " + doctor.lastname}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td> {doctor.phone} </td>
        <td>{doctor.email}</td>
        {/* {(doctype === "2") ? (): ()} */}
        <td> {doctor.type}</td>
        
        <td>{doctor.phone}</td>
      </tr>
      </>
    ))}
  </tbody>
</table>
      </div>
    </div>
    </>
  )
}

export default DoctorList