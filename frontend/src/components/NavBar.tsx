import { Avatar, IconButton } from "@mui/material"
import TemporaryDrawer from "./Sidebar"
import { PiAddressBookBold } from "react-icons/pi"
import { FaBell } from 'react-icons/fa';

function NavBar() {
  return (
    <div className="w-full h-20 flex items-center justify-between px-4">
        <TemporaryDrawer />
        <div className="flex gap-2">
            <IconButton>
                <FaBell/>
            </IconButton>
            <IconButton>
                <PiAddressBookBold/>
            </IconButton>
            <div className="flex flex-col ">
                <h1 className="text-base font-bold">Ojo Inioluwa</h1>
                <p className="text-sm font-light text-right">Admin</p>
            </div>
          <Avatar/>
        </div>
      </div>
  )
}

export default NavBar
