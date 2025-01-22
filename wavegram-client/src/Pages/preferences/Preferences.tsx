import React from "react";
import { Formik, Form } from "formik";
import { PreferencesValidationSchema } from "../../validations/preferencesValidation";
import IconBtn from "../../components/common/IconBtn";
import { PreferencesInterface } from "../../interfaces/interfaces";
import InputField from "../../components/common/InputField";
import BackButton from "../../components/common/BackButton";

const Preferences: React.FC = () => {
  return (
    <>
      <h2 className="flex align-middle">
        <BackButton />
        Preferences
      </h2>
      <div className="bg-white rounded-md">
        <div className=" w-[100%] px-2">
          <div className="rounded-md bg-white flex flex-col gap-3 ">
            <Formik
              initialValues={{
                language: "", //dropdown select
                breakfast: "", //time
                lunch: "", //time
                dinner: "", //time
                wakeTime: "", //time
                bedTime: "", //time
                weight: "", //radio buttons kg or lbs
                height: "", //radio buttons inches or cms
                sms: false, //true false slider
                post: false, //true false slider
              }}
              validationSchema={PreferencesValidationSchema}
              onSubmit={async (values: PreferencesInterface) => {
                console.log("dsdsdsdsdds");
                console.log("valuesvalues", values);
                //   await signUpMutataion.mutate(values);
              }}
            >
              {() => (
                <Form>
                  <div className="flex xl:flex-row flex-col gap-3">
                    {/* Language Dropdown */}

                    <InputField
                      fieldName="language"
                      placeholder="Select Language"
                      options={[
                        { value: "english", label: "English" },
                        { value: "spanish", label: "Spanish" },
                        { value: "french", label: "French" },
                        { value: "german", label: "German" },
                      ]}
                      isRequired={true}
                      labelName="Language"
                      type="select"
                    />

                    {/* Breakfast Time Picker */}
                    <InputField
                      fieldName="breakfast"
                      placeholder="Breakfast Time"
                      isRequired={true}
                      labelName="Breakfast Time"
                      type="time"
                    />
                  </div>

                  <div className="flex xl:flex-row flex-col gap-3">
                    {/* Lunch Time Picker */}
                    <InputField
                      fieldName="lunch"
                      placeholder="Lunch Time"
                      isRequired={true}
                      labelName="Lunch Time"
                      type="time"
                    />

                    {/* Dinner Time Picker */}
                    <InputField
                      fieldName="dinner"
                      placeholder="Dinner Time"
                      isRequired={true}
                      labelName="Dinner Time"
                      type="time"
                    />
                  </div>

                  <div className="flex xl:flex-row flex-col gap-3">
                    {/* Wake Time Picker */}
                    <InputField
                      fieldName="wakeTime"
                      placeholder="Wake Time"
                      isRequired={true}
                      labelName="Wake Time"
                      type="time"
                    />

                    {/* Bed Time Picker */}
                    <InputField
                      fieldName="bedTime"
                      placeholder="Bed Time"
                      isRequired={true}
                      labelName="Bed Time"
                      type="time"
                    />
                  </div>

                  <div className="flex xl:flex-row flex-col gap-3 py-4">
                    {/* Weight Unit Radio Button */}
                    <div className="w-full">
                      <label className="block mb-1">Weight</label>
                      <div className="flex gap-4">
                        <label>
                          <input type="radio" name="weight" value="kg" /> KG
                        </label>
                        <label>
                          <input type="radio" name="weight" value="lbs" /> LBS
                        </label>
                      </div>
                    </div>

                    {/* Height Unit Radio Button */}
                    <div className="w-full">
                      <label className="block mb-1">Height</label>
                      <div className="flex items-center gap-4">
                        <label>
                          <input type="radio" name="height" value="inches" />{" "}
                          Inches
                        </label>
                        <label>
                          <input type="radio" name="height" value="cms" /> CMS
                        </label>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <h3 className="py-4">Communication Type</h3>
                  <hr />

                  <div className="flex xl:flex-row flex-col gap-3 py-4">
                    {/* SMS Notification Switch */}
                    <div className="w-full">
                      <label htmlFor="sms" className="mb-1">
                        SMS Notifications
                      </label>
                      <input
                        type="checkbox"
                        id="sms"
                        name="sms"
                        className="switch"
                      />
                    </div>

                    {/* Post Notification Switch */}
                    <div className="w-full">
                      <label htmlFor="post" className="mb-1">
                        Post Notifications
                      </label>
                      <input
                        type="checkbox"
                        id="post"
                        name="post"
                        className="switch"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end my-2">
                    <IconBtn
                      text="Update"
                      type="submit"
                      customClasses="text-white"
                      onClick={() => {
                        // console.log("Clicked");
                      }}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preferences;
