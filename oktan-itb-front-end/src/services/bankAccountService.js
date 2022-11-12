import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../config'

export const banksApi = createApi({
    reducerPath: 'banks',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + '/v1/banks',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.user.token
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,

    endpoints: (builder) => ({
        createBank: (builder).mutation({
            query: (payload) => ({
                url: '/',
                method: 'POST',
                body: payload
            })
        }),
        updateBank: (builder).mutation({
            query: (payload) => ({
                url: `/${payload.id}`,
                method: 'PUT',
                body: payload.body
            })
        }),

        deleteBank: (builder).mutation({
            query: (payload) => ({
                url: `/${payload.id}`,
                method: 'DELETE',
                body: payload.body
            })
        }),

        getBanks: (builder).query({
            query: (payload = '') => ({
                url: `/?where=${payload}`,
                method: 'GET',
            })
        }),

        getOneBank: (builder).query({
            query: (payload) => ({
                url: `/${payload.id}`,
                method: 'GET',
            })
        }),

    })
})


export const {
    useCreateBankMutation,
    useDeleteBankMutation,
    useGetBanksQuery,
    useGetOneBankQuery,
    useUpdateBankMutation
} = banksApi