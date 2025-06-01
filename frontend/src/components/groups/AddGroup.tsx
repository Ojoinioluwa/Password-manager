import { InputField } from "../../ui/InputUI";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { AddAuthorizeUserAPI } from "../../services/Authorize/authorizeService"; 
import { ButtonUI } from "../../ui/ButtonUI";


const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name of the group is required"),
  expiresAt: Yup.date().nullable(),
  type: Yup.string().required("Group type is required"),
  description: Yup.string().required("Write a brief description about the group")
});

function AddGroup() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["AuthorizeUser"],
    mutationFn: AddAuthorizeUserAPI,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      expiresAt: "",
      type: "",
    },
    validationSchema,
    onSubmit: async (values) => {

      try {
          const data = await mutateAsync({
        name: values.name,
        expiresAt: values.expiresAt,
      });
      alert("Group added successfully")
      } catch (error) {
        console.log(error)
        alert(error)
      }
    
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
          type="name"
          size="medium"
          name="name"
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
          title="category"
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

         <div>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-400 w-full outline-blue-600 rounded-lg p-3"
              placeholder="A brief talk about the account"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm">{formik.errors.description}</div>
            )}
          </div>

        <ButtonUI isPending={isPending} name="Authorize" />
      </form>
    </div>
  );
}

export default AddGroup;
