import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoginImage from "../../assets/login.jpeg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { LoginAPI } from "../../services/user/userServices";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/slice/authSlice";
import type { Login, LoginResponse } from "../../types/userType";
import { InputField } from "../../ui/auth/InputUI";
import { ButtonUI } from "../../ui/ButtonUI";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Email Field is required"),
  password: Yup.string()
    .required("Password Field is required")
    .min(8, "password should not be less than 8"),
});

function LoginForm() {
  const dispatch = useDispatch();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["Login"],
    mutationFn: LoginAPI,
  });
  const formik = useFormik<Login>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      mutateAsync(values)
        .then((data: LoginResponse) => {
          dispatch(
            loginAction({
              token: data.token,
              email: data.user.email,
              firstName: data.user.firstName,
            })
          );
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              token: data.token,
              email: data.user.email,
              firstName: data.user.firstName,
            })
          );
          formik.resetForm();
        })
        .catch((err: unknown) => console.log(err));
    },
  });
  return (
    <div className="flex justify-center items-center h-[100vh] w-full bg-gray-100">
      <div className="w-full md:w-1/2 h-[100vh] flex items-center pt-[10vh] gap-3 flex-col px-4 lg:px-[100px]">
        <p className="text-blue-950 text-center text-3xl font-bold">
          Welcome Back
        </p>
        <p className="text-gray-400 text-center text-sm">
          Enter your email and password to access your account
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col gap-3 pt-5 pb-2"
        >
          <InputField
            isPending={isPending}
            formik={formik}
            name="email"
            label="Email"
            type="email"
            size="medium"
          />

          <InputField
            isPending={isPending}
            formik={formik}
            name="password"
            label="Password"
            type="password"
            size="medium"
          />
          <Link
            to="/forgot"
            className="text-base text-blue-950 text-right hover:underline"
          >
            forgot password?
          </Link>
          <ButtonUI isPending={isPending} name="Login"/>
        </form>
        {/* the dividing line before and after login with */}
        <div className="w-full flex items-center justify-center my-3">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500 whitespace-nowrap">
            Or Login With
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex gap-3 w-full py-2">
          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<FcGoogle />}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<FaGithub />}
          >
            Github
          </Button>
        </div>
        <div className="flex gap-2">
          <p className="inline text-base">Don't have an account yet?</p>
          <Link
            to="/Register"
            className="text-blue-700 hover:underline text-base"
          >
            Register
          </Link>
        </div>
      </div>
      <div className="hidden md:block w-1/2 h-[100vh]">
        <img
          src={LoginImage}
          alt="Login image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default LoginForm;
