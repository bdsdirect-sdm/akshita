import { WaveInterface } from "../interfaces/interfaces";
import { useMutation } from "@tanstack/react-query";
import { api } from "../apis/apies";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {setLoading} from "../Slices/waveSlice"

export const PostWave = () =>{
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    return  useMutation({
        mutationKey: ['wave'],
        mutationFn: async (data:any) => {
            dispatch(setLoading(true));
            
            const  response = await axios.post(api.createWave, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
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