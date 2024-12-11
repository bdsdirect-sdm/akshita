import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Searchbar from "../components/Searchbar"

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
      {/* <Searchbar /> */}
      <div className='m-8'>
        <div className='overflow-x-auto'>
          <table className="table-auto w-full my-4 border-[2px] border-gray-200">
          <thead className="bg-white">
          <tr className="bg-white border-y-[1px]">
                <td scope="col" className="border-y-[1px] px-4 py-4 font-medium text-sm">Doctor Name</td>
                <td scope="col" className="border-y-[1px] px-4 py-4  font-medium text-sm">Referral Placed</td>
                <td scope="col" className="border-y-[1px] px-4 py-4  font-medium text-sm">Referral Completed</td>
                <td scope="col" className="border-y-[1px] px-4 py-4  font-medium text-sm">Avg Time of Contact</td>
                <td scope="col" className="border-y-[1px] px-4 py-4  font-medium text-sm">Avg Time of Consult</td>
                <td scope="col" className="border-y-[1px] px-4 py-4  font-medium text-sm">Phone</td>
                <td scope="col" className="border-y-[1px] px-4 py-4  font-medium text-sm">Email</td>
                <td scope="col" className="border-y-[1px] px-4 py-4  font-medium text-sm">Type</td>
              </tr>
          </thead>
            <tbody className="bg-white">
              {Doctors?.docList?.length > 0 ? Doctors?.docList?.map((doctor: any, index: number) => (
                <tr key={doctor.uuid} className="hover:bg-gray-100">
                  <td className="border-y-[1px] px-4 py-4 text-sm">{doctor.firstname} {doctor.lastname}</td>
                  <td className="border-y-[1px] px-4 py-4 text-sm"></td>
                  <td className="border-y-[1px] px-4 py-4 text-sm"></td>
                  <td className="border-y-[1px] px-4 py-4 text-sm"></td>
                  <td className="border-y-[1px] px-4 py-4 text-sm"></td>
                  <td className="border-y-[1px] px-4 py-4 text-sm">{doctor.phone}</td>
                  <td className="border-y-[1px] px-4 py-4 text-sm">{doctor.email}</td>
                  <td className="border-y-[1px] px-4 py-4 text-sm">{doctype === "2" ? "OD" : "MD"}</td>
                </tr>
              )): <tr><td colSpan={11} className="text-center py-4 text-sm">No data found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DoctorList