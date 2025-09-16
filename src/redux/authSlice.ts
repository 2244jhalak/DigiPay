import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
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
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    updateProfile: builder.mutation({
      query: ({ authId, ...data }) => ({
        url: `/auth/updateProfile/${authId}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    
    getAllUsers: builder.query({
      query: () => ({
        url: "/auth/all",
        method: "GET",
      }),
    }),

   
    toggleUserBlock: builder.mutation({
      query: (authId: string) => ({
        url: `/auth/block/${authId}`,
        method: "PATCH",
      }),
    }),

    
    toggleAgent: builder.mutation({
      query: (authId: string) => ({
        url: `/auth/agentApprove/${authId}`,
        method: "PATCH",
      }),
    }),

    
    toggleUserRole: builder.mutation({
      query: (authId: string) => ({
        url: `/auth/changeRole/${authId}`,
        method: "PATCH",
      }),
    }),
    
    getAllAuthIds: builder.query({
      query: () => ({
        url: "/auth/auth-ids",
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useRegisterUserMutation, 
  useLoginUserMutation, 
  useUpdateProfileMutation, 
  useGetAllUsersQuery,
  useToggleUserBlockMutation,  
  useToggleAgentMutation,       
  useToggleUserRoleMutation,
  useGetAllAuthIdsQuery,     
} = authApi;
