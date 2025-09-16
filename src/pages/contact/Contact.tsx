import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Your message has been sent successfully.",
            confirmButtonColor: "#18BC9C",
          });
          setLoading(false);
          formRef.current?.reset();
        },
        (err) => {
          console.error("EmailJS error:", err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try again.",
            confirmButtonColor: "#d33",
          });
          setLoading(false);
        }
      );
  };

  return (
    <>
      <Navbar />
      <section className="py-20 px-4 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold">Contact Info</h2>
            <p className="text-black/80 dark:text-white/80">
              Have questions or feedback? Reach out to us via any of the methods below.
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@digipay.com" className="hover:text-[#18BC9C]">
                  support@digipay.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a href="tel:+880123456789" className="hover:text-[#18BC9C]">
                  +880 1234 567 89
                </a>
              </p>
              <p>
                <strong>Address:</strong> 123 DigiPay Street, Dhaka, Bangladesh
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4 bg-black/5 dark:bg-white/10 p-8 rounded-xl backdrop-blur-md shadow-lg transition-colors duration-300"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-center md:text-left">Send a Message</h2>
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg text-black dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#18BC9C]"
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg text-black dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#18BC9C]"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg text-black dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#18BC9C] resize-none"
              rows={5}
              required
            ></textarea>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#18BC9C] text-white font-semibold rounded-lg hover:bg-[#15a288] transition"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="h-6 w-6 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </motion.form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
