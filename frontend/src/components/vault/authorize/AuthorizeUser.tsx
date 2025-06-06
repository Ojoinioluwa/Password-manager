import { InputField } from "../../../ui/InputUI";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { AddAuthorizedUserAPI } from "../../../services/Authorize/authorizeService";
import { ButtonUI } from "../../../ui/ButtonUI";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required("Email of the authorized user is required"),
  expiresAt: Yup.date().nullable(),
});

function AuthorizeUser() {
  const { passwordId } = useParams();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["AuthorizeUser"],
    mutationFn: AddAuthorizedUserAPI,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      expiresAt: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await mutateAsync({
          passwordId: passwordId!,
          email: values.email,
          expiresAt: values.expiresAt,
          encryptedPassword: values.email,
          iv: values.email,
        });
        console.log(data);
        toast.success("User Authorized Successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="bg-gray-100 h-[100vh] py-[15px] px-4 flex items-center justify-center">
      <form className="flex flex-col gap-3 px-5 py-3 bg-white shadow-lg rounded-lg  w-[80vw] md:w-[50vw] lg:w-[30vw]">
        <div className="bg-gray-100 px-2 py-3 rounded-lg shadow">
          <h2 className="text-blue-950 text-base font-bold text-center">
            Authorize User for your password
          </h2>
        </div>
        <InputField
          formik={formik}
          isPending={isPending}
          type="email"
          size="medium"
          name="email"
          label="Enter the email of the user you want to authorize"
        />
        <InputField
          formik={formik}
          isPending={isPending}
          type="date"
          size="medium"
          name="date"
          helperText="Select an expiring date for the authorized user "
          label=""
        />

        <ButtonUI isPending={isPending} name="Authorize" />
      </form>
    </div>
  );
}

export default AuthorizeUser;
