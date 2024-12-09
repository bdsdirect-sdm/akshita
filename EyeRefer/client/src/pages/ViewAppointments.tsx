import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineEdit } from "react-icons/md";
// import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const ViewAppointments: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  async function updateStatus(appointmentStatus: string, patientId: number, appointmentId: number){
    try {
      const response = await api.post(`${Local.UPDATE_APPOINTMENT_STATUS}`, {appointmentStatus, patientId, appointmentId},
        {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      toast.error(`${err}`);
    }
  }

  const fetchAppointments = async() => {
    try{
      const response = await api.get(`${Local.VIEW_APPOINTMENTS}`, {
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
 
  const { data: Appointments, error, isLoading, isError } = useQuery({
    queryKey: ['appointment'],
    queryFn: fetchAppointments
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

  // console.log("Appointment-List------------>", Appointments);
  return (
    <div className='overflow-x-auto max-w-full m-8'>
      <div>
        <div >
          <table className="table-auto w-full my-4 border border-gray-300">
            <thead className="bg-gray-400">
              <tr >
                <th scope="col" className="border px-4 py-2">#</th>
                <th scope="col" className="border px-4 py-2">Patient name</th>
                <th scope="col" className="border px-4 py-2">Date</th>
                <th scope="col" className="border px-4 py-2">Type</th>
                <th scope="col" className="border px-4 py-2">Status</th>
                <th scope="col" className="border px-4 py-2">Complete appointment</th>
                <th scope="col" className="border px-4 py-2">Cancel appointment</th>
                <th scope="col" className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Appointments.appointmentList.map((appointment: any, index: number) =>(
                <>
                <tr key={appointment?.uuid} className="hover:bg-gray-100">
                  <td className='fw-bold border px-4 py-2' > {index+1} </td>
                  <td className="border px-4 py-2">{appointment.name}</td>
                  <td className="border px-4 py-2"> {appointment.date} </td>
                  <td className="border px-4 py-2">{appointment.type}</td>
                  <td className="border px-4 py-2"> {appointment.status}</td>
                  
                  <td>
                    <button className="text-green-700 border px-4 py-2" onClick={() => {
                      updateStatus("Completed", appointment.patient.uuid, appointment.id)
                    }}> Complete </button>
                  </td>
                  <td>
                    <button className='text-red-700 border px-4 py-2' onClick={() => updateStatus("Canceled", appointment.patient.uuid, appointment.id)}> Cancel </button>
                  </td>
                  <td className="border px-4 py-2">
                          <div className='flex flex-row'>
                          <button className="btn btn-primary mr-2" onClick={() => { navigate(`/edit-appointment/${appointment.id}`); }}><MdOutlineEdit /></button>
                          <button className="btn btn-secondary" onClick={() => { navigate(`/view-appointment/${appointment.id}`); }}><MdOutlineRemoveRedEye /></button>
                          </div>
                        </td>
                </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewAppointments