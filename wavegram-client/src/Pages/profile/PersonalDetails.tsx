import React from "react";
import { Formik, Form } from "formik";
import { PersonalDetailsValidationSchema } from "../../validations/profileValidation";
import IconBtn from "../../components/common/IconBtn";
import { PersonalDetailsInterface } from "../../interfaces/interfaces";
import InputField from "../../components/common/InputField";
// import { useNavigate } from "react-router-dom";

const PersonalDetails = () => {
  return (
    <>
      <div className=" text-center w-[100%] p-4 overflow-y-scroll">
        <div className="rounded-md bg-white flex flex-col gap-3 ">
          <Formik
            initialValues={{
              dob: "",
              gender: "",
              phone: "",
              email: "",
            }}
            validationSchema={PersonalDetailsValidationSchema}
            onSubmit={async (values: PersonalDetailsInterface) => {
              console.log("dsdsdsdsdds");
              console.log("valuesvalues", values);
              //   await signUpMutataion.mutate(values);
            }}
          >
            {() => (
              <Form>
                <div className="flex xl:flex-row flex-col gap-3">
                  <InputField
                    fieldName="dob"
                    placeholder="DOB"
                    isRequired={true}
                    labelName="DOB"
                    type="text"
                  />

                  {/* last Name */}
                  <InputField
                    fieldName="gender"
                    placeholder="Gender"
                    isRequired={true}
                    labelName="Last name"
                    type="text"
                  />

                  {/* <InputFeild fieldName="" placeholder="" isRequired={} labelName="" type=""/> */}
                </div>

                <div className="flex xl:flex-row flex-col gap-3">
                  <InputField
                    fieldName="email"
                    placeholder="Enter Email"
                    isRequired={true}
                    labelName="Email"
                    type="text"
                  />

                  {/* last Name */}
                  <InputField
                    fieldName="phone"
                    placeholder="Enter Phone Number"
                    isRequired={true}
                    labelName="Phone Number"
                    type="text"
                  />

                  {/* <InputFeild fieldName="" placeholder="" isRequired={} labelName="" type=""/> */}
                </div>
                <div className=" flex justify-end my-2 ">
                  <IconBtn
                    text="Update"
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
    </>
  );
};

export default PersonalDetails;
