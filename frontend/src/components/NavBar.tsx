import { Avatar, IconButton } from "@mui/material";
import TemporaryDrawer from "./Sidebar";
// import { PiAddressBookBold } from "react-icons/pi";
import { FaBell } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { GetUserAPI } from "../services/user/userServices";
import Loading from "../State/Loading";

function NavBar() {
  const { data, isPending } = useQuery({
    queryKey: ["GetProfile"],
    queryFn: GetUserAPI,
  });
  console.log(data);

  if (isPending) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <header className="w-full h-20 flex items-center justify-between px-6 bg-white fixed top-0 left-0 z-50 shadow-sm">
      <TemporaryDrawer />

      <div className="flex items-center gap-4">
        <IconButton aria-label="Notifications" size="large" color="inherit">
          <FaBell />
        </IconButton>
        {/* 
        <IconButton aria-label="Contacts" size="large" color="inherit">
          <PiAddressBookBold />
        </IconButton> */}

        <div className="flex flex-col text-right">
          <h1 className="text-base font-semibold text-gray-900">
            {data?.user?.firstName} {data?.user?.lastName}
          </h1>
          <p className="text-sm font-light text-gray-600">
            {data?.user?.email}
          </p>
        </div>

        <Avatar sx={{ width: 40, height: 40 }} alt={data?.user?.firstName}>
          {data?.user?.firstName?.charAt(0).toUpperCase() || "U"}
        </Avatar>
      </div>
    </header>
  );
}

export default NavBar;
