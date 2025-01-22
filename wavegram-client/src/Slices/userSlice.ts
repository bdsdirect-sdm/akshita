import { createSlice } from "@reduxjs/toolkit";


const intialState = {
    user_type:sessionStorage.getItem("user_type") ? JSON.parse(sessionStorage.getItem("user_type") as string): null,
    token:sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token") as string) :null,
    user:sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("us") as string) : null,
    isLoading:false,
}

const userSlice = createSlice({
    name:"user",
    initialState: intialState,
    reducers:{
        setToken:(state,value) =>{
            state.token = value.payload;
            sessionStorage.setItem("token", JSON.stringify(value.payload))

        },
        setUser:(state,value) =>{
            state.user = value.payload
            sessionStorage.setItem("user", JSON.stringify(value.payload))

        },
        logout:(state) => {
            state.token = null;
            state.user_type = null;
            state.user = null;
            localStorage.clear(); 
            sessionStorage.clear();
        },
        setLoading:(state,value) =>{
            state.isLoading = value.payload;
        }
    }
})

export const {setToken, logout, setUser, setLoading} = userSlice.actions;

export default userSlice.reducer;