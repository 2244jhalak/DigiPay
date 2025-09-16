"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useGetWalletQuery, useCashOutMutation } from "@/redux/walletSlice";
import { getUser } from "@/utilities/Auth";

export default function CashOut() {
  const user = getUser();
  const { data: walletData, isLoading: walletLoading, refetch } = useGetWalletQuery(user?.id ?? undefined, {
    skip: !user?.id,
  });

  const [amount, setAmount] = useState<number | "">("");
  const [receiverId, setReceiverId] = useState<string>("");
  const [cashOut, { isLoading: cashOutLoading }] = useCashOutMutation();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!receiverId) {
      Swal.fire({
        icon: "error",
        title: "Receiver Required",
        text: "Please enter the recipient's user ID.",
        confirmButtonColor: "#FF6B35",
      });
      return;
    }

    if (!amount || amount <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Please enter a valid amount to cash Out.",
        confirmButtonColor: "#FF6B35",
      });
      return;
    }

    try {
      const result = await cashOut({ amount, toAuthId: receiverId }).unwrap();
      console.log(result)

      Swal.fire({
        icon: "success",
        title: "Cash Out!",
        text: `You cash out ৳${amount} to user ${receiverId}. Your new balance: ৳${result.agentBalance}`,
        confirmButtonColor: "#18BC9C",
      });

      setAmount("");
      setReceiverId("");
      refetch(); // Refresh balance
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Cash In Failed",
        text: err?.data?.message || err?.message || "Something went wrong",
        confirmButtonColor: "#FF6B35",
      });
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-10 shadow-2xl rounded-3xl bg-gradient-to-tr from-white/30 to-white/10 backdrop-blur-lg border border-white/20">
      <CardHeader className="flex flex-col items-center gap-4 p-6">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Cash Out</CardTitle>
        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
          Current Balance:{" "}
          {walletLoading ? (
            <svg
              className="h-5 w-5 text-[#18BC9C] animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <span className="font-semibold text-[#18BC9C]">৳{walletData?.wallet?.balance ?? 0}</span>
          )}
        </p>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleSend} className="space-y-4">
          <Input
            type="text"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            placeholder="Recipient Auth ID"
            className="bg-white/20 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#18BC9C] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            required
          />
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount to send"
            className="bg-white/20 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#18BC9C] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            required
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              disabled={cashOutLoading}
              className="relative w-full bg-gradient-to-r from-[#18BC9C] to-[#16A085] hover:from-[#16A085] hover:to-[#18BC9C] text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              {cashOutLoading ? (
                <svg
                  className="absolute h-6 w-6 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                "Cash Out Now"
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}
