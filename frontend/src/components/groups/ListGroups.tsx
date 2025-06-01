import { GroupCardUI } from "../../ui/GroupCardUI";
import GroupIcon from "@mui/icons-material/Group";

function ListGroups() {
  const dummyGroups = [
    {
      _id: "664f9b1f0e4f7b001a2e4f01",
      name: "Family Vault",
      ownerId: "664f9b1f0e4f7b001a2e4f02",
      salt: "abc123saltkey",
      members: [
        { userId: "664f9b1f0e4f7b001a2e4f03", authorized: true },
        { userId: "664f9b1f0e4f7b001a2e4f04", authorized: false },
      ],
      expiresAt: "2025-12-31T00:00:00.000Z",
      type: "family",
      description: "A secure space for sharing family credentials.",
      authorized: true,
      passwordId: "664f9b1f0e4f7b001a2e4f05",
      createdAt: "2024-05-31T12:00:00.000Z",
      updatedAt: "2024-05-31T12:00:00.000Z",
    },
    {
      _id: "664f9b1f0e4f7b001a2e4f06",
      name: "Study Group",
      ownerId: "664f9b1f0e4f7b001a2e4f07",
      salt: "studygroup-unique-salt",
      members: [{ userId: "664f9b1f0e4f7b001a2e4f08", authorized: true }],
      expiresAt: "2026-01-01T00:00:00.000Z",
      type: "study",
      description: "Group for sharing study resources securely.",
      authorized: true,
      passwordId: "664f9b1f0e4f7b001a2e4f09",
      createdAt: "2024-05-31T12:00:00.000Z",
      updatedAt: "2024-05-31T12:00:00.000Z",
    },
    {
      _id: "664f9b1f0e4f7b001a2e4f10",
      name: "Dev Team",
      ownerId: "664f9b1f0e4f7b001a2e4f11",
      salt: "salt-for-devteam-123",
      members: [
        { userId: "664f9b1f0e4f7b001a2e4f12", authorized: true },
        { userId: "664f9b1f0e4f7b001a2e4f13", authorized: true },
        { userId: "664f9b1f0e4f7b001a2e4f14", authorized: false },
      ],
      expiresAt: "2025-09-01T00:00:00.000Z",
      type: "project",
      description: "Used by the dev team to store shared passwords.",
      authorized: true,
      passwordId: "664f9b1f0e4f7b001a2e4f15",
      createdAt: "2024-05-31T12:00:00.000Z",
      updatedAt: "2024-05-31T12:00:00.000Z",
    },
    {
      _id: "664f9b1f0e4f7b001a2e4f16",
      name: "HR Team",
      ownerId: "664f9b1f0e4f7b001a2e4f17",
      salt: "hr-secret-salt",
      members: [{ userId: "664f9b1f0e4f7b001a2e4f18", authorized: true }],
      expiresAt: "2025-11-01T00:00:00.000Z",
      type: "corporate",
      description: "Confidential space for HR data access.",
      authorized: true,
      passwordId: "664f9b1f0e4f7b001a2e4f19",
      createdAt: "2024-05-31T12:00:00.000Z",
      updatedAt: "2024-05-31T12:00:00.000Z",
    },
    {
      _id: "664f9b1f0e4f7b001a2e4f20",
      name: "Roommates",
      ownerId: "664f9b1f0e4f7b001a2e4f21",
      salt: "roomy-vault-salt",
      members: [{ userId: "664f9b1f0e4f7b001a2e4f22", authorized: true }],
      expiresAt: "2025-07-15T00:00:00.000Z",
      type: "shared",
      description: "A vault for managing shared bills & subscriptions.",
      authorized: true,
      passwordId: "664f9b1f0e4f7b001a2e4f23",
      createdAt: "2024-05-31T12:00:00.000Z",
      updatedAt: "2024-05-31T12:00:00.000Z",
    },
    {
      _id: "664f9b1f0e4f7b001a2e4f24",
      name: "Design Team",
      ownerId: "664f9b1f0e4f7b001a2e4f25",
      salt: "design-team-salt",
      members: [],
      expiresAt: "2026-03-31T00:00:00.000Z",
      type: "project",
      description: "Design system passwords and credentials.",
      authorized: true,
      passwordId: "664f9b1f0e4f7b001a2e4f26",
      createdAt: "2024-05-31T12:00:00.000Z",
      updatedAt: "2024-05-31T12:00:00.000Z",
    },
    {
      _id: "664f9b1f0e4f7b001a2e4f27",
      name: "Alpha Testers",
      ownerId: "664f9b1f0e4f7b001a2e4f28",
      salt: "alpha-tester-salt",
      members: [],
      expiresAt: "2025-10-10T00:00:00.000Z",
      type: "beta",
      description: "Internal testers for early access features.",
      authorized: true,
      passwordId: "664f9b1f0e4f7b001a2e4f29",
      createdAt: "2024-05-31T12:00:00.000Z",
      updatedAt: "2024-05-31T12:00:00.000Z",
    },
    {
      _id: "664f9b1f0e4f7b001a2e4f30",
      name: "Executive Board",
      ownerId: "664f9b1f0e4f7b001a2e4f31",
      salt: "exec-board-key",
      members: [],
      expiresAt: "2026-06-06T00:00:00.000Z",
      type: "executive",
      description: "Board members' confidential credential vault.",
      authorized: true,
      passwordId: "664f9b1f0e4f7b001a2e4f32",
      createdAt: "2024-05-31T12:00:00.000Z",
      updatedAt: "2024-05-31T12:00:00.000Z",
    },
    {
      _id: "664f9b1f0e4f7b001a2e4f33",
      name: "Crypto Club",
      ownerId: "664f9b1f0e4f7b001a2e4f34",
      salt: "crypto-vault-salt",
      members: [],
      expiresAt: "2026-08-20T00:00:00.000Z",
      type: "finance",
      description: "Managing shared wallets and crypto accounts.",
      authorized: true,
      passwordId: "664f9b1f0e4f7b001a2e4f35",
      createdAt: "2024-05-31T12:00:00.000Z",
      updatedAt: "2024-05-31T12:00:00.000Z",
    },
    {
      _id: "664f9b1f0e4f7b001a2e4f36",
      name: "Hackathon Squad",
      ownerId: "664f9b1f0e4f7b001a2e4f37",
      salt: "hack-2025-salt",
      members: [],
      expiresAt: "2025-12-01T00:00:00.000Z",
      type: "tech",
      description: "Temporary vault for hackathon participants.",
      authorized: true,
      passwordId: "664f9b1f0e4f7b001a2e4f38",
      createdAt: "2024-05-31T12:00:00.000Z",
      updatedAt: "2024-05-31T12:00:00.000Z",
    },
  ];

  return (
    <div className="bg-gray-50 w-full min-h-screen px-6 py-10 flex flex-col items-center justify-center">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <GroupIcon fontSize="large" className="text-blue-600" />
          Your Groups
        </h1>
        <p className="mt-2 text-gray-600 text-base md:text-lg max-w-xl mx-auto">
          Below is a list of groups you belong to. View or manage shared
          credentials and collaborate securely.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {dummyGroups.map((group) => (
          <GroupCardUI key={group._id} group={group} />
        ))}
      </div>
    </div>
  );
}

export default ListGroups;
