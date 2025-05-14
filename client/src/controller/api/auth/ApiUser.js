import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiUsers = createApi({
  reducerPath: "ApiUsers",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/users`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: ({ page, limit, search }) => ({
        url: `/get`,
        params: { page, limit, search },
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/update-profile`,
        method: "PUT",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetUsersMutation,
  useUpdateProfileMutation,
  useLogoutMutation,
} = ApiUsers;
