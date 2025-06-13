import { useQuery } from "@tanstack/react-query";
import { GroupCardUI } from "../../ui/GroupCardUI";
import GroupIcon from "@mui/icons-material/Group";
import { GetGroupsUserAPI } from "../../services/group/groupServices";
import Loading from "../../State/Loading";
import GroupOffIcon from "@mui/icons-material/GroupOff";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

// ==============================
// Define types locally
// ==============================
type Group = {
  _id: string;
  name: string;
  type: string;
  description: string;
  // Add more fields if needed
};

type GetGroupsResponse = {
  groups: Group[];
};

function ListGroups() {
  const navigate = useNavigate();

  // ==============================
  // Use typed query
  // ==============================
  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery<GetGroupsResponse>({
    queryKey: ["GetGroups"],
    queryFn: GetGroupsUserAPI,
  });

  const handleAddGroup = () => {
    navigate("/dashboard/AddGroup");
  };

  // ==============================
  // Loading state
  // ==============================
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // ==============================
  // Empty or Error state
  // ==============================
  if (isError || !groups || groups.groups.length === 0) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-center px-4">
        <GroupOffIcon style={{ fontSize: 80, color: "#9CA3AF" }} />
        <p className="text-lg font-semibold mt-4 text-gray-600">
          {isError
            ? "Failed to load groups. Please check your connection or try again later."
            : "You are not in any group yet."}
        </p>
        <button
          onClick={handleAddGroup}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2"
        >
          <AddIcon />
          Add Group
        </button>
      </div>
    );
  }

  // ==============================
  // Success state
  // ==============================
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <GroupIcon />
          My Groups
        </h1>
        <button
          onClick={handleAddGroup}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
        >
          <AddIcon />
          Add Group
        </button>
      </div>

      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[1200px]">
          {groups.groups.map((group) => (
            <GroupCardUI key={group._id} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListGroups;
