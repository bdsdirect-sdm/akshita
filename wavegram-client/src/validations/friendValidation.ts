import * as Yup from 'yup';

export const friendValidationSchema = Yup.object().shape({
  friends: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      fullName: Yup.string().required("Full Name is required"),
      message: Yup.string().required("Message is required")
    })
  )
});
