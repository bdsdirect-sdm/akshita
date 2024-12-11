import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Local } from '../environment/env';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import * as Yup from 'yup';
import Footer from '../components/Footer';
import logo from "../Assets/title_logo.webp";
import Button from "../components/Button"

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const doctype = localStorage.getItem("doctype");
      navigate("/dashboard");
  }
  }, []);

  const authUser = async (loginData: any) => {
    try {
      const response: any = await api.post(`${Local.LOGIN_USER}`, loginData);
      // console.log("Hello", response);
      if (response.status === 200) {
        if (response.data.user.is_verified) {
          const doctype = response.data.user.doctype;
          localStorage.setItem("doctype", doctype);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.user.firstname + " " + response.data.user.lastname);
          localStorage.setItem("doctor",JSON.stringify(response.data.user));
          
          toast.success("Login Successfully");
          if(doctype === "2") {
            navigate("/dashboard");
          }
          else {
            navigate("/add-address");
          }
        } else {
          localStorage.setItem("email", response?.data?.user?.email);
          localStorage.setItem("OTP", response.data.OTP);
          toast.warn("User not Verified");
          navigate("/verify");
        }
        return response;
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      return;
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[`~!@#$%^&*()"?<>|:{}(),.]/, "Password must contain at least one special character")
  });

  const loginMutate = useMutation({
    mutationFn: authUser,
  });

  const loginSubmit = async (values: any) => {
    loginMutate.mutate(values);
  }

  return (<>

    <div className='flex flex-col'>
      <div className='flex flex-1'>
          <div className='w-1/2 bg-teal-500 flex flex-col flex-1 items-center justify-center  h-screen'>
            <img src={logo} alt="Logo"></img>
            <p className='text-white text-xl font-extrabold'>EYE REFER</p>
          </div>
          
          <div className='w-1/2 flex flex-col items-center justify-center p-14'>
            <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
            <div className="bg-white p-3 rounded shadow-md w-full border">
              
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={loginSubmit}>
                {() => (
                  <Form className='p-8'>
                    <div className="form-group mb-4">
                      <label className="block text font-medium mb-1">Email <span className="text-red-500">*</span></label>
                      <Field name="email" type="email" placeholder="Enter your Email" className="form-control w-full text-sm p-4 border border-gray-300 rounded" />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="form-group mb-4">
                      <label className="block text font-medium mb-1">Password <span className="text-red-500">*</span></label>
                      <Field name="password" type="password" placeholder="Enter your Password" className="form-control w-full text-sm p-4 border border-gray-300 rounded" />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <Button type="submit" className='w-full m-2 py-2 rounded text-center '>Login</Button>
                  </Form>
                )}
              </Formik>
              <div className='text-center text-sm pb-2'>Dont have an account?
                <Link to={'/signup'} className="p-2 text-[#35c0e4]">Signup</Link>
              </div>
            </div>
          </div>
      </div>
    <Footer/>
    </div>
    
    </>
  )
}

export default Login;
