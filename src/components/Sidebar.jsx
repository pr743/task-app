import {
  Home,
  Folder,
  CheckSquare,
  Bell,
  Settings,
  Menu,
  Building,
  LogOut,
  X,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const firstName = user?.name?.split(" ")[0] || "User";

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const menu = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Tenant", icon: Building, path: "/tenants" },
    { name: "Projects", icon: Folder, path: "/projects" },
    { name: "Tasks", icon: CheckSquare, path: "/tasks" },
    { name: "Notifications", icon: Bell, path: "/notifications" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>

      <div className="md:hidden sticky top-0 z-50 bg-gray-900 text-white px-4 py-3 flex items-center justify-between">


        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md hover:bg-gray-800 transition"
        >
          <Menu size={24} />
        </button>


        <h1 className="text-sm font-semibold">TaskFlow</h1>


        <div className="w-6"></div>
      </div>


      <AnimatePresence>
        {!isDesktop && open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />
        )}
      </AnimatePresence>


      <motion.div
        initial={{ x: -260 }}
        animate={{
          x: isDesktop ? 0 : open ? 0 : -260,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="fixed md:relative top-0 left-0 z-50 w-64 h-screen bg-gray-900 text-white flex flex-col"
      >

        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-800 md:hidden">
          <h1 className="font-bold text-lg">Menu</h1>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>


        <h1 className="hidden md:block font-bold text-2xl px-4 mt-6 mb-6">
          TaskFlow
        </h1>


        <div className="px-4 mb-4">
          <p className="text-xs text-gray-400">Logged in as</p>
          <p className="font-semibold text-sm">{firstName}</p>
        </div>


        <div className="flex-1 px-2 space-y-1 overflow-y-auto">
          {menu.map((item, index) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${active ? "bg-indigo-600" : "hover:bg-gray-800"
                  }`}
              >
                <Icon size={20} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>


        <div className="px-2 pb-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default Sidebar;