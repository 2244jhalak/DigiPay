

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetWalletQuery } from "@/redux/walletSlice";
import { getUser } from "@/utilities/Auth";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";

export default function AdminWallet() {
  const user = getUser();

  const { data, isLoading, isError } = useGetWalletQuery(user?.id, {
    skip: !user?.id,
  });

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch wallet",
        text: "Please try again later",
        confirmButtonColor: "#FF6B35",
      });
    }
  }, [isError]);

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
    <Card className="w-full max-w-xl mx-auto mt-10 shadow-2xl rounded-3xl bg-gradient-to-tr from-[#18BC9C]/20 to-[#16A085]/20 backdrop-blur-lg border border-white/20">
      <CardHeader className="flex flex-col items-center gap-4 p-6">
        <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
          My Wallet
        </CardTitle>
        
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin h-12 w-12 text-[#18BC9C]" />
          </div>
        ) : data?.wallet ? (
          <>
            <div className="flex flex-col items-center bg-white/30 dark:bg-gray-800/40 rounded-2xl p-6 shadow-md">
               <span className="text-gray-500 dark:text-gray-300 text-sm">Current Balance</span>
               <span className="text-4xl font-bold text-gray-800 dark:text-white mt-2">
                 ৳{data.wallet.balance.toFixed(2)}
               </span>
            </div>


            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 dark:bg-gray-800/40 rounded-xl p-4 text-center shadow-md">
                <p className="text-gray-500 dark:text-gray-300 text-sm">Wallet ID</p>
                <p className="text-gray-800 dark:text-white font-semibold mt-1 truncate">{data.wallet.id}</p>
              </div>
              <div className="bg-white/20 dark:bg-gray-800/40 rounded-xl p-4 text-center shadow-md">
                <p className="text-gray-500 dark:text-gray-300 text-sm">Status</p>
                <p className={`mt-1 font-semibold ${data.wallet.isBlocked ? 'text-red-500' : 'text-green-500'}`}>
                  {data.wallet.isBlocked ? "Blocked" : "Active"}
                </p>
              </div>
              <div className="bg-white/20 dark:bg-gray-800/40 rounded-xl p-4 text-center shadow-md col-span-2">
                <p className="text-gray-500 dark:text-gray-300 text-sm">Created At</p>
                <p className="text-gray-800 dark:text-white font-semibold mt-1">
                  {new Date(data.wallet.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">No wallet found</p>
        )}
      </CardContent>
    </Card>
  );
}
