import { Sidebar } from "lucide-react";
import Navbar from "./Navbar";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
