import { TextField } from "@mui/material";
import type { FormikProps } from "formik";

export const InputField = ({
  formik,
  isPending,
  name,
  label,
  type = "text",
  size="medium",
}: {
  formik: FormikProps<any>;
  isPending: boolean;
  name: string;
  label: string;
  type: string;
  size: "medium" | "small" 
}) => {
  return (
    <div>
      <TextField
        disabled={isPending}
        label={label}
        type={type}
        name={name}
        variant="outlined"
        size={size}
        fullWidth
        value={formik.values[name]}
        onChange={formik.handleChange(`${name}`)}
      />
      {formik.touched[name] && typeof formik.errors[name] === "string" && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}
    </div>
  );
};
