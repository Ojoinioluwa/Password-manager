import { InputField } from "../../ui/InputUI";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { AddAuthorizeUserAPI } from "../../services/Authorize/authorizeService"; 
import { ButtonUI } from "../../ui/ButtonUI";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required("Email of the authorized user is required"),
  expiresAt: Yup.date().nullable(),
  type: Yup.string().required("Group type is required")
});

function AddGroup() {
  const { passwordId } = useParams();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["AuthorizeUser"],
    mutationFn: AddAuthorizeUserAPI,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      expiresAt: "",
      type: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = await mutateAsync({
        passwordId: passwordId,
        email: values.email,
        expiresAt: values.expiresAt,
      });
    },
  });
  return (
    <div className="bg-gray-100 h-[100vh] py-[15px] px-4 flex items-center justify-center">
      <form className="flex flex-col gap-3 px-5 py-3 bg-white shadow-lg rounded-lg  w-[80vw] md:w-[50vw] lg:w-[30vw]">
        <div className="bg-gray-100 px-2 py-3 rounded-lg shadow">
          <h2 className="text-blue-950 text-base font-bold text-center mb-3">
            Create Group
          </h2>
        </div>
        <InputField
          formik={formik}
          isPending={isPending}
          type="email"
          size="medium"
          name="email"
          label="Enter the name of the group"
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
        <select
          name="category"
          id="category"
          value={formik.values.type}
          onChange={(e) => console.log(e.target.value)}
          className="border border-gray-300 px-2 py-2.5 focus:border-blue-700 focus:border-2 rounded-lg"
        >
          <option value="">Select Group type</option>
          <option value="family">Family</option>
          <option value="friends">Friends</option>
          <option value="school">School</option>
          <option value="coworkers">Coworkers</option>
          <option value="community">Community</option>
          <option value="gaming">Gaming</option>
          <option value="study">Study</option>
          <option value="project">Project</option>
          <option value="support">Support</option>
          <option value="others">Others</option>
        </select>

        <ButtonUI isPending={isPending} name="Authorize" />
      </form>
    </div>
  );
}

export default AddGroup;
