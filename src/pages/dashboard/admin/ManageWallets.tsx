"use client";

import { useState } from "react";
import {
  useGetWalletQuery,
  useToggleWalletBlockMutation,
} from "@/redux/walletSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wallet } from "lucide-react";
import Swal from "sweetalert2";

export default function ManageWallets() {
  const [authId, setAuthId] = useState("");
  const [searchId, setSearchId] = useState("");

  const { data: wallet, isLoading, isError, refetch } = useGetWalletQuery(
    { authId: searchId },
    { skip: !searchId }
  );

  const [toggleWalletBlock, { isLoading: isToggling }] =
    useToggleWalletBlockMutation();

  const handleSearch = () => {
    if (authId.trim()) {
      setSearchId(authId.trim());
    }
  };

  const handleToggleBlock = async () => {
    if (!wallet?.wallet?.id) return;

    try {
      const res = await toggleWalletBlock({ walletId: wallet.wallet.id }).unwrap();

      Swal.fire({
        icon: "success",
        title: res.message,
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
        Manage Any User&apos;s Wallet
      </h1>

      {/* Search Box */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Enter Auth ID..."
          value={authId}
          onChange={(e) => setAuthId(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch} className="w-full sm:w-auto">
          Search
        </Button>
      </div>

      {/* Wallet Info */}
      <Card className="shadow-lg border border-gray-200 dark:border-gray-800 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 dark:from-gray-900/50 dark:to-gray-800/40 backdrop-blur-md">
        <CardHeader className="flex flex-row items-center gap-2">
          <Wallet className="w-6 h-6 text-primary" />
          <CardTitle className="text-lg font-semibold">
            Wallet Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading && (
            <div className="flex justify-center items-center py-6">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}

          {isError && !isLoading && (
            <p className="text-red-500 text-center">
              Wallet not found or error occurred.
            </p>
          )}

          {wallet?.wallet && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{wallet.wallet.user?.name}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium break-all">
                  {wallet.wallet.user?.email}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500">Balance</p>
                <p className="text-lg font-bold text-green-600">
                  ৳ {wallet.wallet.balance.toFixed(2)}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500">Status</p>
                <Badge
                  className={`px-3 py-1 text-xs ${
                    wallet.wallet.isBlocked
                      ? "bg-red-500 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {wallet.wallet.isBlocked ? "Blocked" : "Active"}
                </Badge>
              </div>

              {/* Toggle Button */}
              <div className="sm:col-span-2 flex justify-center mt-4">
                <Button
                  onClick={handleToggleBlock}
                  variant={wallet.wallet.isBlocked ? "default" : "destructive"}
                  disabled={isToggling}
                >
                  {isToggling ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : wallet.wallet.isBlocked ? (
                    "Unblock Wallet"
                  ) : (
                    "Block Wallet"
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
