import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InputField } from "../../ui/InputUI";
import { ButtonUI } from "../../ui/ButtonUI";
import {
  encrypt,
  generateUserKey,
} from "../../utils/encryptAndDecryptPassword";
import { AddPasswordAPI } from "../../services/password/passwordServices";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { PasswordFormValues } from "../../types/passwordType";
import { GetUserAPI } from "../../services/user/userServices";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Email Field is required"),
  password: Yup.string().required("Password Field is required"),
  url: Yup.string().url(),
  notes: Yup.string(),
  title: Yup.string().required("Title field is required"),
  category: Yup.string().required("Category field is required"),
});

interface RootState {
  auth: { masterSecret: string };
}

function AddPassword() {
  const masterSecret = useSelector(
    (state: RootState) => state.auth.masterSecret
  );

  if (!masterSecret) {
    console.log("NO master secret");
  }

  const { data } = useQuery({
    queryKey: ["GetUser"],
    queryFn: GetUserAPI,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["AddPassword"],
    mutationFn: AddPasswordAPI,
  });
  const formik = useFormik<PasswordFormValues>({
    initialValues: {
      email: "",
      password: "",
      url: "",
      notes: "",
      title: "",
      category: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(data.user);
        const key = await generateUserKey({
          masterSecret,
          userId: data.user._id,
          salt: data.user.salt,
        });
        const encrypted = await encrypt({ password: values.password, key });
        const response = await mutateAsync({
          email: values.email,
          notes: values.notes,
          url: values.url,
          title: values.title,
          encryptedPassword: encrypted.data,
          iv: encrypted.iv,
          category: values.category,
        });
        toast.success("Password Added Successfully");
        formik.resetForm();
        console.log(response.data);
      } catch (error) {
        toast.error(`An error occurred ${error}`);
        console.log(error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-[100vh] w-full bg-gray-100">
      <div className="w-full md:w-1/2 h-fit flex items-center pt-4 gap-3 flex-col px-4 lg:px-[100px]">
        <p className="text-blue-950 text-center text-3xl font-bold">
          Add a New Password
        </p>
        <p className="text-gray-400 text-center text-sm">
          Fill in the details below to securely save your password
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
            helperText="Enter the email associated with this account"
          />

          <InputField
            isPending={isPending}
            formik={formik}
            name="title"
            label="Title"
            type="text"
            size="medium"
            helperText="Give this password a title (e.g., Gmail, Netflix, Work Email)"
          />

          <InputField
            isPending={isPending}
            formik={formik}
            name="url"
            label="Url"
            type="url"
            size="medium"
            helperText="Enter the website link or platform URL (optional)"
          />

          <InputField
            isPending={isPending}
            formik={formik}
            name="password"
            label="Password"
            type="password"
            size="medium"
            helperText="Enter the password you want to store securely"
          />
          <select
            title="category"
            name="category"
            id="category"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            className="border border-gray-300 px-2 py-2.5 focus:border-blue-700 focus:border-2 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Social">Social</option>
            <option value="Banking">Banking</option>
            <option value="Email">Email</option>
            <option value="Work">Work</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>{" "}
          </select>
          <div>
            <textarea
              name="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-400 w-full outline-blue-600 rounded-lg p-3"
              placeholder="A brief talk about the account"
            />
            {formik.touched.notes && formik.errors.notes && (
              <div className="text-red-500 text-sm">{formik.errors.notes}</div>
            )}
          </div>

          <ButtonUI isPending={isPending} name="Add" />
        </form>
      </div>
    </div>
  );
}

export default AddPassword;
