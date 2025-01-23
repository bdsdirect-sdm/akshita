import { createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "../interfaces/interfaces";

const initialProfile: UserDetails = {
    id: 0,  
    profilePhoto: null,  
    firstName: '',  
    lastName: '',  
    email: '',  
    phone: '',  
    gender: 'Male',  
    address: '', 
    state: '', 
    city: '',  
    zip: '',  
    password: '',  
    isDeleted: false, 
    isActive: true, 
    status: true,  
}

const initialState = {
    token: sessionStorage.getItem("token")
        ? JSON.parse(sessionStorage.getItem("token") as string)
        : null,
    profile: initialProfile, 
    isLoading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, value) => {
            state.token = value.payload;
            sessionStorage.setItem("token", JSON.stringify(value.payload)); 
        },
        setProfile: (state, action) => {
            const { dob, ...rest } = action.payload;
            state.profile = {
              ...rest,
              dob: dob ? new Date(dob).toISOString() : null,  // Convert Date to ISO string
            };
          },
        logout: (state) => {
            state.token = null;
            state.profile = initialProfile;
            localStorage.clear();
            sessionStorage.clear();
        },
        setLoading: (state, value) => {
            state.isLoading = value.payload;
        },
    },
});

export const { setToken, setProfile, logout, setLoading } =
    userSlice.actions;

export default userSlice.reducer;
