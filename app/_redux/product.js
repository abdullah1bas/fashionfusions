// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBase = process.env.NEXT_PUBLIC_API_BASE 

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({baseUrl: apiBase, }),
  endpoints: (builder) => ({
    getProductsByName: builder.query({
      query: (name) => `${name}`,
      // transformResponse: (response) => {
      //   console.log(response);
      // }
    }),
  }),
});

// useGetProductsByNameQuery(complete Url)
export const { useGetProductsByNameQuery } = productApi;
