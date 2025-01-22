import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import PersonalDetails from "./PersonalDetails";
import BackButton from "../../components/common/BackButton";

const Profile: React.FC = () => {
  const [details, setDetails] = useState(<BasicDetails />);
  const [activeTab, setActiveTab] = useState("basic");
  const name = sessionStorage.getItem("name");
  const pf = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

  return (
    <>
      <div className="">
        <h2 className="flex align-middle">
          <BackButton />
          Profile
        </h2>
        <div className="bg-[#C5B084] rounded-md w-full h-36 flex flex-row">
          <div className="flex flex-row p-8">
            <img className="rounded-full w-36 h-36" src={pf} alt="pfp" />
          </div>

          <div className="flex flex-row items-center justify-start  flex-1">
            <h3 className="text-white">Upload a New Photo</h3>
          </div>

          <div className="flex flex-row items-center justify-end p-8">
            <button className="bg-white text-[#3E5677] px-5 py-2 rounded font-semibold">
              Change Picture
            </button>
          </div>
        </div>

        <h2 className="mt-10">Change Information</h2>
        <div className="bg-white rounded-md h-fit">
          <div className="flex space-x-8 px-4">
            <button
              className={`text-[#3E5677] pt-4 font-semibold ${
                activeTab === "basic" ? "border-b-4 border-[#3E5677]" : ""
              }`}
              onClick={() => {
                setDetails(<BasicDetails />);
                setActiveTab("basic");
              }}
            >
              Basic Details
            </button>
            <button
              className={`text-[#3E5677] pt-4 font-semibold ${
                activeTab === "personal" ? "border-b-4 border-[#3E5677]" : ""
              }`}
              onClick={() => {
                setDetails(<PersonalDetails />);
                setActiveTab("personal");
              }}
            >
              Personal Details
            </button>
          </div>
          <div>{details}</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
