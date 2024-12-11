import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import React, { useEffect } from 'react';
import api from '../api/axiosInstance';
import Button from "../components/Button";

const AddStaff: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]);

  const addStaff = async (data: any) => {
    try {
      const response = await api.post('/add-staff', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err: any) {
      toast.error(`Error: ${err.response?.data?.message || 'Failed to add staff'}`);
      throw new Error(err.message);
    }
  };

  const staffMutation = useMutation({
    mutationFn: addStaff,
    onSuccess: () => {
      toast.success('Staff added successfully');
      navigate('/staff-list');
    },
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Staff name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone number is required').min(10, 'Phone number is too short'),
    gender: Yup.string().required('Gender is required'),
  });

  const staffHandler = (values: any) => {
    staffMutation.mutate(values);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        gender: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        staffHandler(values);
      }}
    >
      {() => (
        <Form className="space-y-10 p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="form-group">
            <label className="block text-gray-700">Staff Name</label>
            <Field
              type="text"
              name="name"
              className="form-control w-full p-2 border rounded-md bg-gray-50"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="form-group">
            <label className="block text-gray-700">Email</label>
            <Field
              type="email"
              name="email"
              className="form-control w-full p-2 border rounded-md bg-gray-50"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="form-group">
            <label className="block text-gray-700">Phone</label>
            <Field
              type="text"
              name="phone"
              className="form-control w-full p-2 border rounded-md bg-gray-50"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="form-group">
            <label className="block text-gray-700">Gender</label>
            <Field as="select" name="gender" className="form-control w-full p-2 border rounded-md bg-gray-50">
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="flex justify-center">
            <Button type="submit">
              {/* {staffMutation.isLoading ? 'Saving...' : 'Submit'} */}
              Search
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddStaff;
