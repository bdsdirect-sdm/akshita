import React from "react";
import { Formik, Form, FieldArray } from "formik";
// import { useNavigate } from "react-router-dom";
// import { useLogin } from "../../actions/user";
import InputField from "../../components/common/InputField";
import IconBtn from "../../components/common/IconBtn";
import { FriendInterface } from "../../interfaces/interfaces";
import { friendValidationSchema } from "../../validations/friendValidation";
import BackButton from "../../components/common/BackButton";
import { useInviteFriend } from "../../actions/friends";

interface friend {
  friends: FriendInterface[];
}

const initialValues: friend = {
  friends: [
    {
      fullName: "",
      email: "",
      message: "",
    },
  ],
};

const InviteFriends: React.FC = () => {
    
      const inviteFriendMutation = useInviteFriend();
      const { data } = inviteFriendMutation;

  return (
    <>
      <h2 className="flex items-center mb-6">
        <BackButton />
        <span className="ml-4 text-2xl font-semibold">Friends</span>
      </h2>
      <p className="p-4 pt-0 text-gray-800">
        Invite some friends, show them your Waves and let's see what they can
        do!
      </p>
      <div className="bg-white rounded-md h-fit">
        <div className="w-full p-4">
        <Formik
          initialValues={initialValues}
          validationSchema={friendValidationSchema}
          onSubmit={ (values: friend) => {
            console.log("HELLOOOO"); // This should be reached now
            console.log("Submitted Values:", values);
            // Now you can invoke your mutation
            inviteFriendMutation.mutate(values);
          }}
        >
          {({ values }) => (
            <Form>
              <FieldArray name="friends">
                {({ remove, push }) => (
                  <div>
                    {values.friends.length > 0 &&
                      values.friends.map((friend, index) => (
                        <div key={index} className="mb-4">
                          <p>Friend</p>
                          <div>
                            <div className="flex flex-row space-x-4">
                              <InputField
                                fieldName={`friends[${index}].fullName`}
                                placeholder="Full Name"
                                isRequired={true}
                                labelName="Full Name"
                                type="text"
                              />

                              <InputField
                                fieldName={`friends[${index}].email`}
                                placeholder="User email"
                                isRequired={true}
                                labelName="Email Address"
                                type="email"
                              />
                            </div>

                            <InputField
                              fieldName={`friends[${index}].message`}
                              placeholder="Message"
                              isRequired={true}
                              labelName="Message"
                              type="text"
                            />
                          </div>

                          {values.friends.length > 1 && (
                            <div className="flex justify-end mt-2">
                              <button
                                type="button"
                                className="text-red-500 font-semibold"
                                onClick={() => remove(index)}
                              >
                                X Remove
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        className="text-[#3E5677] font-semibold"
                        onClick={() =>
                          push({
                            fullName: "",
                            email: "",
                            message: "",
                          })
                        }
                      >
                        + Add More
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>

              <div className="flex justify-end mt-6">
                <IconBtn
                  text="Invite Friends"
                  type="submit"  
                  customClasses="w-full sm:w-auto text-white"
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

export default InviteFriends;
