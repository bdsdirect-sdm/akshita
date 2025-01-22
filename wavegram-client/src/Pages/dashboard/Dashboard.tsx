import React from "react";
import MakingWaves from "./MakingWaves";
import Friends from "./FriendsDashboard";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="bg-white rounded-md h-fit overflow-y-auto">
        <div className="w-[100%] px-2">
          <h2 className="p-4">Making Waves</h2>
          <MakingWaves />
        </div>
      </div>

      <div className="bg-white rounded-md h-fit overflow-y-auto mt-6">
        <div className="w-[100%] px-2">
          <h2 className="p-4">Friends</h2>
          <Friends />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
