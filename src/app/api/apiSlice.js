import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pairshead-start.onrender.com' }),
    tagTypes: ['Crew', 'User'],
    // eslint-disable-next-line no-unused-vars
    endpoints: builder => ({})
})