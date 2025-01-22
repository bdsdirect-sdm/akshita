import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    localStorage.clear();
    navigate("/login");
};