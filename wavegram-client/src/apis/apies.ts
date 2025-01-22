const BASE_URL = import.meta.env.VITE_API_URL

export const api = {
    signUpUrl: BASE_URL+"/signup",
    loginUrl:  BASE_URL+"/login",
    // dashboardUrl: BASE_URL+"/dashboard",
    changePasswordUrl: BASE_URL+"/change-password",
    updatePersonalDetails: BASE_URL+"/update-personal-details",
    updateBasicDetails: BASE_URL+"/update-basic-details",
    changePicture: BASE_URL+"/change-picture",
    updatePreferences: BASE_URL+"/update-preferences",
    createWave: BASE_URL+"/create-wave", //(done)
    getBasicDetails: BASE_URL+"/basic-details",
    getPersonalDetails: BASE_URL+"/personal-details",
    getPreferences: BASE_URL+"/preferences",
}