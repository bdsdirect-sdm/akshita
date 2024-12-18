import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { Local } from '../environment/env';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import logo from "../Assets/title_logo.webp";
import Footer from '../components/Footer';

const Verify: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Loading state for the button

    useEffect(() => {
        if (!localStorage.getItem('OTP')) {
            console.log('OTP not found in localStorage');
            // navigate('/login'); 
        } else {
            toast.info("OTP sent Successfully");
        }

        return () => {
            localStorage.removeItem('OTP');
        };
    }, [navigate]);

    const OTP: string | null = localStorage.getItem("OTP");
    const email: string | null = localStorage.getItem("email");

    const verifyUser = async () => {
        console.log('Verifying user with email:', email); 
        if (!email) throw new Error("Email is missing from localStorage");

        try {
            const response = await api.put(`${Local.VERIFY_USER}`, { email });
            console.log('API response:', response); 
            return response;
        } catch (error) {
            console.error('API call failed:', error);
            throw new Error('Verification failed');
        }
    };

    const validationSchema = Yup.object().shape({
        otp: Yup.string().required("OTP is required").test("OTP Matched", "OTP Mismatch", (value: string) => {
            return value === OTP;
        })
    });

    const verifyMutation = useMutation({
        mutationFn: verifyUser,
        onSuccess: () => {
            toast.success("Verification Successful");
            localStorage.removeItem('OTP');  // Remove OTP from localStorage after successful verification
            navigate('/Login');
        },
        onError: (error) => {
            console.error('Mutation error:', error);
            toast.error(`Error: ${error.message}`);
        }
    });

    const handleSubmit = (values: any) => {
        if (values.otp === OTP) {
            toast.success("OTP Matched");
            setIsLoading(true); // Set loading state to true
            console.log('Submitting OTP to server...');
            verifyMutation.mutate(); // Trigger the mutation
        } else {
            toast.error("Invalid OTP");
        }
    };

    return (
        <div>
            <div className='flex h-screen'>
                <div className='w-1/2 bg-teal-500 flex items-center justify-center'>
                    <img src={logo} alt="Logo" />
                    <p className='text-white text-xl font-extrabold'>EYE REFER</p>
                </div>

                <div className='w-1/2 flex items-center justify-center'>
                    <div className="bg-white p-3 rounded shadow-md w-96">
                        <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Account</h2>
                        <Formik
                            initialValues={{
                                otp: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                            {() => (
                                <Form className='p-8'>
                                    <div className="form-group mb-4">
                                        <label className="block text-sm font-medium mb-1">OTP:</label>
                                        <Field type="text" name="otp" className="form-control w-full p-2 border border-gray-300 rounded" />
                                        <ErrorMessage name="otp" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className={`w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 ${isLoading ? 'cursor-wait opacity-50' : ''}`}
                                        disabled={isLoading}>
                                        {isLoading ? 'Verifying...' : 'Submit'}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Verify;
