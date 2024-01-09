"use client"
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import type { RootState } from "@/app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  tagTypes: [
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).auth.token;
      if (token && endpoint !== "downloadCompanyFile") {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  refetchOnFocus: true,
});

export default api;
