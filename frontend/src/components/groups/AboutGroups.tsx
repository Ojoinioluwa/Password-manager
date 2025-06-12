import { Button, Divider, TextField } from "@mui/material";
import type { Password } from "../../types/passwordType"; // Assuming this is correct
import { useMemo, useState } from "react";
import GroupCard from "../../ui/GroupCard";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"; // Commented out as table is commented
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"; // Commented out as table is commented
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"; // Commented out as table is commented
import ToggleOnIcon from "@mui/icons-material/ToggleOn"; // Commented out as table is commented
import ToggleOffIcon from "@mui/icons-material/ToggleOff"; // Commented out as table is commented
import EditIcon from "@mui/icons-material/Edit"; // Commented out as table is commented
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetGroupById,
  LeaveGroupAPI,
  RemoveMemberAPI,
  ToggleAuthorizeUserAPI,
} from "../../services/group/groupServices";
import { ListUI } from "../../ui/ListUI";
import Loading from "../../State/Loading";
import { toast } from "react-toastify";

function AboutGroups() {
  const [selectedPasswordId, setSelectedPasswordId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const { groupId } = useParams() as { groupId: string }; // Use object destructuring for clarity
  const navigate = useNavigate();

  // Use optional chaining for safer access to groupId
  const { data: groupDetails, isLoading } = useQuery({
    queryKey: ["groupDetails", groupId], // More descriptive query key
    queryFn: () => GetGroupById({ groupId: groupId! }), // Assert groupId is not null/undefined here if it's guaranteed by route
    enabled: !!groupId, // Only run query if groupId exists
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

  // Destructure group and passwords for easier access
  const { group = {}, passwords = [], members = [] } = groupDetails ?? {};

  const filteredUsers = useMemo(() => {
    if (!members) return [];
    return members.filter(
      (user: { name: string; email: string }) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, members]);

  // handler loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Handle case where groupDetails might be undefined after loading (e.g., group not found)
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
  // Filter passwords based on search term
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

  const handleEdit = (user) => {
    // Example: open edit modal or navigate with user data
    console.log("Edit user:", user);
    navigate(""); // Adjust this later
  };

  // Handle loading state

  return (
    <div className="flex items-center justify-center p-5">
      <div className="flex w-full flex-col rounded-lg bg-gray-200 p-4 shadow md:w-[80vw] lg:w-[60vw]">
        {/* Header Section */}
        <div className="flex items-center justify-between p-3">
          <h4 className="text-2xl font-bold text-blue-950">About Group</h4>
          <div className="flex flex-col gap-3 p-1 md:flex-row">
            <Button
              variant="contained"
              onClick={() => navigate(`/dashboard/addMember/${groupId}`)}
            >
              Add
            </Button>
            <Button variant="contained" color="info">
              Edit
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
        <Divider className="my-4" /> {/* Add margin for better spacing */}
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
                placeholder="Search passwords..." // Add placeholder
              />
              <Button
                variant="contained"
                size="medium"
                className="font-bold"
                onClick={() =>
                  navigate(`/dashboard/AuthorizeGroup/${group.id}`)
                }
              >
                + ADD
              </Button>
            </div>
          </div>
          <div className="h-full w-full overflow-y-scroll hide-scrollbar">
            <div className="flex flex-col items-start">
              <ListUI
                selected={selectedPasswordId}
                setSelected={setSelectedPasswordId}
                data={filteredPasswords} // Use filtered passwords
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
              {filteredUsers.map((user, index) => (
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
                      <button
                        onClick={() => handleEdit(user)}
                        title="Edit"
                        className="p-1 rounded-md hover:bg-blue-100 transition"
                      >
                        <EditIcon fontSize="small" />
                      </button>
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
    </div>
  );
}

export default AboutGroups;
