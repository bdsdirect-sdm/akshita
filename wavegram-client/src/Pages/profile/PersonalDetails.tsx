import React from "react";
import { Formik, Form } from "formik";
import { PersonalDetailsValidationSchema } from "../../validations/profileValidation";
import IconBtn from "../../components/common/IconBtn";
import { PersonalDetailsInterface } from "../../interfaces/interfaces";
import InputField from "../../components/common/InputField";
import { GetPersonalDetails, SetPersonalDetails } from "../../actions/user";

const formatDate = (date: string | Date | undefined) => {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateObj.toISOString().split('T')[0]; // Converts date to 'YYYY-MM-DD' format
}

const PersonalDetails = () => {
  const personalDetailsMutation = SetPersonalDetails();
  const { data, isError, isLoading, error } = GetPersonalDetails();
  console.log("TAT", data,  data?.PersonalDetails?.dob)

  const initialValues: PersonalDetailsInterface = {
    dob: formatDate(data?.PersonalDetails?.dob),
    gender: data?.PersonalDetails?.gender || "",
    phone: data?.PersonalDetails?.phone || "",
    email: data?.PersonalDetails?.email || "",
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <div className=" text-center w-[100%] p-4 overflow-y-scroll">
        <div className="rounded-md bg-white flex flex-col gap-3 ">
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={PersonalDetailsValidationSchema}
            onSubmit={async (values: PersonalDetailsInterface) => {
              console.log("Form values submitted: ", values);
                await personalDetailsMutation.mutate(values);
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
                    type="date" // This will allow users to pick a date using the native HTML date picker
                  />

                  <InputField
                    fieldName="gender"
                    placeholder="Gender"
                    isRequired={true}
                    labelName="Gender"
                    type="text"
                  />
                </div>

                <div className="flex xl:flex-row flex-col gap-3">
                  <InputField
                    fieldName="email"
                    placeholder="Enter Email"
                    isRequired={true}
                    labelName="Email"
                    type="text"
                  />
                  <InputField
                    fieldName="phone"
                    placeholder="Enter Phone Number"
                    isRequired={true}
                    labelName="Phone Number"
                    type="text"
                  />
                </div>
                <div className="flex justify-end my-2 ">
                  <IconBtn
                    text="Update"
                    type="submit"
                    customClasses="text-white"
                    onClick={() => {
                      console.log("Update clicked");
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
