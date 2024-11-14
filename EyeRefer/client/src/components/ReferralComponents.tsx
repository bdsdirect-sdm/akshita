import React from 'react';
import logo from '../Assets/title_logo.webp';

// const ReferralComponents = ({ "referralCount", referralCompleteCount, doctorCount, time }) => {
    const ReferralComponents = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg">
      <div className="flex flex-col p-6 border border-gray-200 rounded-lg shadow-md bg-white">
        <div className="flex justify-between">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <p className="text-2xl font-bold">212</p>
        </div>
        {/* <p className="text-2xl font-bold">{referralCount}</p>
        <p className="text-sm text-gray-600">Last update: {time}</p> */}
        <div  className="flex justify-between">
        <h5 className="text-right text-lg font-semibold">{`Referrals placed`}</h5>
        <p className="text-sm text-gray-600">Last update: 5.40</p>
        </div>
      </div>

      <div className="flex flex-col p-4 border border-gray-200 rounded-lg shadow-md bg-white">
        <div className="flex justify-between">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <p className="text-2xl font-bold">212</p>
        </div>
        {/* <p className="text-2xl font-bold">{referralCompleteCount}</p>
        <p className="text-sm text-gray-600">Last update: {time}</p> */}
        <div  className="flex justify-between">
        <h5 className="text-right text-lg font-semibold">{`Referrals completed`}</h5>
        <p className="text-sm text-gray-600">Last update: 5.40</p>
        </div>
      </div>

      <div className="flex flex-col p-4 border border-gray-200 rounded-lg shadow-md bg-white">
        <div className="flex justify-between">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <p className="text-2xl font-bold">212</p>
        </div>
        {/* <p className="text-2xl font-bold">{doctorCount}</p>
        <p className="text-sm text-gray-600">Last update: {time}</p> */}
        <div  className="flex justify-between">
        <h5 className="text-right text-lg font-semibold">{`Doctor OD/MD`}</h5>
        <p className="text-sm text-gray-600">Last update: 5.40</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralComponents;
