import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "./product";
import cartReducer from "./cartSlice";
import changeAPISlice from "./changeAPISlice";

export const store = configureStore({
  reducer: {
    dataAPI: changeAPISlice,
    //  "cart" ======>  useSelector
    cart: cartReducer,
    // Add the generated reducer as a specific top-level slice
    [productApi.reducerPath]: productApi.reducer,
    // [oneproductsApi.reducerPath]: oneproductsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      // .concat(oneproductsApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);