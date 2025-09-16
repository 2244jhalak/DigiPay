import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetTransactionsQuery } from "@/redux/transactionsSlice";
import { getUser } from "@/utilities/Auth";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function UserTransactions() {
  const user = getUser();
  const { data, isLoading, isError, refetch } = useGetTransactionsQuery(user?.id, {
    skip: !user?.id,
  });

  useEffect(() => {
    refetch();
    const interval = setInterval(() => {
      refetch();
    }, 100);

    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
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
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 font-medium">
        Failed to load transactions.
      </div>
    );
  }

  const transactions = data?.transactions || [];

  return (
    <Card className="w-full max-w-6xl mx-auto mt-10 shadow-2xl rounded-3xl bg-gradient-to-tr from-white/30 to-white/10 backdrop-blur-lg border border-white/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
          Transactions History
        </CardTitle>
      </CardHeader>

      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No transactions found
          </p>
        ) : (
          <div className="h-[calc(100vh-300px)] overflow-auto space-y-4">
            {/* Mobile stacked card view */}
            <div className="flex flex-col space-y-4 md:hidden">
              {transactions.map((tx: any, index: number) => (
                <motion.div
                  key={tx._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Date:</span>
                    <span>{new Date(tx.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Type:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        tx.type === "topup"
                          ? "bg-green-100 text-green-700"
                          : tx.type === "withdraw"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">From:</span>
                    <span>{tx.from?.authId?.name || "-"}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">To:</span>
                    <span>{tx.to?.authId?.name || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Amount:</span>
                    <span>৳{tx.amount}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop/tablet table view */}
            <div className="hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#76a79d] text-gray-700 dark:text-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">From</th>
                    <th className="p-3">To</th>
                    <th className="p-3 text-right">Amount (৳)</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx: any, index: number) => (
                    <motion.tr
                      key={tx._id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="p-3 text-gray-600 dark:text-gray-300">
                        {new Date(tx.createdAt).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            tx.type === "topup"
                              ? "bg-green-100 text-green-700"
                              : tx.type === "withdraw"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {tx.from?.authId?.name || "-"}
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {tx.to?.authId?.name || "-"}
                      </td>
                      <td className="p-3 text-right font-semibold text-gray-900 dark:text-gray-100">
                        ৳{tx.amount}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
