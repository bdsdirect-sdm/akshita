import React from "react";
import { friendsData } from "./friends";
import IconBtn from "../../components/common/IconBtn";

const FriendsDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {friendsData.slice(0, 4).map((friend, index) => (
        <div
          key={index}
          className="flex flex-row space-x-4 justify-between px-8 py-4 bg-[#EEF5F6] rounded-md"
        >
          <div className="flex flex-row space-x-4">
            <div className="justify-center items-center">
              <img
                className="h-10 w-10 rounded-full"
                src={friend.profilePic}
                alt={`Profile of ${friend.name}`}
              />
            </div>
            <div>
              <span>{friend.name}</span>
              <p className="text-[#535C61] text-sm">{friend.email}</p>
            </div>
          </div>
          {/* Button moved to the extreme right */}
          <div className="flex justify-end items-center">
            <IconBtn
              text="Accepted"
              type="submit"
              customClasses="w-full text-white bg-[#49A15C] rounded-3xl text-xs"
              onClick={() => {
                // Handle click event
                console.log(`Friend ${friend.name} accepted`);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsDashboard;
