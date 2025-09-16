import { motion } from "framer-motion";

const Marquee = () => {
  const message =
    "🎉 New users get ৳50 credited to their wallet upon signup! Enjoy secure, fast, and reliable payments with DigiPay! ";

  return (
    <div className="overflow-hidden bg-gradient-to-r from-[#18BC9C]/70 via-[#2C3E50]/60 to-[#18BC9C]/70 dark:bg-gray-800 py-3">
      <motion.div
        className="inline-block whitespace-nowrap text-white font-semibold text-lg"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {message.split(" ").map((word, i) => (
          <span key={i} className="mr-3 inline-block">
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
