import { Avatar, IconButton } from "@mui/material";
import TemporaryDrawer from "./Sidebar";
import { PiAddressBookBold } from "react-icons/pi";
import { FaBell } from "react-icons/fa";

function NavBar() {
  return (
    <header className="w-full h-20 flex items-center justify-between px-6 bg-white fixed top-0 left-0 z-50 shadow-sm">
      <TemporaryDrawer />

      <div className="flex items-center gap-4">
        <IconButton aria-label="Notifications" size="large" color="inherit">
          <FaBell />
        </IconButton>

        <IconButton aria-label="Contacts" size="large" color="inherit">
          <PiAddressBookBold />
        </IconButton>

        <div className="flex flex-col text-right">
          <h1 className="text-base font-semibold text-gray-900">
            Ojo Inioluwa
          </h1>
          <p className="text-sm font-light text-gray-600">Admin</p>
        </div>

        <Avatar sx={{ width: 40, height: 40 }} alt="Ojo Inioluwa" />
      </div>
    </header>
  );
}

export default NavBar;
