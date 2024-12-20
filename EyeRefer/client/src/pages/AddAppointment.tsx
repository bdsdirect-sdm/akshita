import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Local } from '../environment/env';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import * as Yup from 'yup';
import React, { useEffect } from 'react';
import SaveCancel from "../components/SaveCancel"

const AddAppointment: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  const addAppointment = async (data: any) => {
    try {
      const response = await api.post(`${Local.ADD_APPOINTMENT}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('USERR::::::::', data);
      return response.data;
    } catch (err: any) {
      toast.error(`${err.response.message}`);
    }
  };

  const appointmentMutation = useMutation({
    mutationFn: addAppointment,
    onSuccess: () => {
      toast.success('Appointment Saved');
      if (localStorage.getItem('token')) {
        const doctype = localStorage.getItem('doctype');
        navigate('/dashboard');
      }
    },
  });

  const fetchReferredPatients = async () => {
    try {
      const response = await api.get(`${Local.GET_REFERRED_PATIENT_LIST}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error fetching Patients');
    }
  };

  const { data: ReferredPatients, isLoading, isError, error } = useQuery({
    queryKey: ['ReferredPatients'],
    queryFn: fetchReferredPatients,
  });

  const validationSchema = Yup.object().shape({
    patient: Yup.string().required('Patient name is required'),
    type: Yup.string().required('Appointment type is required'),
  });

  const appointmentHandler = (values: any) => {
    appointmentMutation.mutate(values);
    console.log('Appointment Saved------->', appointmentMutation.data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center space-x-2">
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
    <Formik
      initialValues={{
        patient: '',
        date: null,
        type: '',
        notes: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        appointmentHandler(values);
      }}
    >
      {({ values, errors }) => (
        <Form className="space-y-10 p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="form-group">
            <label className="block text-gray-700">Patient Name</label>
            <Field as="select" name="patient" className="form-select w-full p-2 border rounded-md bg-gray-50">
              <option value="" disabled>
                Select
              </option>
              {ReferredPatients?.patientList?.map((ref: any) => (
                <option key={ref.uuid} value={ref.uuid}>
                  {ref.firstname} {ref.lastname}
                </option>
              ))}
            </Field>
            <ErrorMessage name="patient" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="form-group">
            <label className="block text-gray-700">Appointment Date</label>
            <Field type="date" name="date" className="form-control w-full p-2 border rounded-md bg-gray-50" />
            <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="form-group">
            <label className="block text-gray-700">Type</label>
            <Field as="select" name="type" className="form-control w-full p-2 border rounded-md bg-gray-50">
              <option value="" disabled>
                Select
              </option>
              <option value="consultation">Consultation</option>
              <option value="surgery">Surgery</option>
            </Field>
            <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="form-group">
            <label className="block text-gray-700">Notes</label>
            <Field
              as="textarea"
              name="notes"
              className="form-control w-full p-2 border rounded-md bg-gray-50"
              rows={4}
            />
            <ErrorMessage name="notes" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <SaveCancel/>
        </Form>
      )}
    </Formik>
  );
};

export default AddAppointment;
