// import { useDispatch } from "react-redux";
import { loginInterface, signupInterface } from "../interfaces/interfaces";
import { useMutation } from "@tanstack/react-query";
import { api } from "../apis/apies";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {setUser, setToken, setLoading} from "../Slices/userSlice"

// export const userLogin = (data: any, callback: any) => {
//     return (dispatch: any) => {
//         dispatch(handleLoading(true));
//         ApiClient.post(`${apiUrl}${PORT}${version}/admin/login`, data).then(
//             (response: any) => {
//                 if (response.status === 200 || response.status === 201) {
//                     dispatch(loginSuccess(response));
//                     setAccessToken(response?.token);
//                     if (response?.token) {
//                         setAuthorizationToken(axios, response?.token);
//                         sessionStorage.setItem('token', response?.token)
//                     }
//                     dispatch(handleLoading(false));
//                     return callback(response);
//                 } else if (response.status === 404) {
//                     openNotificationWithIcon('error', response.message);
//                     dispatch(handleLoading(false));
//                     // return callback(response);
//                 } else {
//                     openNotificationWithIcon('error', response.message);
//                     dispatch(handleLoading(false));
//                 }
//             }
//         );
//     };
// };
 

//custom hooks for signUp
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
        onError:(err) =>{
            toast.error(err.message);
            console.log("ERRRRRRRRRR", err)
            dispatch(setLoading(false));

        }
    })
}


// export const useDashboard = () =>{
//     const navigate = useNavigate()
//     const dispatch  = useDispatch();

//     return useMutation({
//         mutationKey: ['otpVerify'],
//         mutationFn: async (data: otpInterface) => {
//             dispatch(setLoading(true))
//             const response = await axios.post(api.dashboardUrl, data);
//             return response.data;
//         },
//         onSuccess:(response) =>{
//             dispatch(setLoading(false))
//             toast.success(response.message)
//             navigate("/login")
//         },
//         onError:(err) =>{
//             toast.error(err.message);
//             dispatch(setLoading(false));
//         }
//     })
// }