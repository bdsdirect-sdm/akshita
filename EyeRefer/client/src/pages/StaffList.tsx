import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import { Local } from '../environment/env';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import Button from "../components/Button"
import {queryClient} from "../main"

const StaffList: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]);

  const fetchStaff = async () => {
    try {
      const response = await api.get(`${Local.GET_STAFF_LIST}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (err) {
      toast.error('Error fetching staff data');
      throw new Error(err.message);
    }
  };

  const { data: staffData, error, isLoading, isError } = useQuery({
    queryKey: ['staff'],
    queryFn: fetchStaff,
  });

  const deleteStaff = async (id: string) => {
    // 
      try {
        if (window.confirm("Are you sure you want to delete this staff?")) 
      {await api.delete(`${Local.DELETE_STAFF}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log("HELLOOOOO")
      queryClient.invalidateQueries({ queryKey: ['staff'] })

      toast.success("Staff deleted successfully!");}
        // refetch(); // Refetch the data after deletion
      } catch (err) {
        toast.error("Failed to delete staff.");
      }
    
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center space-x-2">
        <div>Loading...</div>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-danger">
        Error: {error?.message || 'Error loading staff'}
      </div>
    );
  }

  return (
    <div className="m-8">
      <div className='flex justify-between align-items-center'>
        <h1 className="text-2xl font-bold">Staff</h1>
        <Button onClick={() => {navigate("/add-staff")}}>+ Add Staff</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full my-4 border border-gray-300">
          <thead className="bg-white">
            <tr className='bg-white border-y-[1px]'>
              <th scope="col" className="border-y-[1px] px-4 py-4 font-medium text-sm">Staff Name</th>
              <th scope="col" className="border-y-[1px] px-4 py-4 font-medium text-sm">Phone</th>
              <th scope="col" className="border-y-[1px] px-4 py-4 font-medium text-sm">Email</th>
              <th scope="col" className="border-y-[1px] px-4 py-4 font-medium text-sm">Gender</th>
              <th scope="col" className="border-y-[1px] px-4 py-4 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {staffData?.StaffList?.length > 0 ? (
              staffData?.StaffList?.map((staff: any, index: number) => (
                
                <tr key={staff.uuid} className="hover:bg-gray-100">
                  <td className="border-y-[1px] px-4 py-4 text-sm">{staff.name}</td>
                  <td className="border-y-[1px] px-4 py-4 text-sm">{staff.phone}</td>
                  <td className="border-y-[1px] px-4 py-4 text-sm">{staff.email}</td>
                  <td className="border-y-[1px] px-4 py-4 text-sm">{staff.gender}</td>
                  <td className="border-y-[1px] px-4 py-4 text-sm">
                  <button className="btn btn-primary mr-2" onClick={() => { navigate(`/edit-staff/${staff.uuid}`); }}><MdOutlineEdit /></button>
                  <button className="btn btn-danger mr-2" onClick={() => {deleteStaff(staff.uuid)}}><AiOutlineDelete /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No staff found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffList;
