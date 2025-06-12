import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../ui/InputUI";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddMemberAPI } from "../../services/group/groupServices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonUI } from "../../ui/ButtonUI";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("ENter A valid Email Address")
    .required("Email is required"),
});

function AddMember() {
  const { groupId } = useParams() as { groupId: string };
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["AddMember"],
    mutationFn: AddMemberAPI,
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await mutateAsync({
          email: values.email,
          groupId: groupId,
        });
        toast.success("Member Added Successfully");
        formik.resetForm();
        navigate(-1);
      } catch (error) {
        toast.error(`An error Occurred Please try again Later ${error}`);
      }
    },
  });
  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-lg shadow-md flex-col space-y-3 px-4 py-3 max-w-[250px]"
      >
        <div className="">
          <h1 className="text-xl text-center text-blue-900 font-bold">
            Add Group Member
          </h1>
          <p className="text-xs text-center text-gray-600">
            Enter the email of the member you want to add. They must already
            have an account on this platform.
          </p>
        </div>
        <InputField
          formik={formik}
          label="Email"
          isPending={isPending}
          name="email"
          size="medium"
          type="email"
        />

        <ButtonUI isPending={isPending} name="Add Member" />
      </form>
    </div>
  );
}

export default AddMember;
