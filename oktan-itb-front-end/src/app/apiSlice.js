import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setCredentials, destroyCredentials } from '../features/auth/authSlice'
import { API_URL } from '../config'


const baseQuery = fetchBaseQuery({
    baseUrl: API_URL + '/v1', 
    credentials: 'include', 
    prepareHeaders: (headers, {getState}) => {
        const token = getState()?.auth?.token ? getState().auth.token : null
        if(token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 401) {
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            const profile = api.getState().auth.profile
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data, user, profile }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } 
        else {
            api.dispatch(destroyCredentials())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})