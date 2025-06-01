import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InputField } from "../../ui/InputUI";
import { ButtonUI } from "../../ui/ButtonUI";
import {
  encrypt,
  generateUserKey,
} from "../../utils/encryptAndDecryptPassword";
import { EditPasswordAPI } from "../../services/password/passwordServices";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetUserAPI } from "../../services/user/userServices";

interface RootState {
  auth: { masterSecrets: string };
}

const validationSchema = Yup.object({
  email: Yup.string().email().required("Email Field is required"),
  password: Yup.string().required("Password Field is required"),
  url: Yup.string().url(),
  notes: Yup.string(),
  title: Yup.string().required("Title field is required"),
  category: Yup.string().required("Category field is required"),
});

function EditPassword() {
  const masterSecret = useSelector(
    (state: RootState) => state.auth.masterSecrets
  );

  // const

  const { data } = useQuery({
    queryKey: ["GetUser"],
    queryFn: GetUserAPI,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["EditPassword"],
    mutationFn: EditPasswordAPI,
  });
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const key = await generateUserKey({
          masterSecret,
          userId: data.user._id,
          salt: data.user.salt,
        });
        const encrypted = await encrypt({ password: values.password, key });
        const response = await mutateAsync({
          encryptedPassword: encrypted.data,
          iv: encrypted.iv,
        });
        toast.success("Password Added Successfully");
        formik.resetForm();
        console.log(response.data);
      } catch (error) {
        toast.error(`An error occurred ${error}`);
      }
    },
  });
  return (
    <div className="flex justify-center items-center min-h-[100vh] w-full bg-gray-100">
      <div className="w-full md:w-1/2 h-fit flex items-center pt-4 gap-3 flex-col px-4 lg:px-[100px]">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col gap-3 pt-5 pb-2 bg-white px-4 rounded-lg shadow"
        >
          <p className="text-blue-950 text-center text-3xl font-bold">
            Change your password
          </p>
          <p className="text-gray-400 text-center text-sm">
            Make Changes to your password
          </p>
          <InputField
            isPending={isPending}
            formik={formik}
            name="password"
            label="Password"
            type="password"
            size="medium"
            helperText="Enter the password you want to store securely"
          />

          <ButtonUI isPending={isPending} name="Edit Password" />
        </form>
      </div>
    </div>
  );
}

export default EditPassword;
