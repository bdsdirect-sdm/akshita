import * as Yup from "yup";

export const WaveValidationSchema = Yup.object({
  post: Yup.string().required("Enter your message to proceed!"),
});
