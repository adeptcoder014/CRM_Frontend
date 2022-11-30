import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { adminLoginValidation } from "../validation/adminLogin";
import { login } from "../api/auth/adminLogin";
//=========================================
export const useController = () => {
  const router = useRouter();

  //------------------ ADD_FORM -------------------------------------
  const addForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: adminLoginValidation,
    onSubmit: (values) => {
      add.mutate(values).then((res) => console.log("NEW RES --->", res));
    },
  });

  //------------------- ADD -------------------------------------
  const add = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      console.log("NEW RES --->", res.data.token);
      localStorage.setItem('Token', res.data.token);

      return Swal.fire(
        "Logged in !",
        "Continue with the Admin approval",
        "success"
      ).then(() => router.push("/admin/home"));
    },
    onError: (err) =>
      // console.log("ERROr ---",err)
      Swal.fire("Error !", err.message, "error"),
  });

  return { add, addForm };
};
