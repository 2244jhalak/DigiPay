import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const faqData = [
  {
    question: "How do I create a DigiPay account?",
    answer:
      "Click on the 'Register' button, fill in your details, and submit. New users get ৳50 credited to their wallet instantly.",
  },
  {
    question: "How can I send money?",
    answer:
      "After logging in, go to 'Send Money', enter the recipient's details, the amount, and confirm the transaction.",
  },
  {
    question: "Can I top up my wallet?",
    answer:
      "Yes! You can top up your wallet via bank transfer or other supported payment methods from the 'Wallet' section.",
  },
  {
    question: "How do I view my transaction history?",
    answer:
      "Navigate to the 'Transactions' page from your dashboard to see all your past transactions in detail.",
  },
  {
    question: "Is DigiPay secure?",
    answer:
      "Absolutely! We use advanced encryption, two-factor authentication, and regular security audits to ensure your funds are safe.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    if (openIndex === index) setOpenIndex(null);
    else setOpenIndex(index);
  };

  return (
    <>
    <Navbar />
    <section className="bg-gray-50 dark:bg-gray-900 py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Here are some common questions our users ask about DigiPay.
        </p>

        <div className="space-y-4 text-left">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center p-4 focus:outline-none"
              >
                <span className="font-medium text-gray-800 dark:text-white">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-gray-800 dark:text-white" />
                ) : (
                  <ChevronDown size={20} className="text-gray-800 dark:text-white" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default FAQ;
