import { Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletePasswordAPI } from "../../services/password/passwordServices";
import { toast } from "react-toastify";

type About = {
  _id?: string;
  logo?: string;
  title?: string;
  category?: string;
  email?: string;
  url?: string;
  encryptedPassword?: string;
  notes?: string;
};

function AboutPassword({
  _id,
  title,
  category,
  email,
  url,
  encryptedPassword,
  notes,
}: About) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  console.log(_id);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(encryptedPassword as string);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show 'Copied' for 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: ["DeletePassword"],
    mutationFn: DeletePasswordAPI,
    onSuccess: () => {
      // Invalidate the query that loads your list of passwords
      queryClient.invalidateQueries({
        queryKey: ["GetPasswords"],
      });
    },
  });

  const handleDelete = async () => {
    try {
      const data = await mutateAsync({ passwordId: _id! });
      toast.success(`${data.message}` || "Password Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error(`Error Deleting password: ${error}`);
    }
  };

  const apiKey = "pk_DvZCIz0oTZ6ajtOf0L9nnA"; // your key here
  const imgUrl = `https://img.logo.dev/${
    url?.split("//")[1]
  }?token=${apiKey}&size=250&format=png`;

  if (!_id) {
    return (
      <div className="px-5 py-2 border border-gray-300 w-full h-full text-red-600">
        Password ID is missing please navigate back to retry
      </div>
    );
  }

  return (
    <div className="px-6 py-4 border border-gray-200 rounded-lg bg-white w-full h-full shadow-sm">
      {/* Actions */}
      <div className="flex gap-3 justify-end py-2">
        <Button
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<VpnKeyIcon />}
          onClick={() => navigate(`/dashboard/authorize/${_id}`)}
        >
          Authorize
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          startIcon={<EditIcon />}
          onClick={() => navigate(`EditPassword/${_id}`)}
        >
          Edit
        </Button>
      </div>

      <Divider className="my-4" />

      {/* Main Info */}
      <div className="flex items-center gap-4 py-4">
        <img
          src={imgUrl}
          alt=""
          className="h-[60px] w-[60px] rounded-lg object-cover border border-gray-300"
        />
        <div className="flex flex-col">
          <p className="capitalize text-2xl font-bold text-blue-900">{title}</p>
          <p className="capitalize text-sm text-gray-500">{category}</p>
        </div>
      </div>

      <Divider className="my-4" />

      {/* Email */}
      <div className="flex flex-col gap-2 mb-4">
        <p className="text-lg font-semibold text-blue-900">Email</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>

      <Divider className="my-4" />

      {/* Website */}
      <div className="flex flex-col gap-2 mb-4">
        <p className="text-lg font-semibold text-blue-900">Website</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline truncate"
        >
          {url?.split("//")[1]}
        </a>
      </div>

      <Divider className="my-4" />

      {/* Password */}
      <div className="flex flex-col gap-2 mb-4 relative bg-gray-100 p-3 rounded-lg">
        <p className="text-lg font-semibold text-blue-900">Password</p>
        <div className="flex items-center justify-between mt-1">
          <p className="truncate text-gray-800 text-sm">
            {visible ? encryptedPassword : "*************"}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setVisible(!visible)}
              className="text-blue-900 hover:text-blue-950"
            >
              {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
            <button
              title="Copy"
              onClick={handleCopy}
              className="text-blue-900 hover:text-blue-950"
            >
              <ContentCopyIcon />
            </button>
          </div>
        </div>
        {copied && (
          <span className="absolute top-2 right-2 text-green-600 text-xs font-medium">
            Copied!
          </span>
        )}
      </div>

      <Divider className="my-4" />

      {/* Notes */}
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-blue-900">Notes</p>
        <p className="text-sm text-gray-700 whitespace-pre-line">{notes}</p>
      </div>
    </div>
  );
}

export default AboutPassword;
