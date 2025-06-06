import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import EditIcon from "@mui/icons-material/Edit";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  GetAuthorizedUsersAPI,
  ToggleAuthorizedUserAPI,
  DeleteAuthorizedUserAPI,
} from "../../../services/Authorize/authorizeService";
import Loading from "../../../State/Loading";

function ListAuthorizedUsers() {
  const [search, setSearch] = useState("");

  const authorizedUsers = [
    {
      ownerId: "664020b64f3c8f001ed33801",
      authorizedId: "664020b64f3c8f001ed33802",
      encryptedPassword: "665f24d91e9c39001edcb9a1",
      expiresAt: "",
      iv: "a1b2c3d4e5f6g7h8",
      authorized: false,
      firstName: "John",
      email: "john@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33801",
      authorizedId: "664020b64f3c8f001ed33802",
      encryptedPassword: "665f24d91e9c39001edcb9a2",
      expiresAt: new Date("2025-11-30"),
      iv: "f8e7d6c5b4a39281",
      authorized: true,
      firstName: "John",
      email: "john@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33803",
      authorizedId: "664020b64f3c8f001ed33804",
      encryptedPassword: "665f24d91e9c39001edcb9a3",
      expiresAt: new Date("2026-01-10"),
      iv: "1234567890abcdef",
      authorized: true,
      firstName: "Alice",
      email: "alice@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33803",
      authorizedId: "664020b64f3c8f001ed33804",
      encryptedPassword: "665f24d91e9c39001edcb9a4",
      expiresAt: new Date("2026-03-15"),
      iv: "fedcba0987654321",
      authorized: true,
      firstName: "Alice",
      email: "alice@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33805",
      authorizedId: "664020b64f3c8f001ed33806",
      encryptedPassword: "665f24d91e9c39001edcb9a5",
      expiresAt: new Date("2025-10-20"),
      iv: "0a1b2c3d4e5f6789",
      authorized: true,
      firstName: "Michael",
      email: "michael@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33805",
      authorizedId: "664020b64f3c8f001ed33807",
      encryptedPassword: "665f24d91e9c39001edcb9a6",
      expiresAt: new Date("2025-10-20"),
      iv: "8f7e6d5c4b3a2910",
      authorized: true,
      firstName: "Sarah",
      email: "sarah@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33808",
      authorizedId: "664020b64f3c8f001ed33809",
      encryptedPassword: "665f24d91e9c39001edcb9a7",
      expiresAt: new Date("2025-09-30"),
      iv: "abcdefabcdef1234",
      authorized: true,
      firstName: "Emma",
      email: "emma@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33808",
      authorizedId: "664020b64f3c8f001ed33809",
      encryptedPassword: "665f24d91e9c39001edcb9a8",
      expiresAt: new Date("2025-08-15"),
      iv: "12345678abcdabcd",
      authorized: true,
      firstName: "Emma",
      email: "emma@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33808",
      authorizedId: "664020b64f3c8f001ed33810",
      encryptedPassword: "665f24d91e9c39001edcb9a9",
      expiresAt: new Date("2026-02-05"),
      iv: "deadbeefcafebabe",
      authorized: true,
      firstName: "Daniel",
      email: "daniel@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33811",
      authorizedId: "664020b64f3c8f001ed33812",
      encryptedPassword: "665f24d91e9c39001edcb9aa",
      expiresAt: new Date("2026-04-18"),
      iv: "0011223344556677",
      authorized: true,
      firstName: "Grace",
      email: "grace@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33811",
      authorizedId: "664020b64f3c8f001ed33812",
      encryptedPassword: "665f24d91e9c39001edcb9aa",
      expiresAt: new Date("2026-04-18"),
      iv: "0011223344556677",
      authorized: true,
      firstName: "Grace",
      email: "grace@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33811",
      authorizedId: "664020b64f3c8f001ed33812",
      encryptedPassword: "665f24d91e9c39001edcb9aa",
      expiresAt: new Date("2026-04-18"),
      iv: "0011223344556677",
      authorized: true,
      firstName: "Grace",
      email: "grace@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33811",
      authorizedId: "664020b64f3c8f001ed33812",
      encryptedPassword: "665f24d91e9c39001edcb9aa",
      expiresAt: new Date("2026-04-18"),
      iv: "0011223344556677",
      authorized: true,
      firstName: "Grace",
      email: "grace@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33811",
      authorizedId: "664020b64f3c8f001ed33812",
      encryptedPassword: "665f24d91e9c39001edcb9aa",
      expiresAt: new Date("2026-04-18"),
      iv: "0011223344556677",
      authorized: true,
      firstName: "Grace",
      email: "grace@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33811",
      authorizedId: "664020b64f3c8f001ed33812",
      encryptedPassword: "665f24d91e9c39001edcb9aa",
      expiresAt: new Date("2026-04-18"),
      iv: "0011223344556677",
      authorized: true,
      firstName: "Grace",
      email: "grace@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33811",
      authorizedId: "664020b64f3c8f001ed33812",
      encryptedPassword: "665f24d91e9c39001edcb9aa",
      expiresAt: new Date("2026-04-18"),
      iv: "0011223344556677",
      authorized: true,
      firstName: "Grace",
      email: "grace@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33811",
      authorizedId: "664020b64f3c8f001ed33812",
      encryptedPassword: "665f24d91e9c39001edcb9aa",
      expiresAt: new Date("2026-04-18"),
      iv: "0011223344556677",
      authorized: true,
      firstName: "Grace",
      email: "grace@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33811",
      authorizedId: "664020b64f3c8f001ed33812",
      encryptedPassword: "665f24d91e9c39001edcb9aa",
      expiresAt: new Date("2026-04-18"),
      iv: "0011223344556677",
      authorized: true,
      firstName: "Grace",
      email: "grace@example.com",
    },
    {
      ownerId: "664020b64f3c8f001ed33811",
      authorizedId: "664020b64f3c8f001ed33812",
      encryptedPassword: "665f24d91e9c39001edcb9aa",
      expiresAt: new Date("2026-04-18"),
      iv: "0011223344556677",
      authorized: true,
      firstName: "Grace",
      email: "grace@example.com",
    },
    // ... Add up to 30+ entries by duplicating or varying users/passwords
  ];

  // const { data: authorizedUsers, isLoading } = useQuery({
  //   queryKey: ["GetAuthorizedUsers"],
  //   queryFn: GetAuthorizedUsersAPI,
  // });

  const { mutateAsync: toggleUser } = useMutation({
    mutationKey: ["ToggleAuthorizedUser"],
    mutationFn: ToggleAuthorizedUserAPI,
  });

  const { mutateAsync: deleteUser } = useMutation({
    mutationKey: ["DeleteAuthorizedUser"],
    mutationFn: DeleteAuthorizedUserAPI,
  });

  const handleToggle = async (authorizedId: string) => {
    try {
      await toggleUser({ authorizedId });
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  const handleDelete = async (authorizedId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser({ authorizedId });
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleEdit = (user) => {
    // Example: open edit modal or navigate with user data
    console.log("Edit user:", user);
    // You can replace with: openModal(user) or navigate(`/edit/${user.authorizedId}`)
  };

  const filteredUsers = useMemo(() => {
    if (!authorizedUsers) return [];
    return authorizedUsers.filter((user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <input
        className="mb-4 p-2 border rounded w-full"
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Expires At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.encryptedPassword}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-2">{user.firstName}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                {user.authorized ? (
                  <CheckCircleOutlineIcon color="success" />
                ) : (
                  <CancelOutlinedIcon color="error" />
                )}
              </td>
              <td className="p-2">
                {user.expiresAt
                  ? new Date(user.expiresAt).toLocaleDateString()
                  : "No expiry"}
              </td>
              <td className="p-2 flex items-center space-x-2">
                <button
                  onClick={() => handleToggle(user.authorizedId)}
                  title="Toggle Authorization"
                >
                  {user.authorized ? (
                    <ToggleOnIcon color="success" />
                  ) : (
                    <ToggleOffIcon color="disabled" />
                  )}
                </button>
                <button onClick={() => handleEdit(user)} title="Edit">
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleDelete(user.authorizedId)}
                  title="Delete"
                >
                  <DeleteOutlineIcon color="error" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListAuthorizedUsers;
