import {
  Button,
  Divider,
  TextField,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import type { Password } from "../../types/passwordType";
import { useMemo, useState, useEffect } from "react";
import GroupCard from "../../ui/GroupCard";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetAuthorizedPasswordInfoAPI,
  GetGroupById,
  LeaveGroupAPI,
  RemoveMemberAPI,
  ToggleAuthorizeUserAPI,
} from "../../services/group/groupServices";
import { ListUI } from "../../ui/ListUI";
import Loading from "../../State/Loading";
import { toast } from "react-toastify";
import AboutPassword from "../vault/AboutPassword";
import { deriveMasterSecretFromPassword } from "../../utils/genMasterSecrets";
import {
  decrypt,
  generateUserKey,
} from "../../utils/encryptAndDecryptPassword";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500, md: 600 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: "90vh",
  overflowY: "auto",
};

function AboutGroups() {
  const [selectedPasswordId, setSelectedPasswordId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  // State to hold the decrypted password
  const [decryptedPasswordValue, setDecryptedPasswordValue] = useState<
    string | null
  >(null);

  const queryClient = useQueryClient();
  const { groupId } = useParams() as { groupId: string };
  const navigate = useNavigate();

  const { data: groupDetails, isLoading } = useQuery({
    queryKey: ["groupDetails", groupId],
    queryFn: () => GetGroupById({ groupId: groupId! }),
    enabled: !!groupId,
  });

  const { mutateAsync: leaveGroup } = useMutation({
    mutationFn: LeaveGroupAPI,
    mutationKey: ["LeaveGroup"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groupDetails"],
      });
    },
  });

  const { mutateAsync: removeMember } = useMutation({
    mutationFn: RemoveMemberAPI,
    mutationKey: ["RemoveMember"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groupDetails"],
      });
    },
  });
  const { mutateAsync: toggleUser } = useMutation({
    mutationFn: ToggleAuthorizeUserAPI,
    mutationKey: ["ToggleUser"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groupDetails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GetGroups"],
      });
    },
  });

  const { group = {}, passwords = [], members = [] } = groupDetails ?? {};

  const filteredUsers = useMemo(() => {
    if (!members) return [];
    return members.filter(
      (user: { name: string; email: string }) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, members]);

  // Logic for the password modal
  const handleOpenPasswordModal = () => setOpenPasswordModal(true);
  const handleClosePasswordModal = () => {
    setOpenPasswordModal(false);
    setSelectedPasswordId(null); // Reset selectedPasswordId when modal closes
    setDecryptedPasswordValue(null); // Reset decrypted password when modal closes
  };

  console.log(decryptedPasswordValue);
  // Effect to open modal when selectedPasswordId is set
  useEffect(() => {
    if (selectedPasswordId) {
      handleOpenPasswordModal();
    }
  }, [selectedPasswordId]);

  // Find the selected password to pass to AboutPassword component
  const currentSelectedPassword = useMemo(() => {
    return passwords.find(
      (password: Password) => password._id === selectedPasswordId
    );
  }, [selectedPasswordId, passwords]);
  console.log(currentSelectedPassword);

  const { data: authorizedPassword } = useQuery({
    queryKey: ["AuthorizePassword", groupId, currentSelectedPassword?._id], // Add currentSelectedPassword?._id to queryKey
    queryFn: () =>
      GetAuthorizedPasswordInfoAPI({
        groupId: groupId!,
        passwordId: currentSelectedPassword!._id, // Use _id here
      }),
    enabled: !!groupId && !!currentSelectedPassword?._id, // Ensure currentSelectedPassword._id exists before enabling
  });
  // Effect to decrypt password when currentSelectedPassword changes
  useEffect(() => {
    const decryptAndSetPassword = async () => {
      if (
        currentSelectedPassword &&
        group.salt &&
        group.id &&
        authorizedPassword
      ) {
        try {
          const masterSecret = await deriveMasterSecretFromPassword(
            groupId,
            group.salt
          );
          console.log("secret", masterSecret);

          const key = await generateUserKey({
            masterSecret,
            userId: groupId,
            salt: group.salt,
          });

          const decrypted = await decrypt({
            encryptedHex:
              authorizedPassword?.AuthorizedPassword?.encryptedPassword,
            key: key,
            ivHex: authorizedPassword?.AuthorizedPassword?.iv,
          });
          console.log(decrypted);
          setDecryptedPasswordValue(decrypted);
        } catch (error) {
          console.error("Error decrypting password:", error);
          setDecryptedPasswordValue("Decryption Error");
          toast.error("Failed to decrypt password.");
        }
      } else {
        setDecryptedPasswordValue(null);
      }
    };

    decryptAndSetPassword();
  }, [currentSelectedPassword, group.salt, group.id, groupId]); // Add groupId to dependency array

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!groupDetails) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-red-500">
        Error: Group details could not be loaded.
      </div>
    );
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredPasswords = passwords.filter((password: Password) =>
    password.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup({ groupId });
      toast.success("Group Left Successfully");
      navigate(-1);
    } catch (err) {
      toast.error("Error Leaving Group. Try Again Later");
      console.error("Toggle failed:", err);
    }
  };

  const handleToggle = async (userId: string) => {
    try {
      await toggleUser({ groupId, userId });
      toast.success("User Status Toggled Successfully");
    } catch (err) {
      toast.error(`An Error Occurred`);
      console.error("Toggle failed:", err);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await removeMember({ groupId, userId });
        toast.success("User removed Successfully");
      } catch (err) {
        toast.error("Error Removing user Try again");
        console.error("Delete failed:", err);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/dashboard/editGroup/${groupId}`);
  };

  // Removed the local decryptPassword function as it's now integrated into useEffect.
  // The decrypt function from '../../utils/encryptAndDecryptPassword' is directly used.

  return (
    <div className="flex items-center justify-center p-5">
      <div className="flex w-full flex-col rounded-lg bg-gray-200 p-4 shadow md:w-[80vw] lg:w-[60vw]">
        {/* Header Section */}
        <div className="flex-col md:flex-row items-center justify-between p-3 gap-3">
          <h4 className="text-2xl font-bold text-blue-950">About Group</h4>
          <div className="flex gap-3 p-1">
            <Button
              variant="contained"
              onClick={() => navigate(`/dashboard/addMember/${groupId}`)}
            >
              Add Member
            </Button>
            <Button variant="contained" color="info" onClick={handleEdit}>
              Edit Group
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleLeaveGroup}
            >
              Leave Group
            </Button>
          </div>
        </div>
        <Divider className="my-4" />
        {/* Group Information Card */}
        <div className="mx-auto w-full max-w-3xl">
          <GroupCard group={group} />
        </div>
        <Divider className="my-4" />
        {/* Authorized Passwords Section */}
        <div className="flex h-[300px] w-full flex-col gap-3 p-4">
          <div className="flex h-[70px] w-full items-center justify-between">
            <h3 className="truncate text-base font-bold md:text-lg lg:text-xl">
              🛡️ Authorized Passwords
            </h3>
            <div className="flex h-[70px] items-center gap-2">
              <TextField
                type="search"
                size="small"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search passwords..."
              />
              <Button
                variant="contained"
                size="medium"
                className="font-bold"
                onClick={() =>
                  navigate(`/dashboard/AuthorizeGroup/${group.id}`)
                }
              >
                ADD
              </Button>
            </div>
          </div>
          <div className="h-full w-full overflow-y-scroll hide-scrollbar">
            <div className="flex flex-col items-start">
              <ListUI
                selected={selectedPasswordId}
                setSelected={setSelectedPasswordId}
                data={filteredPasswords}
              />
            </div>
          </div>
        </div>
        <Divider className="my-4" />
        <div className="overflow-y-auto hide-scrollbar bg-gray-50 rounded mt-3 border border-gray-200 h-[70vh] p-4 space-y-4">
          <TextField
            variant="outlined"
            size="small"
            type="search"
            placeholder="Search members..."
            name="search"
            value={search}
            onChange={handleSearch}
            fullWidth
            className="bg-white"
          />

          <table className="w-full border-collapse text-sm mt-5">
            <thead className="sticky top-0 bg-gray-100 text-gray-700 uppercase text-xs shadow-sm z-10">
              <tr>
                <th className="p-3 border border-gray-200 text-left">Name</th>
                <th className="p-3 border border-gray-200 text-left">Email</th>
                <th className="p-3 border border-gray-200 text-center">
                  Status
                </th>
                <th className="p-3 border border-gray-200 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: any, index: number) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors duration-150`}
                >
                  <td className="p-3 border border-gray-200 font-medium text-gray-800 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="p-3 border border-gray-200 text-gray-600 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="p-3 border border-gray-200 text-center">
                    {user.authorized ? (
                      <CheckCircleOutlineIcon
                        color="success"
                        fontSize="small"
                      />
                    ) : (
                      <CancelOutlinedIcon color="error" fontSize="small" />
                    )}
                  </td>
                  <td className="p-3 border border-gray-200 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleToggle(user._id)}
                        title="Toggle Authorization"
                        className="p-1 rounded-md hover:bg-green-100 transition"
                      >
                        {user.authorized ? (
                          <ToggleOnIcon color="success" fontSize="small" />
                        ) : (
                          <ToggleOffIcon color="disabled" fontSize="small" />
                        )}
                      </button>
                      {/* not in use for now */}
                      {/* <button
                        onClick={() => {
                          handleEdit(user) 
                        }}
                        title="Edit"
                        className="p-1 rounded-md hover:bg-blue-100 transition"
                      >
                        <EditIcon fontSize="small" />
                      </button> */}
                      <button
                        onClick={() => handleRemoveMember(user._id)}
                        title="Delete"
                        className="p-1 rounded-md hover:bg-red-100 transition"
                      >
                        <DeleteOutlineIcon color="error" fontSize="small" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Password Details Modal */}
      <Modal
        open={openPasswordModal}
        onClose={handleClosePasswordModal}
        aria-labelledby="password-modal-title"
        aria-describedby="password-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="password-modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            Password Details
          </Typography>
          {currentSelectedPassword && decryptedPasswordValue !== null ? (
            <AboutPassword
              _id={currentSelectedPassword._id}
              logo={currentSelectedPassword.logo}
              title={currentSelectedPassword.title}
              category={currentSelectedPassword.category}
              email={currentSelectedPassword.email}
              url={currentSelectedPassword.url}
              // Pass the decrypted value from state
              encryptedPassword={decryptedPasswordValue}
              notes={currentSelectedPassword.notes}
              display={false}
            />
          ) : (
            <Typography id="password-modal-description" sx={{ mt: 2 }}>
              {currentSelectedPassword
                ? "Loading password details..."
                : "No password selected or data not found."}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleClosePasswordModal}
            sx={{ mt: 3 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AboutGroups;
