import React from "react";
import { Formik, Form } from "formik";
import { signUpValidationSchema } from "../../validations/signValidation";
import IconBtn from "../../components/common/IconBtn";
import { signupInterface } from "../../interfaces/interfaces";
import InputField from "../../components/common/InputField";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../actions/user";
// import { toast } from "react-toastify";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  // const baseUrl = import.meta.env.VITE_API_URL
  const signUpMutataion = useSignUp();

  return (
    <div className="text-center w-[100%] p-10">
      <div className=" text-textColor text-left font-sans font-medium text-3xl mb-8">
        Sign Up
      </div>
      <hr className="w-10 bg-yellow-600 h-1 rounded" />
      <div className="rounded-md bg-white flex flex-col gap-3 ">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={async (values: signupInterface) => {
            console.log("dsdsdsdsdds");
            console.log("valuesvalues", values);

            await signUpMutataion.mutate(values);
          }}
        >
          {() => (
            <Form>
              <div className="flex xl:flex-row flex-col gap-3">
                <InputField
                  fieldName="firstName"
                  placeholder="Enter first name"
                  isRequired={true}
                  labelName="First name"
                  type="text"
                />
                <InputField
                  fieldName="lastName"
                  placeholder="Enter last name"
                  isRequired={true}
                  labelName="Last name"
                  type="text"
                />

              </div>

              <InputField
                fieldName="email"
                placeholder="Enter email"
                isRequired={true}
                labelName="Email"
                type="email"
              />

              <InputField
                fieldName="phone"
                placeholder="Enter phone"
                isRequired={true}
                labelName="Phone No."
                type="phone"
              />

              {/* password */}
              <InputField
                fieldName="password"
                placeholder="Enter  password"
                isRequired={true}
                labelName="Password"
                type="password"
              />

              {/* confirm password */}
              <InputField
                fieldName="confirmPassword"
                placeholder="Enter confirm password"
                isRequired={true}
                labelName="Confirm password"
                type="password"
              />
              <div className="text-sm text-gray-500 my-2  flex flex-start">
                <button
                  type="button"
                  className="font-bold text-[#B18D4B]"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              </div>

              <div className="flex flex-start my-2 ">
                <IconBtn
                  text="SIGNUP"
                  type="submit"
                  customClasses="text-white"
                  onClick={() => {
                    console.log("Clicked");
                  }}
                />
              </div>

              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
