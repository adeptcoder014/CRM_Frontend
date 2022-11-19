import { useQuery, useMutation } from "@tanstack/react-query";
import { register } from "../api/auth/register";
import { getUsers } from "../api/user";
import { registrationValidation } from "../validation/register";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
//=========================================
export const useController = () => {
  const router = useRouter();
  
  //------------------ ADD_FORM -------------------------------------
  const addForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      dob: "",
      idPhoto: "",
      photo: "",
      roomPreference: "",
    },
    validationSchema: registrationValidation,
    onSubmit: (values) => {
      console.log("client payload --", values);
      add.mutate(values);
    },
  });

  //------------------- ADD -------------------------------------
  const add = useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      query.refetch();
      Swal.fire(
        "User Registered !",
        "Please wait for the Admin's Apporval",
        "success"
      );
      router.push("/admin/home");
    },
    onError: (err) =>
      Swal.fire("Error !", err.response.data.errors? (err.response.data.errors.phone.message) : (err.response.data), "error"),

  });

  return {  add, addForm };
};
