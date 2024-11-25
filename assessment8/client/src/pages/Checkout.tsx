import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CheckoutProps {
  totalAmount: number;
}

const Checkout: React.FC<CheckoutProps> = () => {
  const backend_url = "http://localhost:5000/checkout"
  const totalCost = localStorage.getItem("totalAmount");
  const cartList = localStorage.getItem("cartList")
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    cardNumber: Yup.string()
      .length(16, "Card number must be 16 digits")
      .matches(/^\d+$/, "Card number must be numeric")
      .required("Card number is required"),
    cvv: Yup.string()
      .length(3, "CVV must be 3 digits")
      .matches(/^\d+$/, "CVV must be numeric")
      .required("CVV is required"),
    expiryDate: Yup.date()
      .min(new Date(), "Expiry date must be in the future")
      .required("Expiry date is required"),
  });

  return (
    <div className="max-w-lg mx-auto mt-8 p-8 border rounded-lg bg-gray-300 shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Checkout</h1>
      <Formik
        initialValues={{
          email: "",
          cardNumber: "",
          cvv: "",
          expiryDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          localStorage.clear();
          
          await axios.post(backend_url, { email: values.email, totalCost : totalCost, cartList })
          .then(()=>{
            navigate("/");
          alert("Payment successful!");
          })
          
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
                Email:
              </label>
              <Field
                id="email"
                type="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="cardNumber" className="block text-lg font-semibold text-gray-700">
                Card Number:
              </label>
              <Field
                id="cardNumber"
                type="text"
                name="cardNumber"
                maxLength={16}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <ErrorMessage name="cardNumber" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-lg font-semibold text-gray-700">
                CVV:
              </label>
              <Field
                id="cvv"
                type="password"
                name="cvv"
                maxLength={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <ErrorMessage name="cvv" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="expiryDate" className="block text-lg font-semibold text-gray-700">
                Expiry Date:
              </label>
              <Field
                id="expiryDate"
                type="date"
                name="expiryDate"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <ErrorMessage name="expiryDate" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
                disabled={isSubmitting}
              >
                Pay Now
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkout;
