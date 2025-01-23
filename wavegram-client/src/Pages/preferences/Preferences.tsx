import React from "react";
import { Formik, Form } from "formik";
import { PreferencesValidationSchema } from "../../validations/preferencesValidation";
import IconBtn from "../../components/common/IconBtn";
import { PreferencesInterface } from "../../interfaces/interfaces";
import InputField from "../../components/common/InputField";
import BackButton from "../../components/common/BackButton";
import { GetPreferences, SetPreferences } from "../../actions/user";

const Preferences: React.FC = () => {
  const {data} = GetPreferences();
  const preferencesMutation = SetPreferences();

  const initialValues: PreferencesInterface = {
    language: data?.Preferences?.language || "spanish",
    breakfast: data?.Preferences?.breakfast || "",
    lunch: data?.Preferences?.lunch || "",
    dinner: data?.Preferences?.dinner || "",
    wakeTime: data?.Preferences?.wakeTime || "",
    bedTime: data?.Preferences?.bedTime || "",
    weight: data?.Preferences?.weight || "", // kg or lbs
    height: data?.Preferences?.height || "", // inches or cms
    sms: data?.Preferences?.sms || false, // true/false slider
    post: data?.Preferences?.post || false, // true/false slider
  };

  console.log("REQ", data?.Preferences?.language )
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
            enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={PreferencesValidationSchema}
              onSubmit={async (values: PreferencesInterface) => {
                // console.log("dsdsdsdsdds");
                // console.log("valuesvalues", values);
                  await preferencesMutation.mutate(values);
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
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          id="sms"
                          name="sms"
                          className="peer sr-only"
                        />
                        
                        <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                      </label>
                    </div>

                    {/* Post Notification Switch */}
                    <div className="w-full">
                      <label htmlFor="post" className="mb-2">
                        Post Notifications
                      </label>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          id="post"
                          name="post"
                          className="peer sr-only"
                        />
                        
                        <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                      </label>
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
