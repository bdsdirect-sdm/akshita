import React from "react";
import { friendsData } from "./friends";

const MakingWaves = () => {
  return (
    <div className="grid grid-cols-3 gap-10 py-4">
      {friendsData.slice(0, 6).map((friend, index) => (
        <div
          key={index}
          className="flex flex-row space-x-4 border-r-2 justify-start px-8"
        >
          <div className="justify-center items-center">
            <img
              className="h-10 w-10 rounded-full"
              src={friend.profilePic}
              alt={`Profile ${index}`}
            />
          </div>
          <div>
            <span>@{friend.name.replace(/\s+/g, "")}</span>
            <p className="text-[#535C61] overflow-clip">{friend.message}</p>
            <p className="text-yellow-500">Follow</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MakingWaves;
