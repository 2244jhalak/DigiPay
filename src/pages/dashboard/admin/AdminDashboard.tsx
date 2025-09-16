import { getUser } from "@/utilities/Auth";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const user = getUser();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] bg-gradient-to-br from-[#18BC9C]/20 to-[#2C3E50]/20 dark:from-[#18BC9C]/40 dark:to-[#2C3E50]/80">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white text-center"
      >
        Welcome{user?.name ? `, ${user.name}` : ""}!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 text-center"
      >
        We're glad to have you back.
      </motion.p>
    </div>
  );
};

export default AdminDashboard;
