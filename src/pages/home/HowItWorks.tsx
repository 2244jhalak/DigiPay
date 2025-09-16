import { motion } from "framer-motion";
import { UserPlus, DollarSign, Send, ArrowUp, ArrowDown } from "lucide-react";

const steps = [
  {
    icon: <UserPlus size={32} />,
    title: "Sign Up",
    description: "Create your DigiPay account in seconds.",
  },
  {
    icon: <DollarSign size={32} />,
    title: "Wallet Bonus",
    description: "New users instantly get ৳50 in their wallet.",
  },
  {
    icon: <ArrowUp size={32} />,
    title: "Top Up",
    description: "Add money to your wallet anytime, securely.",
  },
  {
    icon: <Send size={32} />,
    title: "Send Payment",
    description: "Send money to friends, family, or merchants easily.",
  },
  {
    icon: <ArrowDown size={32} />,
    title: "Withdraw / Cash Out",
    description: "Withdraw money safely to your bank or agent.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition cursor-pointer flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <div className="text-primary mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
