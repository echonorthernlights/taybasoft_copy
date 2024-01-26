// Slices are a way to organize application state => collection of actions and reducers related to
//each other we can create multiple slices in our app and each slice can have it own state

// API slice is basically the parent to our other api slices
//---- we can use {createSlice} for regular slices (not async request), since we are dealing with
// backend we use {createApi} which behave differently

// {fetchBaseQuery} => allows us to make request to backen API
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  prepareHeaders(headers) {
    return headers
  },
  credentials: "include",
})

export const apiSlice = createApi({
  baseQuery,
  //tagTypes => used to define the types of data will be fetching from the API
  tagTypes: ["Packs", "Subscriptions", "Subscribers", "Users"],
  endpoints: (builder) => ({}),
  middleware: (baseQuery) => (fetchArgs, api, extraOptions) => {
    if (extraOptions.signal) {
      fetchArgs.signal = extraOptions.signal
    }
    // Include credentials: 'include'
    fetchArgs.credentials = "include"
    return baseQuery(fetchArgs, api, extraOptions)
  },
})
