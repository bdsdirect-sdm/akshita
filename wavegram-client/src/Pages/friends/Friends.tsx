import React from 'react'
import BackButton from "../../components/common/BackButton";
import SearchBar from '../../components/SearchBar';
import IconBtn from '../../components/common/IconBtn';
import { friendsData } from '../dashboard/friends';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="flex align-middle">
        <BackButton />
        Friends
      </h2>
      <div className="bg-white rounded-md h-fit w-full">
        <div className='p-4'>
          <div className='flex flex-col sm:flex-row justify-between items-center sm:space-x-4 space-y-4 sm:space-y-0'>
            <SearchBar customClass="w-1/2" />
            
            <IconBtn
              text="Invite Friends"
              type="submit"
              customClasses="w-full sm:w-auto text-white"
              onClick={() => {navigate("/invite-friends")}}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
      {friendsData.map((friend, index) => (
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
      </div>
    </>
  )
}

export default Friends;