import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be 6 characters long"),
});

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        values
      );
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", response.data.user.id);
      console.log("ID:::::", response.data.user.id);

      setLoginError(null);
      navigate("/products", response.data.user.id)
      
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.response && error.response.data) {
        setLoginError(error.response.data.message || "Login failed");
      } else {
        setLoginError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {loginError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
            {loginError}
          </div>
        )}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 text-sm font-semibold">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email && touched.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 text-sm font-semibold">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password && touched.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-200"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;