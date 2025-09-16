import { Link } from "react-router";
import { motion } from "framer-motion";
import HeroImg from "../../assets/banner.png"; 
import Marquee from "./Marquee";

const Banner = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-[#2C3E50] via-[#18BC9C] to-[#2C3E50] text-white flex flex-col">

      {/* Hero Section */}
      <div className="flex-1 flex items-center">
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center md:items-start">
          
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Secure, Fast & Reliable Payments
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Manage your digital wallet effortlessly. Send, receive, and track payments seamlessly.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Link
                to="/features"
                className="px-6 py-3 border border-white hover:border-[#F39C12] rounded-lg font-semibold text-white transition"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center md:justify-end">
            <motion.img
              src={HeroImg}
              alt="Digital Wallet Illustration"
              className="w-full max-w-md"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>

      {/* Marquee Overlay */}
      <div className="absolute bottom-0 w-full">
        <Marquee />
      </div>
    </div>
  );
};

export default Banner;
