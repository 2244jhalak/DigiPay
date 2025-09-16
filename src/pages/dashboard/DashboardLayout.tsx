"use client";
import { useState, useEffect } from "react";

import { Link, useNavigate, useLocation, Outlet } from "react-router"; // 👈 Outlet import করো
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, Users, UserCircle, Sun, Moon, CreditCard, ArrowUpCircle, ArrowDownCircle, Send, ListChecks, CreditCardIcon } from "lucide-react";
import { getUser } from "@/utilities/Auth";
import type { IAuth } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<IAuth | null>(getUser());
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  

 
  

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate("/login"); 
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  
  const menuItems =
    user?.role === "admin"
      ? [
          { name: "Dashboard", path: "/admin-dashboard", icon: LayoutDashboard },
          { name: "Profile", path: "/admin-dashboard/profile", icon: UserCircle },
          { name: "Wallet", path: "/admin-dashboard/wallet", icon: CreditCard },
          { name: "Manage Wallet", path: "/admin-dashboard/manage-wallet", icon: CreditCardIcon },
          { name: "Manage Users", path: "/admin-dashboard/manage-users", icon: Users },
          { name: "Create User", path: "/admin-dashboard/create-user", icon: Users },
          { name: "Transactions", path: "/admin-dashboard/transactions", icon: ListChecks },
        ]
      : user?.role === "agent"
      ? [
          { name: "Dashboard", path: "/agent-dashboard", icon: LayoutDashboard },
          { name: "Profile", path: "/agent-dashboard/profile", icon: UserCircle },
          { name: "Wallet", path: "/agent-dashboard/wallet", icon: CreditCard },
          { name: "Cash In", path: "/agent-dashboard/cash-in", icon: ArrowUpCircle },
          { name: "Cash Out", path: "/agent-dashboard/cash-out", icon: ArrowDownCircle },
          { name: "Transactions", path: "/agent-dashboard/transactions", icon: ListChecks },
        ]
      : [
          { name: "Dashboard", path: "/user-dashboard", icon: LayoutDashboard },
          { name: "Profile", path: "/user-dashboard/profile", icon: UserCircle },
          { name: "Wallet", path: "/user-dashboard/wallet", icon: CreditCard },
          { name: "Topup", path: "/user-dashboard/topup", icon: ArrowUpCircle },
          { name: "Withdraw", path: "/user-dashboard/withdraw", icon: ArrowDownCircle },
          { name: "Send", path: "/user-dashboard/send-money", icon: Send },
          { name: "Transactions", path: "/user-dashboard/transactions", icon: ListChecks },
        ];

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for large devices */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white dark:bg-gray-800 shadow-xl">
        <Link to="/" className="p-6 font-bold text-2xl text-gray-800 dark:text-white">DigiPay</Link>
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {menuItems.map(({ name, path, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <li key={path}>
                  <Link
                    to={path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-lg transition-all",
                      active
                        ? "bg-[#F39C12] hover:bg-[#E67E22] transition text-white shadow-md"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    )}
                  >
                    <Icon size={18} />
                    <span>{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Sidebar for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3 }}
            className="fixed z-20 inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl md:hidden"
          >
            <div className="p-6 flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">DigiPay</Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>
            <nav className="mt-6 px-4">
              <ul className="space-y-2">
                {menuItems.map(({ name, path, icon: Icon }) => {
                  const active = location.pathname === path;
                  return (
                    <li key={path}>
                      <Link
                        to={path}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 rounded-lg transition-all",
                          active
                            ? "bg-[#F39C12] hover:bg-[#E67E22] transition text-white shadow-md"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon size={18} />
                        <span>{name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <motion.button
            whileTap={{ rotate: 360, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 dark:bg-[#2C3E50] dark:hover:bg-[#18BC9C] text-gray-500"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
              {user.role.toUpperCase()}
            </span>
            <Avatar title={user.name} className="h-10 w-10 ring-2 rounded-full ring-[#18BC9C]">
  <AvatarImage
    src={user.profileImage || ""}
    alt={user.name}
    className="rounded-full object-cover h-full w-full"
  />
  <AvatarFallback className="flex items-center justify-center h-full w-full font-bold text-lg">
    {user.name ? user.name[0].toUpperCase() : "U"}
  </AvatarFallback>
</Avatar>


          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* 👈 এখানে nested route render হবে */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
