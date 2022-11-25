import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../config'

export const memberApi = createApi({
    reducerPath: 'competitions',
    baseQuery: fetchBaseQuery({ 
        baseUrl: API_URL + '/v1/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.user.token
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),
   
    endpoints: (builder) => ({
        
    })
})


export const {
} = memberApi