import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Local } from '../environment/env';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  date: Yup.string().required('Date is required'),
  type: Yup.string().required('Type is required'),
  notes: Yup.string().required('Notes are required'),
});

const EditAppointment: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { id } = useParams();

  useEffect(() => {
    if (!token) navigate('/login');
  }, [navigate, token]);

  const fetchAppointment = async () => {
    try {
      const response = await api.get(`${Local.VIEW_APPOINTMENT}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("OG APPOINTMENT DATA", response.data)
      return response.data;
    } catch (err) {
      toast.error('Error fetching appointment data');
    }
  };

  const { data: Appointment, error, isLoading, isError } = useQuery({
    queryKey: ['appointment', id],
    queryFn: fetchAppointment,
  });

  const updateAppointment = async (data: any) => {
    try {
      const response = await api.put(`${Local.EDIT_APPOINTMENT}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Appointment updated successfully');
      navigate('/view-appointments'); 
    } catch (err) {
      toast.error('Error updating appointment');
    }
  };

  const mutation = useMutation({
    mutationFn: updateAppointment
  });

  const handleSubmit = (values: any) => {
    mutation.mutate(values);
  };

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
    return <div>Error: {error?.message || 'Error loading data'}</div>;
  }

  return (
    <div className='m-5 p-8'>
      <Formik
        initialValues={{
          firstname: Appointment?.appointmentData?.Patient?.firstname || '',
          lastname: Appointment?.appointmentData?.Patient?.lastname || '',
          date: Appointment?.appointmentData?.date || '',
          type: Appointment?.appointmentData?.type || '',
          notes: Appointment?.appointmentData?.notes || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <h2 className="text-xl font-semibold mb-4">Edit Appointment</h2>
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="form-group">
              <label className="block mb-1">First Name:</label>
              <Field
              disabled
                type="text"
                name="firstname"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="firstname" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="form-group">
              <label className="block mb-1">Last Name:</label>
              <Field
              disabled
                type="text"
                name="lastname"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="lastname" component="div" className="text-red-500 mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="form-group">
              <label className="block mb-1">Date:</label>
              <Field
                type="date"
                name="date"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="date" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="form-group">
              <label className="block mb-1">Type:</label>

              <Field as="select" name="type" className="w-full border border-gray-300 rounded-md p-2">
                <option value="" disabled>
                 Select
                </option>
                <option value="consultation">Consultation</option>
                <option value="surgery">Surgery</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-500 mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="form-group">
              <label className="block mb-1">Notes:</label>
              <Field
                as="textarea"
                name="notes"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="notes" component="div" className="text-red-500 mt-1" />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="btn btn-outline-primary bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              onClick={() => navigate('/view-appointments')}
            >
              Cancel Changes
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditAppointment;
