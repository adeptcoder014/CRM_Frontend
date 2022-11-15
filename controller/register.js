import { useQuery, useMutation } from "@tanstack/react-query";
import { register } from "../api/auth/register";
import { getUsers } from "../api/user";
import { registrationValidation } from "../validation/register";
import { useFormik } from "formik";
import Swal from 'sweetalert2';
export const useController = () => {
  //------------------ QUERY -------------------------------------
  const query = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });

  //------------------ ADD_FORM -------------------------------------
  const addForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: 0,
      dob:"",
      idPhoto:"",
      photo:"",
      roomPreference: "",
    },
    validationSchema: registrationValidation,
    onSubmit: (values) => {
      console.log("client payload --",values) 
      add.mutate(values);
    },
  });

  //------------------- ADD -------------------------------------
  const add = useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      query.refetch();
      //   setShowAdd(false);
      //   addForm.resetForm();
      Swal.fire("User Registered !", "Please wait for the Admin's Apporval", "success");
    },
    onError: (err) => swal("Error !", err.message, "error"),
  });

  return { query, add, addForm };
};
