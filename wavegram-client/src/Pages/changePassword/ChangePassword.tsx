import BackButton from '../../components/common/BackButton'
import { Form, Formik } from 'formik';
import InputField from '../../components/common/InputField';
import IconBtn from '../../components/common/IconBtn';
import { PasswordChangeValidationSchema } from '../../validations/passwordChangeValidation';
import { PasswordChangeInterface } from '../../interfaces/interfaces';
import { SetPassword } from '../../actions/user';

const ChangePassword = () => {
  const passwordMutation = SetPassword();
  
  return (
    <>
        <h2 className="flex align-middle">
            <BackButton />
            Change Passwords
      </h2>
      <div className=" text-center w-[100%] p-4 bg-white rounded-md">
        <div className="flex flex-col gap-3 p-4 w-1/2">
          <Formik
            initialValues={{ 
              oldPassword: "",
              newPassword: "",
              confirmPassword: ""
            }}
            validationSchema={PasswordChangeValidationSchema}
            onSubmit={async (values: PasswordChangeInterface) => {
              console.log("dsdsdsdsdds");
              console.log("valuesvalues", values);
                await passwordMutation.mutate(values);
                 
            }}
          >
            {() => (
              <Form>
                <div className="flex flex-col gap-3">
                  <InputField
                    fieldName="oldPassword"
                    placeholder="Old Password"
                    isRequired={true}
                    labelName="Old Password"
                    type="text"
                  />

                  <InputField
                    fieldName="newPassword"
                    placeholder="New Password"
                    isRequired={true}
                    labelName="New Password"
                    type="text"
                  />
                  <InputField
                    fieldName="confirmPassword"
                    placeholder="Confirm Password"
                    isRequired={true}
                    labelName="Confirm Password"
                    type="text"
                  />

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
          <div>
            <img/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePassword