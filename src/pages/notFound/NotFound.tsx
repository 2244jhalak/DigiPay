"use client";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { AlertTriangle, Home, Headset } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-[#0b1220] dark:to-[#07121a] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white/80 dark:bg-black/60 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-10 text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto w-24 h-24 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#18BC9C] to-[#2C3E50] text-white shadow-xl"
        >
          <AlertTriangle size={48} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white"
        >
          404 — Page Not Found
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-3 text-gray-600 dark:text-gray-300 text-lg"
        >
          Oops! The page you are looking for doesn’t exist or has been moved.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#18BC9C] to-[#16A085] text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform"
          >
            <Home size={20} /> Go Home
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Headset size={20} /> Contact Support
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            ← Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
