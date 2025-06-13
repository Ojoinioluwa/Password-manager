import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import EditIcon from "@mui/icons-material/Edit";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetAuthorizedUsersAPI,
  ToggleAuthorizedUserAPI,
  DeleteAuthorizedUserAPI,
} from "../../../services/Authorize/authorizeService";
import Loading from "../../../State/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ListAuthorizedUsers() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: authorizedUsers, isLoading } = useQuery({
    queryKey: ["GetAuthorizedUsers"],
    queryFn: GetAuthorizedUsersAPI,
  });

  const { mutateAsync: toggleUser } = useMutation({
    mutationKey: ["ToggleAuthorizedUser"],
    mutationFn: ToggleAuthorizedUserAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetAuthorizedUsers"],
      });
    },
  });

  const { mutateAsync: deleteUser } = useMutation({
    mutationKey: ["DeleteAuthorizedUser"],
    mutationFn: DeleteAuthorizedUserAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetAuthorizedUsers"],
      });
    },
  });

  const handleToggle = async (authorizedId: string) => {
    try {
      await toggleUser({ authorizedId });
      toast.success("User Toggled Successfully");
    } catch (err) {
      toast.error(`An Error Occurred ${err}`);
      console.error("Toggle failed:", err);
    }
  };

  const handleDelete = async (authorizedId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser({ authorizedId });
        toast.success("User Deleted Successfully");
      } catch (err) {
        toast.error(`An Error Occurred deleting the user ${err}`);
        console.error("Delete failed:", err);
      }
    }
  };

  const handleEdit = (authorizedId: string) => {
    navigate(`/dashboard/editAuthorized/${authorizedId}`); // Adjust this later
  };
  console.log(authorizedUsers);

  const filteredUsers = useMemo(() => {
    if (!authorizedUsers) return [];
    return authorizedUsers.authorizedUsers.filter(
      (user: { authorizedId: { firstName: string; email: string } }) =>
        user.authorizedId.firstName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.authorizedId.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, authorizedUsers]);

  console.log(filteredUsers);

  if (isLoading) {
    return (
      <div className="h-screen w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6">
      <input
        className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-y-auto hide-scrollbar bg-white rounded-xl shadow-lg border border-gray-200 h-[70vh]">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100 text-gray-700 uppercase text-xs shadow">
            <tr>
              <th className="p-3 border border-gray-200 text-left">Name</th>
              <th className="p-3 border border-gray-200 text-left">Email</th>
              <th className="p-3 border border-gray-200 text-left">
                Password Title
              </th>
              <th className="p-3 border border-gray-200 text-center">Status</th>
              <th className="p-3 border border-gray-200 text-left">
                Expires At
              </th>
              <th className="p-3 border border-gray-200 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index: number) => (
              <tr
                key={user._id || index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition-colors duration-150`}
              >
                <td className="p-3 border border-gray-200 whitespace-nowrap font-medium text-gray-800">
                  {user.authorizedId.firstName}
                </td>
                <td className="p-3 border border-gray-200 whitespace-nowrap text-gray-600">
                  {user.authorizedId.email}
                </td>
                <td className="p-3 border border-gray-200 whitespace-nowrap text-gray-600">
                  {/* Assuming you have user.passwordName */}
                  {user.passwordId?.title || "N/A"}
                </td>
                <td className="p-3 border border-gray-200 text-center">
                  {user.authorized ? (
                    <CheckCircleOutlineIcon color="success" fontSize="small" />
                  ) : (
                    <CancelOutlinedIcon color="error" fontSize="small" />
                  )}
                </td>
                <td className="p-3 border border-gray-200 whitespace-nowrap text-gray-600">
                  {user.expiresAt
                    ? new Date(user.expiresAt).toLocaleDateString()
                    : "No expiry"}
                </td>
                <td className="p-3 border border-gray-200 flex justify-center space-x-3">
                  <button
                    onClick={() => handleToggle(user._id)}
                    title="Toggle Authorization"
                    className="p-1 rounded hover:bg-green-100 transition"
                  >
                    {user.authorized ? (
                      <ToggleOnIcon color="success" fontSize="small" />
                    ) : (
                      <ToggleOffIcon color="disabled" fontSize="small" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(user._id)}
                    title="Edit"
                    className="p-1 rounded hover:bg-blue-100 transition"
                  >
                    <EditIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    title="Delete"
                    className="p-1 rounded hover:bg-red-100 transition"
                  >
                    <DeleteOutlineIcon color="error" fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListAuthorizedUsers;
