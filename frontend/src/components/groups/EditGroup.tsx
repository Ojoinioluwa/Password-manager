import { InputField } from "../../ui/InputUI";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { ButtonUI } from "../../ui/ButtonUI";
import { UpdateGroupAPI } from "../../services/group/groupServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  name: Yup.string(),
  expiresAt: Yup.date().nullable(),
  type: Yup.string(),
  description: Yup.string(),
});

function EditGroup() {
  const { groupId } = useParams();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["EditGroup"],
    mutationFn: UpdateGroupAPI,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      expiresAt: "",
      type: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await mutateAsync({
          name: values.name,
          expiresAt: values.expiresAt,
          type: values.type,
          description: values.description,
          groupId: groupId!,
        });
        console.log(data);
        toast.success("Group added successfully");
      } catch (error) {
        console.log(error);
        toast.error("An error Occurred");
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
          <h2 className="text-blue-950 text-base font-bold text-center mb-3">
            Create Group
          </h2>
        </div>
        <InputField
          formik={formik}
          isPending={isPending}
          type="text"
          size="medium"
          name="name"
          label="Enter the name of the group"
        />
        <InputField
          formik={formik}
          isPending={isPending}
          type="date"
          size="medium"
          name="expiresAt"
          helperText="Select an expiring date for the authorized user "
          label=""
        />
        <select
          title="type"
          name="type"
          id="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
            <div className="text-red-500 text-sm">
              {formik.errors.description}
            </div>
          )}
        </div>

        <ButtonUI isPending={isPending} name="Edit Group" />
      </form>
    </div>
  );
}

export default EditGroup;
