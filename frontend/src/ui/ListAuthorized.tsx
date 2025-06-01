// import { useQuery } from "@tanstack/react-query";
// import {
//   ListAllDepartmentsAPI,
//   ListStudentsAPI,
// } from "../../../../Service/Admin/adminService";
// import { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import EditIcon from "@mui/icons-material/Edit";
import { useMemo, useState } from "react";

// import Loading from "../../State/Loading";

function ListAuthorizedUsers() {
  // const {
  //   data: studentResponse,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["ListStudents", filters],
  //   queryFn: () => ListStudentsAPI(filters),
  //   // enabled: !!filters.department,
  // });

  // if (isLoading || deptLoading) return <Loading />;

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

  const users = useMemo(() => {
    return authorizedUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen h-[100vh] bg-transparent m-3 rounded-xl p-4 flex flex-col gap-6">
      {/* Filters */}
      <div className="bg-stone-50 rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4 items-center shadow-sm">
        <h4 className="text-xl font-semibold text-blue-800">
          List of Users authorized with passwords
        </h4>
        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or ID"
            className="border border-gray-300 rounded-full px-3 py-1.5 text-sm w-52"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-y-scroll hide-scrollbar bg-white h-[70vh] rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm ">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Password ID</th>
              <th className="px-4 py-2 text-left">Authorized</th>
              <th className="px-4 py-2 text-left">expiresAt</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 overflow-y-scroll">
            {users.map((user, index) => (
              <tr
                key={index}
                className={`hover:bg-purple-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3">{user.firstName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 text-gray-500 font-mono">
                  {user.encryptedPassword}
                </td>
                <td className="px-4 py-3">
                  {user.authorized ? (
                    <CheckCircleOutlineIcon
                      className="text-green-600 cursor-pointer"
                      fontSize="small"
                      titleAccess="Click to unauthorize"
                      onClick={() => console.log("togggled")}
                    />
                  ) : (
                    <CancelOutlinedIcon
                      className="text-red-500 cursor-pointer"
                      fontSize="small"
                      titleAccess="Click to authorize"
                      onClick={() => console.log("toggled")}
                    />
                  )}
                </td>
                <td className="px-4 py-3">
                  {user.expiresAt
                    ? user.expiresAt?.toString().split("T")[0]
                    : "NIL"}
                </td>
                <td className="px-4 py-3 flex gap-5">
                  <DeleteOutlineIcon
                    className="text-gray-600 hover:text-red-600 cursor-pointer"
                    fontSize="small"
                    titleAccess="Delete user"
                    onClick={() => console.log("delete")}
                  />

                  {user.authorized ? (
                    <ToggleOnIcon
                      className="text-green-600 cursor-pointer"
                      fontSize="medium"
                      onClick={() => console.log(user)}
                      titleAccess="Click to unauthorize"
                    />
                  ) : (
                    <ToggleOffIcon
                      className="text-gray-400 cursor-pointer"
                      fontSize="medium"
                      onClick={() => console.log(user)}
                      titleAccess="Click to authorize"
                    />
                  )}
                  <EditIcon
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    fontSize="medium"
                    onClick={() => console.log(user)}
                    titleAccess="Edit User"
                  />
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
