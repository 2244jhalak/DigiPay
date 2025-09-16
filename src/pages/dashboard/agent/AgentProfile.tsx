"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUser, logout } from "@/utilities/Auth";
import type { IAuth } from "@/types/auth";
import { useUpdateProfileMutation } from "@/redux/authSlice";
import Swal from "sweetalert2";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function AgentProfile() {
  const [user, setUser] = useState<IAuth | null>(getUser());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    
    newPassword: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    const data = getUser();
    setUser(data);
    if (data)
      setFormData({
        name: data.name,
        email: data.email,
        profileImage: data.profileImage || "",
        
        newPassword: "",
      });
  }, []);

  // Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "profileImage" && e.target.files?.[0]) {
      setFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: form,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      let profileImageUrl = formData.profileImage;
      if (file) {
        profileImageUrl = await uploadToCloudinary(file);
      }

      const res: any = await updateProfile({
        authId: user.id,
        name: formData.name,
        email: formData.email,
        profileImage: profileImageUrl,
        
        newPassword: formData.newPassword || undefined,
      }).unwrap();

      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        confirmButtonColor: "#18BC9C",
      });

      // Clear password fields
      setFormData({ ...formData, newPassword: "" });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err?.data?.message || "Something went wrong",
        confirmButtonColor: "#FF6B35",
      });
    }
  };

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto mt-20 p-6 shadow-lg rounded-3xl bg-white/30 backdrop-blur-lg">
        <CardContent className="text-center text-gray-700 dark:text-gray-200">
          <p>No user data found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xl mx-auto mt-10 shadow-2xl rounded-3xl bg-gradient-to-tr from-white/30 to-white/10 backdrop-blur-lg border border-white/20">
      <CardHeader className="flex flex-col items-center gap-4 p-6">
        <Avatar className="h-24 w-24 ring-2 ring-[#18BC9C]">
          <AvatarImage src={user.profileImage || ""} alt={user.name} />
          <AvatarFallback>{user.name ? user.name[0].toUpperCase() : "U"}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
          {user.name}
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-300">{user.role}</p>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="bg-white/20 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#18BC9C] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
          {/* Email */}
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="bg-white/20 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#18BC9C] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
          {/* Profile Image */}
          <Input
            type="file"
            name="profileImage"
            onChange={handleChange}
            accept="image/*"
            className="bg-white/20 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#18BC9C] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          
          {/* New Password */}
          <Input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="bg-white/20 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="relative w-full bg-gradient-to-r from-[#18BC9C] to-[#16A085] hover:from-[#16A085] hover:to-[#18BC9C] text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <svg
                className="absolute h-6 w-6 text-white animate-spin"
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
            ) : (
              "Update Profile"
            )}
          </Button>
        </form>

        <div className="mt-4 text-gray-700 dark:text-gray-300">
          <span className="font-medium">📧 Current Email:</span> {user.email}
        </div>

        <Button
          className="w-full mt-4 bg-[#F39C12] hover:bg-[#E67E22] text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
