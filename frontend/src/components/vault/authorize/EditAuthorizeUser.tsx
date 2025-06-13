import { InputField } from "../../../ui/InputUI";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { EditAuthorizedUserAPI } from "../../../services/Authorize/authorizeService";
import { ButtonUI } from "../../../ui/ButtonUI";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  expiresAt: Yup.date().nullable(),
});

function EditAuthorizeUser() {
  const { authorizedId } = useParams() as { authorizedId: string };
  console.log(authorizedId);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["EditAuthorizedUser"],
    mutationFn: EditAuthorizedUserAPI,
  });

  const formik = useFormik({
    initialValues: {
      expiresAt: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const data = await mutateAsync({
          authorizedId: authorizedId,
          expiresAt: values.expiresAt,
        });
        console.log(data);
        formik.resetForm();
        navigate(-1);
        toast.success("Authorized user Edited Successfully");
      } catch (error) {
        toast.error(`An error Occurred Editing the user info ${error}`);
        navigate(-1);
      }
    },
  });
  return (
    <div className="bg-gray-100 h-[100vh] py-[15px] px-4 flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-3 px-5 py-3 bg-white shadow-lg rounded-lg  w-[80vw] md:w-[50vw] lg:w-[30vw]"
      >
        <div className="bg-gray-100 px-2 py-3 rounded-lg shadow">
          <h2 className="text-blue-950 text-base font-bold text-center">
            Edit Authorize User Information for your password
          </h2>
        </div>

        <InputField
          formik={formik}
          isPending={isPending}
          type="date"
          size="medium"
          name="expiresAt"
          helperText="Select an expiring date for the authorized user "
          label=""
        />

        <ButtonUI isPending={isPending} name="Authorize" />
      </form>
    </div>
  );
}

export default EditAuthorizeUser;
