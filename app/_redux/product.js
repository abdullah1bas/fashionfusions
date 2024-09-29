// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBase = process.env.NEXT_PUBLIC_API_BASE 

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    // @ts-ignore
    baseUrl: apiBase,
  }),
  endpoints: (builder) => ({
    getproductsByName: builder.query({
      query: (name) => `${name}`,
    }),
  }),
});

// useGetproductsByNameQuery(complete Url)
export const { useGetproductsByNameQuery } = productApi;
