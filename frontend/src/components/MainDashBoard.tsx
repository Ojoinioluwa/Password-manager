// MainDashboard.tsx
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function MainDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <NavBar />

      {/* Main Content Area: pushes down below fixed navbar */}
      <main className="flex-grow bg-gray-100 p-6 pt-24">
        <Outlet />
      </main>
    </div>
  );
}

export default MainDashboard;
