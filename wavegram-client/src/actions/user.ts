// import { useDispatch } from "react-redux";
import { BasicDetailsInterface, loginInterface, PasswordChangeInterface, PersonalDetailsInterface, PreferencesInterface, signupInterface } from "../interfaces/interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../apis/apies";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setLoading, setProfile } from "../Slices/userSlice"

export const useSignUp = () =>{
    const navigate = useNavigate()
    // const dispatch = useDispatch();

    return useMutation({
        mutationKey: ['signup'],
        mutationFn: async (data: signupInterface) => {
            const  response = await axios.post(api.signUpUrl, data);
            return response.data;
        },

        onSuccess:(response) => {
            toast.info("Registration done")
            navigate("/login",{
                state: {email: response.data.email}
            })
        },

        onError:(err: any) =>{
            // console.log("JJJJJJJJJJJJJJJ", err)
            toast.error(err.response.data.message)

        },

        
    })
}

export const useLogin = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    return  useMutation({
        mutationKey: ['login'],
        mutationFn: async (data: loginInterface) => {
            dispatch(setLoading(true));
            const  response = await axios.post(api.loginUrl, data);
            return response.data;
        },
        onSuccess:(response) =>{
            console.log(response)
            dispatch(setLoading(false))
            dispatch(setToken(response.token))
            dispatch(setProfile(response.user));
            toast.success(response.message)
            console.log(response.user)
            navigate("/dashboard") 

            // console.log("RESHIH", response)

        },
        onError:(err: any) =>{
            console.log(err)
            const res = err.response;

            toast.error(res.data.message);
            dispatch(setLoading(false));

        }
    })
}

export const SetBasicDetails = () =>{
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    return  useMutation({
        mutationKey: ['basicDetails'],
        mutationFn: async (data: BasicDetailsInterface) => {
            dispatch(setLoading(true));
            
            const  response = await axios.put(api.updateBasicDetails, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        },
        onSuccess:(response) =>{
            console.log(response)
            dispatch(setLoading(false))
            toast.success(response.message)
        },
        onError:(err: any) =>{
            console.log(err)
            const res = err.response;

            toast.error(res.data.message);
            dispatch(setLoading(false));

        }
    })
}

export const GetBasicDetails = () =>{
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token); 
    return  useQuery({
        queryKey: ['basicDetails'],
        queryFn: async () => {
            dispatch(setLoading(true));
            const response = await axios.get(api.getBasicDetails,  {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }
    })
}

export const GetPersonalDetails = () =>{
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token); 
    return  useQuery({
        queryKey: ['personalDetails'],
        queryFn: async () => {
            dispatch(setLoading(true));
            const response = await axios.get(api.getPersonalDetails,  {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }
    })
}

export const SetPersonalDetails = () =>{
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    return  useMutation({
        mutationKey: ['personalDetails'],
        mutationFn: async (data: PersonalDetailsInterface) => {
            dispatch(setLoading(true));
            
            const  response = await axios.put(api.updatePersonalDetails, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        },
        onSuccess:(response) =>{
            console.log(response)
            dispatch(setLoading(false))
            toast.success(response.message)
        },
        onError:(err: any) =>{
            console.log(err)
            const res = err.response;

            toast.error(res.data.message);
            dispatch(setLoading(false));

        }
    })
}

export const SetPassword = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token);
    return  useMutation({
        mutationKey: ['personalDetails'],
        mutationFn: async (data: PasswordChangeInterface) => {
            dispatch(setLoading(true));
            
            const  response = await axios.put(api.changePasswordUrl, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        },
        onSuccess:(response) =>{
            console.log(response)
            dispatch(setLoading(false))
            
            toast.success(response.message)
            navigate("/dashboard")
        },
        onError:(err: any) =>{
            console.log(err)
            const res = err.response;

            toast.error(res.data.message);
            dispatch(setLoading(false));

        }
    })
}

export const GetPreferences = () =>{
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token); 
    return  useQuery({
        queryKey: ['preferences'],
        queryFn: async () => {
            dispatch(setLoading(true));
            const response = await axios.get(api.getPreferences,  {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }
    })
}

export const SetPreferences = () =>{
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    return  useMutation({
        mutationKey: ['preferences'],
        mutationFn: async (data: PreferencesInterface) => {
            dispatch(setLoading(true));
            
            const  response = await axios.put(api.updatePreferences, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        },
        onSuccess:(response) =>{
            console.log(response)
            dispatch(setLoading(false))
            toast.success(response.message)
        },
        onError:(err: any) =>{
            console.log(err)
            const res = err.response;

            toast.error(res.data.message);
            dispatch(setLoading(false));

        }
    })
}