import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Chat from '../pages/Chat';
import { socket } from '../utils/socket';
import moment from 'moment';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const PatientListMD: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  const fetchPatient = async() => {
    try{
      const response = await api.get(`${Local.GET_PATIENT_LIST}`, {
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
 
  const { data: Patients, error, isLoading, isError } = useQuery({
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
      socket.emit("joinRoom", roomId);
    }
  }
  
  return (
    <>
    <Searchbar/>
  <div className='overflow-x-auto max-w-full m-8'>
    <div className='bg-white'>
      <table className="table-auto w-full my-4 border border-gray-300">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th scope="col" className="border px-4 py-2">#</th>
            <th scope="col" className="border px-4 py-2">Patient Name</th>
            <th scope="col" className="border px-4 py-2">DOB</th>
            <th scope="col" className="border px-4 py-2">Referred On</th>
            <th scope="col" className="border px-4 py-2">Referred By</th>
            <th scope="col" className="border px-4 py-2">Consultation Date</th>
            <th scope="col" className="border px-4 py-2">Surgery Date</th>
            <th scope="col" className="border px-4 py-2">Status</th>
            <th scope="col" className="border px-4 py-2">Return to Referrer</th>
            <th scope="col" className="border px-4 py-2">Consult Note</th>
            <th scope="col" className="border px-4 py-2">Direct Message</th>
            <th scope="col" className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {Patients.patientList.map((patient: any, index: number) => (
            <tr key={patient.uuid} className="hover:bg-gray-100">
              <td className='fw-bold border px-4 py-2'>{index + 1}</td>
              <td className="border px-4 py-2">{patient.firstname} {patient.lastname}</td>
              <td className="border px-4 py-2">{moment(new Date(patient.dob)).format('MMM-D-YYYY')}</td>
              <td className="border px-4 py-2">{moment(new Date(patient.referedon)).format('MMM-D-YYYY')}</td>
              <td className="border px-4 py-2">{patient.referedby.firstname} {patient.referedby.lastname}</td>
              {patient.appointmentType === "consultation" ? (
                <>
                  <td className="border px-4 py-2">{moment(new Date(patient.appointmentDate)).format('MMM-D-YYYY')}</td>
                  <td className="border px-4 py-2"></td>
                </>
              ) : (
                <>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">{moment(new Date(patient.appointmentDate)).format('MMM-D-YYYY')}</td>
                </>
              )}
              <td className="border px-4 py-2">{patient.referalstatus ? "Completed" : "Pending"}</td>
              <td className="border px-4 py-2">{patient.referback ? "Yes" : "No"}</td>
              <td className="border px-4 py-2">{patient.notes}</td>
              <td className="border px-4 py-2">
                <a className="underline text-blue-700" onClick={() => {
                  localStorage.setItem("room", `${patient.referedby.uuid}${patient.referedto.uuid}${patient.uuid}`);
                }} 
                href={`${Local.BASE_URL}chat/${patient.referedby.uuid}${patient.referedto.uuid}${patient.uuid}`}>Link</a>
              </td>
              <td className="border px-4 py-2">
                <div className='flex-col'>
                <button className="btn btn-primary mr-2" onClick={() => { navigate(`/edit-patient/${patient.uuid}`); }}><MdOutlineEdit /></button>
                <button className="btn btn-danger mr-2"><AiOutlineDelete /></button>
                <button className="btn btn-secondary" onClick={() => { navigate(`/view-patient/${patient.uuid}`); }}><MdOutlineRemoveRedEye /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</>

  )
}

export default PatientListMD

//for consultation date, search for current patient in appointment table
