import { motion } from "framer-motion";
import { ShieldCheck, Zap, Smartphone, Users, CreditCard, Lock } from "lucide-react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Transactions",
    description: "Your money and data are always protected with enterprise-grade encryption.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Experience instant deposits, withdrawals, and seamless transfers.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Access your account anytime, anywhere with our fully responsive design.",
  },
  {
    icon: Users,
    title: "User Friendly",
    description: "An intuitive interface that makes managing finances simple for everyone.",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Options",
    description: "Support for cards, wallets, and bank transfers all in one place.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "We never share your personal information with third parties.",
  },
];

const Features = () => {
  return (
    <>
    <Navbar />
    <section className="py-20 px-6 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
        >
          Powerful Features for Modern Finance
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-300"
        >
          Everything you need to manage your digital wallet securely and easily.
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#18BC9C]/10 text-[#18BC9C] mb-6">
              <feature.icon size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Features;
