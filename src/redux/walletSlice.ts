import type { WalletType } from "@/types/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ReactNode } from "react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_LINK}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Wallet", "Transactions"],
  endpoints: (builder) => ({
    // ✅ Get wallet (self or by authId)
    getWallet: builder.query<
      { isBlocked: any; balance: ReactNode; wallet: WalletType },
      { authId?: string } | void
    >({
      query: (arg) => {
        const url = arg?.authId ? `/wallet/${arg.authId}` : `/wallet/me`;
        return { url, method: "GET" };
      },
      providesTags: ["Wallet"],
    }),

    // ✅ Get wallet by authId
    getWalletByAuthId: builder.query<{ wallet: WalletType }, { authId: string }>({
      query: ({ authId }) => ({
        url: `/wallet/${authId}`,
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),

    // ✅ Toggle block/unblock wallet
    toggleWalletBlock: builder.mutation<
      { message: string; wallet: WalletType },
      { walletId: string }
    >({
      query: ({ walletId }) => ({
        url: `/wallet/block/${walletId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Wallet"],
    }),

    // ✅ Top-up
    topUp: builder.mutation({
      query: (amount: number) => ({
        url: "/wallet/topup",
        method: "POST",
        body: { amount },
      }),
      invalidatesTags: ["Wallet", "Transactions"],
    }),

    // ✅ Withdraw
    withdraw: builder.mutation({
      query: (amount: number) => ({
        url: "/wallet/withdraw",
        method: "POST",
        body: { amount },
      }),
      invalidatesTags: ["Wallet", "Transactions"],
    }),

    // ✅ Send money
    sendMoney: builder.mutation({
      query: ({ amount, toAuthId }: { amount: number; toAuthId: string }) => ({
        url: "/wallet/send",
        method: "POST",
        body: { amount, toAuthId },
      }),
      invalidatesTags: ["Wallet", "Transactions"],
    }),

    // ✅ Cash-in
    cashIn: builder.mutation({
      query: ({ amount, toAuthId }: { amount: number; toAuthId: string }) => ({
        url: "/wallet/cash-in",
        method: "POST",
        body: { amount, toAuthId },
      }),
      invalidatesTags: ["Wallet", "Transactions"],
    }),

    // ✅ Cash-out
    cashOut: builder.mutation({
      query: ({ amount, toAuthId }: { amount: number; toAuthId: string }) => ({
        url: "/wallet/cash-out",
        method: "POST",
        body: { amount, toAuthId },
      }),
      invalidatesTags: ["Wallet", "Transactions"],
    }),
  }),
});

export const {
  useGetWalletQuery,
  useGetWalletByAuthIdQuery,
  useToggleWalletBlockMutation, // ✅ new hook
  useTopUpMutation,
  useWithdrawMutation,
  useSendMoneyMutation,
  useCashInMutation,
  useCashOutMutation,
} = walletApi;
