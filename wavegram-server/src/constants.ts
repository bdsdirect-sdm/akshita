export const constantValues = {
    msgType: {
        successStatus: true,
        failedStatus: false,
    },
    msg: {
        doctorAdd: "Doctor created successfully",
        alreadyExist:"Email  already exist",
        invalidCredentials:"Invalid credentials",
        invalidOtp:"Invalid otp",
        userNotExist:"User not exist",
        incorrectPassword:"Your password is incorrect",
        invalidToken:"Invalid  token",
        expiredToken:"Some  thing went wrong please try again",
        loginSuccess: "Login successful",
        userGetAll: "Users fetched successfully",
        changePassword: "Password changed successfully",
        resetPassword: "Password reset successfully",
        patientAlreadyAdd:"Patient  already added",
        passwordChangeEmail: "Password change email sent successfully",
        getProfile: "Profile fetched successfully",
        profileFetch: "Profile fetched successfully",
        profileUpdate: "Profile updated successfully",
        internalServerError  :"Internal server error",
        signUpMessage:"Your account would be activated after varification",
        unAuthorizedUser:"Unaunthorized access control",
        removedOrBlocked: "Your account is currently removed or inactive. Please contact support for further help"
    },

    msgCode: {
        // To be used when no new record is inserted but to display success message
        successCode: 200,
        // To be used when a new record is inserted
        newResourceCreated: 201,
        // To be used if database query returns empty record
        nocontent: 204,
        // To be used if the request is bad, e.g., if we pass record id which does not exist
        badRequest: 400,
        // To be used when the user is not authorized to access the API, e.g., invalid access token
        unAuthorizedUser: 401,
        // To be used when the access token is not valid
        forbidden: 403,
        // To be used if something went wrong
        failureCode: 404,
        // To be used when error occurs while accessing the API
        internalServerError: 500,
        // To be used if a record already exists
        conflictCode: 409,
    },
}
