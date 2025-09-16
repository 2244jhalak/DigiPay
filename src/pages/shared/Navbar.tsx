import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getUser, logout } from "@/utilities/Auth";
import type { IAuth } from "@/types/auth";


const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<IAuth | null>(getUser());

  console.log(user)

  const navigate = useNavigate();
  

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
    const currentUser = getUser();
    if (currentUser) setUser(currentUser);
  }, []);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Features", to: "/features" },
    { name: "FAQ", to: "/faq" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const handleLogout = () => {
    logout(); // clear localStorage
    setUser(null); // remove user from state
    navigate("/"); // redirect to home
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#2C3E50] via-[#18BC9C] to-[#2C3E50] dark:from-[#2C3E50] dark:to-[#18BC9C] shadow-lg">
      <div className="container mx-auto px-4 sm:px-5 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          DigiPay
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative transition ${
                  isActive
                    ? "text-white font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#F39C12]"
                    : "text-white/80 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2">
          {/* Dark Mode Toggle */}
          <motion.button
            whileTap={{ rotate: 360, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 dark:bg-[#2C3E50] dark:hover:bg-[#18BC9C] text-white"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Desktop Buttons */}
          {
            user?
            <div className="hidden md:flex space-x-2">
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg font-medium bg-[#18BC9C] text-white hover:bg-[#16A085] transition dark:bg-[#F39C12] dark:text-[#2C3E50]"
            >
              Dashboard
            </Link>
            <button
              onClick={()=>handleLogout()}
              className="px-4 py-2 rounded-lg font-medium bg-[#F39C12] text-[#2C3E50] hover:bg-[#E67E22] transition dark:bg-[#18BC9C] dark:text-white"
            >
              Logout
            </button>
            </div>
            :
            <div className="hidden md:flex space-x-2">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg font-medium bg-[#18BC9C] text-white hover:bg-[#16A085] transition dark:bg-[#F39C12] dark:text-[#2C3E50]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg font-medium bg-[#F39C12] text-[#2C3E50] hover:bg-[#E67E22] transition dark:bg-[#18BC9C] dark:text-white"
            >
              Register
            </Link>
          </div>
          }

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md bg-white/20 hover:bg-white/30 dark:bg-[#2C3E50] dark:hover:bg-[#18BC9C]"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                key={menuOpen ? "X" : "Menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-gradient-to-r from-[#2C3E50] via-[#18BC9C] to-[#2C3E50] dark:from-[#2C3E50] dark:to-[#18BC9C] px-4 pb-4 space-y-2 shadow-lg"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-white/80 hover:text-white"
              >
                {item.name}
              </NavLink>
            ))}
            {
            user?
            
             <div className="flex flex-col space-y-2 mt-2">
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-lg font-medium bg-[#18BC9C] text-white text-center hover:bg-[#16A085] transition dark:bg-[#F39C12] dark:text-[#2C3E50]"
              >
                Dashboard
              </Link>
              <button
                
                onClick={() => handleLogout()}
                className="px-4 py-2 rounded-lg font-medium bg-[#F39C12] text-[#2C3E50] text-center hover:bg-[#E67E22] transition dark:bg-[#18BC9C] dark:text-white"
              >
                Logout
              </button>
            </div>
            :
            <div className="flex flex-col space-y-2 mt-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-lg font-medium bg-[#18BC9C] text-white text-center hover:bg-[#16A085] transition dark:bg-[#F39C12] dark:text-[#2C3E50]"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-lg font-medium bg-[#F39C12] text-[#2C3E50] text-center hover:bg-[#E67E22] transition dark:bg-[#18BC9C] dark:text-white"
              >
                Register
              </Link>
            </div>
                        
            }
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
