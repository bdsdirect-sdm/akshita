import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Chat from '../pages/Chat';
import socket from '../utils/socket';
import moment from 'moment';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Searchbar from "./Searchbar"
import Pagination from "./Pagination"
import  {queryClient} from "../main"
import Button from "./Button"

const PatientListMD: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  const deletePatient = async (id: string) => {
    // 
      try {
        if (window.confirm("Are you sure you want to delete this patient?")) 
      {await api.delete(`${Local.DELETE_PATIENT}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("HELLOOOOO")
      queryClient.invalidateQueries({ queryKey: ['patient'] })

      toast.success("Patient deleted successfully!");}
        // refetch(); // Refetch the data after deletion
      } catch (err) {
        toast.error("Failed to delete patient.");
      }
    
  };

  const fetchPatient = async() => {
    try{
      const response = await api.get(`${Local.GET_PATIENT_LIST}?search=${query}`, {
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
 
  const { data: Patients, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['patient'],
    queryFn: fetchPatient
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

  console.log("Patient-List------------>", Patients);

  function joinRoom(roomId: string) {
    if(roomId !== "") {
      socket.emit("joinRoom", {room: "roomId"});
    }
  }
  
  return (
    <>
      <div className='flex justify-between align-items-center bg-gray-200 p-8'>
        <h1 className="text-2xl font-bold">Referral Patients</h1>
        <Button onClick={() => { navigate("/add-patient") }}>+ Add Referral Patient</Button>
      </div>
      <Searchbar refetch={refetch} query={query} setQuery={setQuery} />
      <div className="max-w-full p-8">
        <table className="table-auto w-full my-4 border-[2px] border-gray-200 overflow-x-auto">
          <thead className="bg-white">
            <tr className="bg-white border-y-[1px]">
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Patient Name</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">DOB</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Referred On</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Referred To</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Consultation Date</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Surgery Date</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Status</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Return to Referrer</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Consult Note</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Direct Message</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {Patients?.patientList?.length > 0 ? Patients?.patientList?.map((patient: any, index: number) => (
              <tr key={patient.uuid} className="hover:bg-gray-100">
                <td className="border-y-[1px] px-4 py-2 text-sm">{patient.firstname} {patient.lastname}</td>
                <td className="border-y-[1px] px-4 py-2 text-sm">{moment(new Date(patient.dob)).format('MMM-D-YYYY')}</td>
                <td className="border-y-[1px] px-4 py-2 text-sm">{moment(new Date(patient.referedon)).format('MMM-D-YYYY')}</td>
                <td className="border-y-[1px] px-4 py-2 text-sm">{patient.referedto.firstname} {patient.referedto.lastname}</td>
                {patient.appointmentType === "consultation" ? (
                  <>
                    <td className="border-y-[1px] px-4 py-2 text-sm">{patient?.appointmentDate ? moment(new Date(patient?.appointmentDate)).format('MMM-D-YYYY') : "-"}</td>
                    <td className="border-y-[1px] px-4 py-2 text-sm"></td>
                  </>
                ) : (
                  <>
                    <td className="border-y-[1px] px-4 py-2 text-sm"></td>
                    <td className="border-y-[1px] px-4 py-2 text-sm">{patient?.appointmentDate ? moment(new Date(patient?.appointmentDate)).format('MMM-D-YYYY') : "-"}</td>
                  </>
                )}
                <td className="border-y-[1px] px-4 py-2 text-sm">{patient.referalstatus ? "Completed" : "Pending"}</td>
                <td className="border-y-[1px] px-4 py-2 text-sm">{patient.referback ? "Yes" : "No"}</td>
                <td className="border-y-[1px] px-4 py-2 text-sm"><a className="text-blue-500 underline">Note</a></td>
                <td className="border-y-[1px] px-4 py-2 text-sm">
                  <a className="underline text-blue-600 hover:cursor-pointer" onClick={() => {
                    const roomId = patient?.referedby.uuid + patient?.referedto.uuid + patient?.uuid;
                    localStorage.setItem("room", roomId);
                    joinRoom(roomId);
                    navigate(`/chat/${roomId}`);
                  }}>
                    Link
                  </a>
                </td>
                <td className="border-y-[1px] px-4 py-2 text-sm">
                  <div className="flex flex-row">
                    <button className="btn btn-primary mr-2" onClick={() => { navigate(`/edit-patient/${patient.uuid}`); }}><MdOutlineEdit /></button>
                    <button className="btn btn-danger mr-2" onClick={() => deletePatient(patient.uuid)}><AiOutlineDelete /></button>
                    <button className="btn btn-secondary" onClick={() => { navigate(`/view-patient/${patient.uuid}`); }}><MdOutlineRemoveRedEye /></button>
                  </div>
                </td>
              </tr>
            )) : <tr><td colSpan={11} className="text-center py-4 text-sm">No data found.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PatientListMD

//for consultation date, search for current patient in appointment table