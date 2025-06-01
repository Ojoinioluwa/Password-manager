import Avatar from "@mui/material/Avatar";

export default function GroupCard({ group }) {
  const {
    name,
    type,
    ownerName,
    description,
    userCount,
    passwordCount,
    createdAt,
    expiresAt,
    avatarUrl,
  } = group;

  // Format dates (adjust locale/options as needed)
  const createdDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const expirationDate = new Date(expiresAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-full flex-col md:flex rounded-lg overflow-hidden">
      {/* Header: Avatar + Basic Info */}
      <div className="flex items-center p-4 border-b">
        <Avatar
          src={avatarUrl}
          sx={{ width: 80, height: 80 }}
          className="flex-shrink-0"
        >
          {name.charAt(0)}
        </Avatar>
        <div className="ml-4 flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Type:</span> {type}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Owner:</span> {ownerName}
          </p>
          {description && (
            <p className="mt-2 text-sm text-gray-700">{description}</p>
          )}
        </div>
      </div>
      {/* Stats: Users & Passwords */}
      <div className="p-4 border-b">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase">Users</span>
            <span className="text-lg font-medium text-gray-800">
              {userCount}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase">Passwords</span>
            <span className="text-lg font-medium text-gray-800">
              {passwordCount}
            </span>
          </div>
        </div>

        {/* Dates */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">Created On:</span>
            <span className="text-sm text-gray-700">{createdDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">Expires On:</span>
            <span className="text-sm text-gray-700">{expirationDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
