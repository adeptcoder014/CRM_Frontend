import * as yup from "yup";

export const registrationValidation = yup.object({
  name: yup.string("Enter Your Name").required("name is required"),
  email: yup.string("Enter your email").required("email is required"),
  phone: yup.string("Enter phone number").required("phone number  is required"),
  roomPreference: yup
    .string("Enter room preference")
    .required("room preference is required"),
});
