import { Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useNavigate } from "react-router-dom";

type About = {
  logo?: string;
  title?: string;
  category?: string;
  email?: string;
  url?: string;
  encryptedPassword?: string;
  notes?: string;
};

function AboutPassword({
  logo,
  title,
  category,
  email,
  url,
  encryptedPassword,
  notes
}: About) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(encryptedPassword as string);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show 'Copied' for 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="px-5 py-2 border border-gray-300 w-full h-full">
      <div className=" flex gap-2 justify-end py-2">
        <Button
          size="small"
          variant="contained"
          type="button"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button
          size="small"
          variant="contained"
          type="button"
          startIcon={<VpnKeyIcon />}
          // onClick={()=> navigate(`authorize/${passwordId}`)}
        >
          Authorize
        </Button>
        <Button
          size="small"
          variant="contained"
          type="button"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </div>
      <Divider />
      <div className="flex gap-3 py-4">
        <img
          src={logo}
          alt=""
          className="h-[50px] w-[50px] rounded-md object-cover"
        />
        <div className="flex flex-col">
          <p className="capitalize text-2xl font-bold text-blue-900">{title}</p>
          <p className="capitalize text-sm font-light text-blue-900">
            {category}
          </p>
        </div>
      </div>
      <Divider />
      <div className="py-3 flex flex-col gap-3">
        <div className="py-2">
          <p className="text-xl font-semibold text-blue-900">Email</p>
          <p className="text-sm font-light">{email}</p>
        </div>
        <Divider />
        <div className="py-2">
          <p className="text-xl font-semibold text-blue-900">Website</p>
          <a
            href={url}
            className="text-sm font-light text-gray-600 hover:underline"
          >
            {url?.split("//")[1]}
          </a>
        </div>
        <Divider />
        <div className="py-0.5 px-2 bg-gray-200 rounded-lg relative">
          <p className="text-xl font-semibold text-blue-900">Password</p>
          <div className="flex items-center justify-between mt-2">
            <p className="truncate">{encryptedPassword}</p>
            <div className="flex">
              <button
                onClick={()=> setVisible(!visible)}
                className="ml-2 text-blue-900 hover:text-blue-950"
              >
                {visible === true ? <VisibilityIcon/> : <VisibilityOffIcon/>}
              </button>
              <button
                onClick={handleCopy}
                className="ml-2 text-blue-900 hover:text-blue-950"
              >
                <ContentCopyIcon />
              </button>
            </div>
          </div>
          {copied && (
            <span className="absolute top-2 right-2 text-green-600 text-sm">
              Copied!
            </span>
          )}
        </div>
        <Divider />
        <div className="py-2">
          <p className="text-xl font-semibold text-blue-900">Notes</p>
          <p className="text-sm font-light">{notes}</p>
        </div>
        <Divider/>
      </div>
    </div>
  );
}

export default AboutPassword;
