"use client";

import { useState } from "react";
import { useCreateUserMutation } from "@/redux/userSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await createUser(form).unwrap();
      Swal.fire({
        icon: "success",
        title: res.message,
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/admin-dashboard/manage-users");
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        Create User
      </h2>
      <div className="space-y-4">
        <Input
          name="name"
          placeholder="Enter full name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          placeholder="Enter email address"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          placeholder="Enter password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full font-semibold"
        >
          {isLoading ? <div className="flex justify-center items-center h-40">
        <svg
          className="h-8 w-8 text-[#18BC9C] animate-spin"
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
      </div> : "Create User"}
        </Button>
      </div>
    </div>
  );
}
