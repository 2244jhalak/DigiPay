import { Link } from "react-router";
import { useState, useEffect } from "react";
import { getUser } from "@/utilities/Auth";

interface IUser {
  name: string;
  role: string;
  walletBalance: number;
}

const CTA = () => {
  const [user, setUser] = useState<IUser | null>(getUser());

  // listener for logout
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUser());
    };

    // listen for storage changes (logout from other tabs)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Hide CTA if user is logged in
  if (user) return null;

  return (
    <section className=" dark:text-white text-black py-20 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">
        Ready to Start Using DigiPay?
      </h2>
      <p className="text-lg sm:text-xl mb-8">
        Sign up now and get ৳50 credited to your wallet instantly!
      </p>
      <Link
        to="/register"
        className="px-8 py-4 bg-white text-[#18BC9C] font-semibold rounded-lg border-2 hover:bg-gray-200 transition"
      >
        Create Account
      </Link>
    </section>
  );
};

export default CTA;
