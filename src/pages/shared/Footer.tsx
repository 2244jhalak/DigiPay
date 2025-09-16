import { Link } from "react-router";
import { Facebook, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#2C3E50] via-[#18BC9C] to-[#2C3E50] dark:from-[#2C3E50] dark:to-[#18BC9C] text-white py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Tagline */}
        <div className="text-center md:text-left">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:text-[#F39C12] transition"
          >
            DigiPay
          </Link>
          <p className="text-sm text-white/80 mt-2">
            Secure • Fast • Reliable Payments
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h4 className="text-sm text-white/70 uppercase tracking-wider mb-2">
            Quick Links
          </h4>
          <div className="flex flex-col space-y-2">
            <Link to="/" className="hover:text-[#F39C12] transition">Home</Link>
            <Link to="/features" className="hover:text-[#F39C12] transition">Features</Link>
            <Link to="/faq" className="hover:text-[#F39C12] transition">FAQ</Link>
            <Link to="/about" className="hover:text-[#F39C12] transition">About</Link>
            <Link to="/contact" className="hover:text-[#F39C12] transition">Contact</Link>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h4 className="text-sm text-white/70 uppercase tracking-wider mb-2">
            Follow Us
          </h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://www.facebook.com/nightmare.jhalak"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F39C12] transition"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/nakibhasanjhalak/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F39C12] transition"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://github.com/2244jhalak"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F39C12] transition"
            >
              <Github size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 text-center text-sm text-white/70 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} DigiPay. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
