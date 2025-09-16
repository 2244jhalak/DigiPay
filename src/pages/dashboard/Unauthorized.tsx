
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#2C3E50] via-[#18BC9C] to-[#2C3E50] text-white px-4">
      <h1 className="text-5xl font-bold mb-4">🚫 Unauthorized</h1>
      <p className="text-lg mb-6">You don’t have access to this page.</p>
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-[#18BC9C] hover:bg-[#16A085] transition font-semibold"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;
