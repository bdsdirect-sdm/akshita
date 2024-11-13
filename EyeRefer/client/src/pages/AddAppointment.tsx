import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Local } from '../environment/env';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import * as Yup from 'yup';
import React, { useEffect } from 'react';
const token = localStorage.getItem('token');

const AddAppointment:React.FC = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[]);
  
  const addAppointment = async(data:any) =>{
    try{
      const response = await api.post(`${Local.ADD_APPOINTMENT}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("USERR::::::::", data)
      return response.data;
    }
    catch(err:any){
      toast.error(`${err.response.message}`)
    }
  }

  const appointmentMutation = useMutation({
    mutationFn: addAppointment,
    onSuccess: ()=>{
      toast.success("Appointment Saved");
      if (localStorage.getItem('token')) {
        const doctype = localStorage.getItem("doctype");
        if( doctype == "1" ) {
            navigate('/md-dashboard');
          } else {
            navigate("/od-dashboard");
          }
    }
    }
  })

  const fetchReferredPatients = async () => {
    try {
      const response = await api.get(`${Local.GET_REFERRED_PATIENT_LIST}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // console.log("Data-------------->", response.data);
      return response.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error fetching Patients');
    }
  };

  const { data: ReferredPatients, isLoading, isError, error } = useQuery({
    queryKey: ["ReferredPatients"],
    queryFn: fetchReferredPatients,
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Patient name is required"),
    date: Yup.string().required("Appointment date is required"),
    type: Yup.string().required("Appointment type is required"),
  })

  const appointmentHandler = (values:any) =>{
    appointmentMutation.mutate(values);
    console.log("Appointment Saved------->", appointmentMutation.data);
  }

  if (isLoading) {
    return (
      <div>
        <div>Loading...</div>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>Error: {error?.message || 'Error loading data'}</div>
    );
  }

  return (
    <Formik
    initialValues={{
      name: "",
      date: "",
      type: "",
      notes: "",
      }}
      validationSchema={validationSchema}
      onSubmit={appointmentHandler}
    >
      {()=>(
              <Form>
                <div className="form-group"> 
                  <label>Patient Name</label>
                  <Field as='select' name='name' className='form-select'>
                <option value="" disabled>Select</option>
                {ReferredPatients?.patientList.map((ref: any) => (
                  <option key={ref.uuid} value={ref.firstname+" "+ref.lastname}>{ref.firstname} {ref.lastname}</option>
                ))}
              </Field>
                  <ErrorMessage name="name" component="div" className="text-danger"/>
                </div>
                <br />

                <div className="form-group">
                  <label>Appointment Date</label>
                  <Field type="date" name="date" className="form-control"/>
                  <ErrorMessage name="date" component="div" className="text-danger"/>
                </div>
                <br />
                
                <div className="form-group">
                  <label>Type</label>
                  <Field as="select" type="text" name="type" className="form-control">
                    <option value="" disabled>Select</option>
                    <option value="consultation">Consultation</option>
                    <option value="surgery">Surgery</option>
                  </Field>
                  <ErrorMessage name="type" component="div" className="text-danger"/>
                </div>
                <br />
                
                <div className="form-group">
                  <label>Notes</label>
                  <Field type="textarea" name="notes" className="form-control"/>
                  <ErrorMessage name="notes" component="div" className="text-danger"/>
                </div>
                <br />

                <button type="submit" className='btn btn-outline-dark'>Submit</button>
              </Form>
      )}
    </Formik>
  )
}

export default AddAppointment;