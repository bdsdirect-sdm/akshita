import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../apis/apies";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {setLoading} from "../Slices/waveSlice"
import { FriendInterface } from "../interfaces/interfaces";

export const useInviteFriend = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token);
    return  useMutation({
        mutationKey: ['friend'],
        mutationFn: async (data: FriendInterface) => {
            dispatch(setLoading(true));
            
            const  response = await axios.post(`${api.inviteFriend}?token=
                ${}`, data, {
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
            // navigate("/dashboard")
        },
        onError:(err: any) =>{
            console.log(err)
            const res = err.response;

            toast.error(res.data.message);
            dispatch(setLoading(false));

        }
    })
}