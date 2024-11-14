import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  return (
    <>
    <div>
      <div></div>
      <div>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Patient name</th>
      <th scope="col">DOB</th>
      <th scope="col">Referred on</th>
      <th scope="col">Referred by</th>
      <th scope="col">Consultation date</th>
      <th scope="col">Surgery date</th>
      <th scope="col">Status</th>
      <th scope="col">Return to referrer</th>
      <th scope="col">Consult note</th>
      <th scope="col">Direct message</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {Patients.patientList.map((patient:any,index:number) =>(
      <>
      <tr>
        <td className='fw-bold' > {index+1} </td>
        <td>{patient.firstname} {patient.lastname}</td>
        <td> {patient.dob} </td>
        <td></td>
        <td> {patient.referedby.firstname} {patient.referedby.lastname} </td>
        <td></td>
        <td></td>
        <td> {patient.referalstatus && ("Completed")} {patient.referalstatus==false && ("Pending")} </td>
        <td> {patient.referback && ("yes")} {patient.referback==false && ("No")} </td>
        <td></td>
        <td></td>
        <td></td>
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

export default PatientListMD

//for consultation date, search for current patient in appointment table
