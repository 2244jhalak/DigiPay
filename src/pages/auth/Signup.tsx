import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useRegisterUserMutation } from "../../redux/authSlice";
import SignupImg from "../../assets/signupImg.gif";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react"; // <-- Import icons

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // <-- Password toggle state
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: any = await registerUser(formData).unwrap();

      if (res?.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You are now logged in!",
        confirmButtonColor: "#18BC9C",
      });

      navigate("/dashboard"); // redirect to dashboard

    } catch (err: unknown) {
      let message = "Something went wrong";

      if (err && typeof err === "object" && "data" in err && (err as any).data?.message) {
        message = (err as any).data.message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: message,
        confirmButtonColor: "#FF6B35",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2C3E50] via-[#18BC9C] to-[#2C3E50] px-4">
      <Card className="flex flex-col md:flex-row items-center w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl bg-white/10 dark:bg-gray-900/20">
        
        {/* Left Side Image */}
        <CardContent className="md:w-1/2 flex justify-center items-center p-6 bg-gradient-to-br from-[#18BC9C]/30 to-[#2C3E50]/30 dark:from-[#F39C12]/20 dark:to-[#2C3E50]/30">
          <motion.img
            src={SignupImg}
            alt="Signup Illustration"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-h-96 object-contain drop-shadow-2xl"
          />
        </CardContent>

        {/* Right Side Form */}
        <CardContent className="md:w-1/2 p-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div whileFocus={{ scale: 1.02 }}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/30 dark:bg-gray-900/40 border-none focus:ring-2 focus:ring-[#18BC9C] dark:focus:ring-[#F39C12] text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/30 dark:bg-gray-900/40 border-none focus:ring-2 focus:ring-[#18BC9C] dark:focus:ring-[#F39C12] text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400"
                />
              </motion.div>

              {/* Password Field with Eye Icon */}
              <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-white/30 dark:bg-gray-900/40 border-none focus:ring-2 focus:ring-[#18BC9C] dark:focus:ring-[#F39C12] text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 pr-10"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 dark:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#18BC9C]/90 hover:bg-[#16A085] dark:bg-[#F39C12]/90 dark:hover:bg-[#D35400] text-white font-semibold shadow-lg flex items-center justify-center gap-3 py-3"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-10 w-10 text-white"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Register"
                  )}
                </Button>
              </motion.div>
            </form>

            <p className="text-center mt-6 text-black dark:text-white font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold underline text-[#FF6B35] hover:text-[#FF8E53] transition"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
