/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  fname: Yup.string().required("First Name is required"),
  lname: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  image: Yup.mixed()
    .required("Profile photo is required")
    .test("fileType", "Only .png and .jpeg files are allowed", (value: any) => {
      return value && ["image/png", "image/jpeg"].includes(value.type);
    }),
  logo: Yup.mixed()
    .required("Logo is required")
    .test("fileType", "Only .png and .jpeg files are allowed", (value: any) => {
      return value && ["image/png", "image/jpeg"].includes(value.type);
    }),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  company: Yup.string().required("Company Name is required"),
  address: Yup.string().required("Company Address is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:5000";

  const handleSignup = async (formdata: any) => {
    try {
      const response = await axios.post(
        `${baseUrl}/signup`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    //   alert("User created, please check your email for a password");
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <Formik
        initialValues={{
          fname: "",
          lname: "",
          email: "",
          phone: "",
          password: "",
          image: null,
          logo: null
        }}
        validationSchema={validationSchema}
        onSubmit={(values: any) => {
          const formdata: any = new FormData();
          formdata.append("fname", values.fname);
          formdata.append("lname", values.lname);
          formdata.append("email", values.email);
          formdata.append("phone", values.phone);
          formdata.append("company", values.company);
          formdata.append("address", values.address);

          if (values.image) {
            formdata.append("image", values.image);
            formdata.append("logo", values.logo);
          }

          handleSignup(formdata);
        }}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="bg-pink p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                First Name:
              </label>
              <Field
                className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.fname && touched.fname
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                name="fname"
              />
              {errors.fname && touched.fname && (
                <div className="text-red-500 text-sm">{errors.fname}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Last Name:
              </label>
              <Field
                className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.lname && touched.lname
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                name="lname"
              />
              {errors.lname && touched.lname && (
                <div className="text-red-500 text-sm">{errors.lname}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <Field
                className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                name="email"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo:
              </label>
              <input
                type="file"
                name="image"
                className="mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                onChange={(event) => {
                  setFieldValue(
                    "image",
                    event.currentTarget.files ? event.currentTarget.files[0] : null
                  );
                }}
              />
              {errors.image && touched.image && (
                <div className="text-red-500 text-sm">{errors.image}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Logo:
              </label>
              <input
                type="file"
                name="logo"
                className="mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                onChange={(event) => {
                  setFieldValue(
                    "logo",
                    event.currentTarget.files ? event.currentTarget.files[0] : null
                  );
                }}
              />
              {errors.logo && touched.logo && (
                <div className="text-red-500 text-sm">{errors.logo}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone:
              </label>
              <Field
                className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.phone && touched.phone
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                name="phone"
              />
              {errors.phone && touched.phone && (
                <div className="text-red-500 text-sm">{errors.phone}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Company:
              </label>
              <Field
                className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.company && touched.company
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                name="company"
              />
              {errors.company && touched.company && (
                <div className="text-red-500 text-sm">{errors.company}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address:
              </label>
              <Field
                className={`mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.address && touched.address
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                name="address"
              />
              {errors.address && touched.address && (
                <div className="text-red-500 text-sm">{errors.address}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 my-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              Register
            </button>

            <button
              type="button"
              onClick={() => { navigate("/login"); }}
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
