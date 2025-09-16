import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Entrepreneur",
    message:
      "DigiPay made my transactions super fast and secure! I can manage my wallet anytime, anywhere.",
  },
  {
    name: "Rafiq Ahmed",
    role: "Freelancer",
    message:
      "I love the instant wallet credit feature. Adding money and payments is now seamless.",
  },
  {
    name: "Sabrina Khan",
    role: "Student",
    message:
      "The user-friendly interface and smooth experience make DigiPay my go-to digital wallet.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#18BC9C]/10 to-[#2C3E50]/5 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
          What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Real experiences from our satisfied users
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <p className="text-gray-700 dark:text-gray-200 mb-4">"{t.message}"</p>
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {t.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
