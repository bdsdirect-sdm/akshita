import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../actions/user";
import InputField from "../../components/common/InputField";
import IconBtn from "../../components/common/IconBtn";
import { loginInterface } from "../../interfaces/interfaces";
import { loginValidationSchema } from "../../validations/signValidation";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  return (
    <div className=" w-[100%] p-32 flex flex-col">
      <div className="text-textColor text-left font-sans font-medium text-3xl mb-8">
        Log In
      </div>
      <hr className="w-10 bg-yellow-600 h-1 rounded" />
      <div className="rounded-md bg-white flex flex-col gap-3">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={async (values: loginInterface) => {
            loginMutation.mutate(values);
          }}
        >
          {() => (
            <Form>
              <InputField
                fieldName="email"
                placeholder="User email"
                isRequired={true}
                labelName="User email"
                type="email"
              />

              <InputField
                fieldName="password"
                placeholder="Password"
                isRequired={true}
                labelName="Password"
                type="password"
              />

              <div className="text-sm text-gray-500 my-2 flex flex-start">
                <button
                  type="button"
                  className="font-bold text-[#B18D4B]"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign up
                </button>
              </div>

              <div className="flex flex-start my-2">
                <IconBtn
                  text="LOGIN"
                  type="submit"
                  customClasses="text-white"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
