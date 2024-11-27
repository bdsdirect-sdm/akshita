import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import Button from './Button';
import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Local } from '../environment/env';
import { toast } from 'react-toastify';    
import { useQuery } from '@tanstack/react-query';  

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  const fetchPatient = async() => {
    try{
      const response = await api.get(`${Local.GET_PATIENT_LIST}?search=${searchQuery}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return response.data;
    }
    catch(err){
      toast.error(`${err}`);
    }
  }
 
  const { data: Patients, error, isLoading, isError } = useQuery({
    queryKey: ['patient'],
    queryFn: fetchPatient,
  })
  console.log("Patientnnsnn", Patients)

  const handleSearch = () => {
    if (query.trim() === "") {
      alert("Please enter a search term");
      return;
    }
    setSearchQuery(query); 
    console.log("QUERYY", searchQuery)
    setQuery("");
  };

  const handleKeyDown = (e:  React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex mt-4">
      <input
        type="text"
        className="border-gray-400 py-3 px-3 w-1/4 rounded focus:border-[#2A99B6] m-4"
        placeholder="Search"
        value={query}
        onChange={(e) => {
            console.log("QUERYYYYYYY", query)
            setQuery(e.target.value)}} 
        onKeyDown={handleKeyDown} //trigger search on Enter key press
      />
      <Button onClick={handleSearch}>
        <IoIosSearch /> Search
      </Button>
    </div>
  );
};

export default Searchbar;