import { motion } from "framer-motion";
import AboutImg from "../../assets/about.png"; 
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const About = () => {
  return (
    <>
    <Navbar />
    <section className="dark:text-white text-black py-20 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:space-x-12">
        
        {/* Left Image */}
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={AboutImg}
            alt="About DigiPay"
            className="rounded-lg shadow-lg w-full max-w-sm"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="md:w-1/2 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold">
            About DigiPay
          </h2>
          <p className="text-lg dark:text-white/80 text-black">
            DigiPay is your secure, fast, and reliable digital wallet solution. We help individuals and businesses manage payments effortlessly, track transactions, and stay on top of finances in real-time.
          </p>
          <p className="text-lg dark:text-white/80 text-black">
            Our mission is to simplify digital transactions while ensuring maximum security and transparency. Join thousands of satisfied users who trust DigiPay for everyday payments.
          </p>
         
        </motion.div>
      </div>

      {/* Optional Features Section */}
      <div className="mt-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition">
          <h3 className="text-2xl font-semibold mb-2">Secure</h3>
          <p>Advanced encryption and security protocols keep your funds safe at all times.</p>
        </div>
        <div className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition">
          <h3 className="text-2xl font-semibold mb-2">Fast</h3>
          <p>Send and receive money instantly with our seamless digital payment system.</p>
        </div>
        <div className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition">
          <h3 className="text-2xl font-semibold mb-2">Reliable</h3>
          <p>Track all your transactions, top up, and withdraw with complete transparency.</p>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default About;
