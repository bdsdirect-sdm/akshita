import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Local } from '../environment/env';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: Yup.string().required("Email is required").email("Invalid email format"),
  gender: Yup.string().required("Gender is required")
});

const EditStaff: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { id } = useParams();

  useEffect(() => {
    if (!token) navigate('/login');
  }, [navigate, token]);

  const fetchStaff = async () => {
    try {
      const response = await api.get(`${Local.GET_STAFF}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("DATAAAA", response.data)
      return response.data;
    } catch (err) {
      toast.error('Error fetching staff data');
      throw new Error(err.message);
    }
  };

  const { data: staffData, isLoading, isError, error } = useQuery({
    queryKey: ['staff', id],
    queryFn: fetchStaff,
  });

  const editStaff = async (data: any) => {
    try {
      console.log("HELLLOOOOOO")
      const response = await api.put(`${Local.EDIT_STAFF}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Staff edited successfully");
      navigate("/staff-list");  
    } catch (err: any) {
      toast.error(`${err.response?.data?.message || 'Error occurred'}`);
    }
  };

  const staffMutate = useMutation({
    mutationFn: editStaff,
  });

  const staffEditHandler = (values: any) => {
    staffMutate.mutate(values);
    console.log("HYYEYEYY")
  };

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (isError) {
    return (
      <div>Error: {error?.message || 'Error loading staff data'}</div>
    );
  }

  return (
    <div>
      <h2>Edit Staff</h2>
      <Formik
        initialValues={{
          name: staffData?.staffData?.name || '',
          phone: staffData?.staffData?.phone || '',
          email: staffData?.staffData?.email || '',
          gender: staffData?.staffData?.gender || '',
        }}
        validationSchema={validationSchema}
        onSubmit={staffEditHandler}
      >
        {() => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="form-group">
                <label className="block mb-1">Name:</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="form-group">
                <label className="block mb-1">Phone:</label>
                <Field
                  type="text"
                  name="phone"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="form-group">
                <label className="block mb-1">Email:</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="form-group">
                <label className="block mb-1">Gender:</label>
                <Field as="select" name="gender" className="w-full border border-gray-300 rounded-md p-2">
                  <option value="" disabled>Select</option>
                  {['Male', 'Female', 'Others'].map((gender) => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 mt-1" />
              </div>
            </div>

            <div className="flex justify-between">
              <button type="submit" className="btn btn-outline-primary bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
                onClick={() => navigate("/staff-list")}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditStaff;
