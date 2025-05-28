// MainDashboard.tsx
import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

function MainDashboard() {
  return (
    <div className="flex flex-col">
      
      <NavBar/>
      <div className="w-[100%] h-screen bg-gray-100 p-4 mt-20">
        <Outlet />
      </div>
      
    </div>
  );
}

export default MainDashboard;
