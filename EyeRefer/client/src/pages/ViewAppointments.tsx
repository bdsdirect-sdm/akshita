import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineEdit } from "react-icons/md";
// import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import moment from 'moment';

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
      <h1 className="text-2xl font-bold">Appointment list</h1>
      <div>
        <div >
        <table className="table-auto w-full my-4 border-[2px] border-gray-200 overflow-x-auto">
          <thead className="bg-white">
            <tr className="bg-white border-y-[1px]">
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Patient Name</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Date</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Type</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Status</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Complete Appointment</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Cancel Appointment</th>
              <th scope="col" className="border-y-[1px] px-4 py-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {Appointments?.appointmentList?.length > 0 ? 
              Appointments.appointmentList.map((appointment: any, index: number) => (
                <tr key={appointment?.uuid} className="hover:bg-gray-100">
                  <td className="border-y-[1px] px-4 py-2 text-sm">{appointment.name}</td>
                  <td className="border-y-[1px] px-4 py-2 text-sm">{moment(appointment.date).format('MMM-D-YYYY')}</td>
                  <td className="border-y-[1px] px-4 py-2 text-sm">{appointment.type}</td>
                  <td className="border-y-[1px] px-4 py-2 text-sm">{appointment.status}</td>
                  
                  <td>
                    <button className="text-green-700 border px-4 py-2" onClick={() => {
                      updateStatus("Completed", appointment.patient.uuid, appointment.id);
                    }}>Complete</button>
                  </td>
                  <td>
                    <button className="text-red-700 border px-4 py-2" onClick={() => {
                      updateStatus("Canceled", appointment.patient.uuid, appointment.id);
                    }}>Cancel</button>
                  </td>
                  <td className="border-y-[1px] px-4 py-2 text-sm">
                    <div className="flex flex-row">
                      <button className="btn btn-primary mr-2" onClick={() => { navigate(`/edit-appointment/${appointment.id}`); }}>
                        <MdOutlineEdit />
                      </button>
                      <button className="btn btn-secondary" onClick={() => { navigate(`/view-appointment/${appointment.id}`); }}>
                        <MdOutlineRemoveRedEye />
                      </button>
                    </div>
                  </td>
                </tr>
              )) 
            : 
              <tr>
                <td colSpan={8} className="text-center py-4 text-sm">No data found.</td>
              </tr>
            }
          </tbody>
        </table>

        </div>
      </div>
    </div>
  )
}

export default ViewAppointments