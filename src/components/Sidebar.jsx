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

      <div className="md:hidden sticky top-0 z-50 bg-gray-900 text-white px-4 py-3 flex items-center justify-end">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md hover:bg-gray-800 transition"
        >
          <Menu size={22} />
        </button>
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

      {/* Sidebar panel */}
      <motion.div
        initial={{ x: -260 }}
        animate={{
          x: isDesktop ? 0 : open ? 0 : -260,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="
          fixed md:relative 
          top-0 left-0 
          z-50 
          w-64 
          h-screen 
          bg-gray-900 
          text-white 
          flex 
          flex-col 
          px-4 
          py-5
        "
      >

        <div className="flex justify-between items-center mb-6 md:hidden mt-10">
          <h1 className="font-bold text-lg">Menu</h1>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>


        <h1 className="hidden md:block font-bold text-2xl mb-8">
          TaskFlow
        </h1>

        <div className="mb-6 px-2">
          <p className="text-xs text-gray-400">Logged in as</p>
          <p className="font-semibold text-sm">{firstName}</p>
        </div>

        <div className="flex-1 space-y-1">
          {menu.map((item, index) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 
                  px-3 py-2.5 
                  rounded-lg 
                  transition
                  ${active ? "bg-indigo-600" : "hover:bg-gray-800"}
                `}
              >
                <Icon size={20} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="pt-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-3 
              px-3 py-2.5 
              w-full 
              rounded-lg 
              hover:bg-red-600
              transition
            "
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