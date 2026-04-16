import { getCookie } from "@/utils/auth-client";
import { ACCESS_TOKEN_COOKIE } from "@/utils/auth-shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = getCookie(ACCESS_TOKEN_COOKIE);
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseApi1 = createApi({
  reducerPath: "baseApi1",
  baseQuery,
  tagTypes: ["auth", "student", "reviews", "wishlist", "cart", "courses"],
  endpoints: () => ({}),
});

export default baseApi1;