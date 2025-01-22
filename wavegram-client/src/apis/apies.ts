const BASE_URL = import.meta.env.VITE_API_URL

export const api = {
    signUpUrl: BASE_URL+"/signup",
    loginUrl:  BASE_URL+"/login",
    dashboardUrl: BASE_URL+"/dashboard",
    changePasswordUrl: BASE_URL+"/change-password"
}