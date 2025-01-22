// import { useDispatch } from "react-redux";
import { BasicDetailsInterface, loginInterface, signupInterface, UserDetails } from "../interfaces/interfaces";
import { useMutation } from "@tanstack/react-query";
import { api } from "../apis/apies";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {setUser, setToken, setLoading} from "../Slices/userSlice"

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
            dispatch(setUser(response.user.email))
            dispatch(setLoading(false))
            dispatch(setToken(response.token))
            toast.success(response.message)
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

export const useSetBasicDetails = () =>{
    const dispatch = useDispatch();
    return  useMutation({
        mutationKey: ['basicDetails'],
        mutationFn: async (data: BasicDetailsInterface) => {
            dispatch(setLoading(true));
            const  response = await axios.put(api.updateBasicDetails, data);
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

// export const useGetBasicDetails = ({userId}) =>{
//     const dispatch = useDispatch();
//     return  useMutation({
//         mutationKey: ['basicDetails'],
//         mutationFn: async (data: BasicDetailsInterface) => {
//             dispatch(setLoading(true));
//             const  response = await axios.get(api.updateBasicDetails, data);
//             return response.data;
//         },
//         onSuccess:(response) =>{
//             console.log(response)
//             dispatch(setLoading(false))
//             toast.success(response.message)
//         },
//         onError:(err: any) =>{
//             console.log(err)
//             const res = err.response;

//             toast.error(res.data.message);
//             dispatch(setLoading(false));

//         }
//     })
// }

export const useProfile = () =>{
    const dispatch = useDispatch();
    return  useMutation({
        mutationKey: ['basicDetails'],
        mutationFn: async (data: UserDetails) => {
            dispatch(setLoading(true));
            const  response = await axios.get(api.getBasicDetails);
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