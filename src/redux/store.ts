import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authSlice";
import { walletApi } from "./walletSlice"; 
import { transactionApi } from "./transactionsSlice";
import { userApi } from "./userSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer, 
    [transactionApi.reducerPath]: transactionApi.reducer, 
    [userApi.reducerPath]: userApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(walletApi.middleware)
      .concat(transactionApi.middleware)
      .concat(userApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
