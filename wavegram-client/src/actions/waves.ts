import {  } from "../interfaces/interfaces";
import { useMutation } from "@tanstack/react-query";
import { api } from "../apis/apies";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {setLoading} from "../Slices/waveSlice"

export const usePostWave = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ['wave'],
        mutationFn: async (data: any) => {
            dispatch(setLoading(true));
            const  response = await axios.post(api.createWave, data);

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