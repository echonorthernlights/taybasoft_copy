import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice"

const store = configureStore({
  reducer: {
    // we don't add productsApiSlice and usersApiSlice, because they are children of apiSlice
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store
