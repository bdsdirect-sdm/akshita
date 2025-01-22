import React from "react";
import { Formik, Form } from "formik";
import { BasicDetailsValidationSchema } from "../../validations/profileValidation";
import IconBtn from "../../components/common/IconBtn";
import { BasicDetailsInterface } from "../../interfaces/interfaces";
import InputField from "../../components/common/InputField";
// import { useNavigate } from "react-router-dom";

const BasicDetails = () => {
  // const navigate = useNavigate();
  return (
    <>
      <div className=" text-center w-[100%] p-4 overflow-scroll">
        <div className="rounded-md bg-white flex flex-col gap-3 ">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              phone: "",
              email: "",
              address: "",
              city: "",
              state: "",
              zip: "",
            }}
            validationSchema={BasicDetailsValidationSchema}
            onSubmit={async (values: BasicDetailsInterface) => {
              console.log("dsdsdsdsdds");
              console.log("valuesvalues", values);
              //   await signUpMutataion.mutate(values);
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

                  {/* last Name */}
                  <InputField
                    fieldName="lastName"
                    placeholder="Enter last name"
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

                <div className="flex xl:flex-row flex-col gap-3">
                  <InputField
                    fieldName="address"
                    placeholder="Enter Address"
                    isRequired={true}
                    labelName="Address"
                    type="text"
                  />

                  {/* last Name */}
                  <InputField
                    fieldName="city"
                    placeholder="Enter City"
                    isRequired={true}
                    labelName="City"
                    type="text"
                  />

                  {/* <InputFeild fieldName="" placeholder="" isRequired={} labelName="" type=""/> */}
                </div>

                <div className="flex xl:flex-row flex-col gap-3">
                  <InputField
                    fieldName="state"
                    placeholder="Enter State"
                    isRequired={true}
                    labelName="State"
                    type="text"
                  />

                  {/* last Name */}
                  <InputField
                    fieldName="zip"
                    placeholder="Enter Zip Code"
                    isRequired={true}
                    labelName="zip"
                    type="text"
                  />

                  {/* <InputFeild fieldName="" placeholder="" isRequired={} labelName="" type=""/> */}
                </div>

                <div className="flex justify-end my-2 ">
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

export default BasicDetails;
