import { Formik, Form } from "formik";
import { BasicDetailsValidationSchema } from "../../validations/profileValidation";
import IconBtn from "../../components/common/IconBtn";
import { BasicDetailsInterface } from "../../interfaces/interfaces";
import InputField from "../../components/common/InputField";
import { SetBasicDetails, GetBasicDetails } from "../../actions/user";

const BasicDetails = () => {
  const basicDetailsMutation = SetBasicDetails();
  const { data, isLoading, isError, error } = GetBasicDetails();

  const initialValues: BasicDetailsInterface = {
    firstName: data?.BasicDetails?.firstName,
    lastName: data?.BasicDetails?.lastName,
    phone: data?.BasicDetails?.phone,
    email: data?.BasicDetails?.email,
    address: data?.BasicDetails?.address,
    city: data?.BasicDetails?.city,
    state: data?.BasicDetails?.state,
    zip: data?.BasicDetails?.zip,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="text-center w-[100%] p-4 overflow-scroll">
      <div className="rounded-md bg-white flex flex-col gap-3">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues || null}
          validationSchema={BasicDetailsValidationSchema}
          onSubmit={async (values: BasicDetailsInterface) => {
            // console.log("Form values submitted: ", values);
            await basicDetailsMutation.mutate(values);  // Update basic details via mutation
          }}
        >
          {() => (
            <Form>
              <div className="flex flex-row gap-3">
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

              <div className="flex xl:flex-row flex-col gap-3">
                <InputField
                  fieldName="address"
                  placeholder="Enter Address"
                  isRequired={true}
                  labelName="Address"
                  type="text"
                />
                <InputField
                  fieldName="city"
                  placeholder="Enter City"
                  isRequired={true}
                  labelName="City"
                  type="text"
                />
              </div>

              <div className="flex xl:flex-row flex-col gap-3">
                <InputField
                  fieldName="state"
                  placeholder="Enter State"
                  isRequired={true}
                  labelName="State"
                  type="text"
                />
                <InputField
                  fieldName="zip"
                  placeholder="Enter Zip Code"
                  isRequired={true}
                  labelName="Zip"
                  type="text"
                />
              </div>

              <div className="flex justify-end my-2 ">
                <IconBtn
                  text="Update"
                  type="submit"
                  customClasses="text-white"
                  // onClick={() => {
                  //   console.log("Update clicked");
                  // }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BasicDetails;
