import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../config'

export const invoiceApi = createApi({
    reducerPath: 'invoices',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + '/v1/invoices',
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
        sendInvoce: builder.mutation({
            query: (competitionId) => ({
                url: `/me/${competitionId}`,
                method: 'POST'
            })
        }),

        getMyInvoices: builder.query({
            query: (param = null) => ({
                url: `/me/?status=${param ? `${param}` : ''}`,
                method: 'GET'
            })
        }),

        getInvoice: builder.query({
            query: (id) => ({
                url: `/get/${id}`,
                method: 'GET'
            })
        }),

        uploadPaymentProof: builder.mutation({
            query: (payload) => ({
                url: `/me/${payload.id}/submit`,
                method: 'PUT',
                body: payload.body
            })
        }),

        updatePaymentProof: builder.mutation({
            query: (payload) => ({
                url: `/me/${payload.id}/update`,
                method: 'PUT',
                body: payload.body
            })
        }),

        setPaymentStatus: builder.mutation({
            query: (payload) => ({
                url: `/set/${payload.id}/`,
                method: 'PUT',
                body: payload.body
            })
        }),

        getPaymentLog: builder.query({
            query: (param) => ({
                url: `/?where=${param.where}&status=${param.status}&page=${param.page}&size=${param.size}`,
                method: 'GET'
            })
        }),
    })
})


export const {
    useSendInvoceMutation,
    useGetMyInvoicesQuery,
    useGetInvoiceQuery,
    useUploadPaymentProofMutation,
    useSetPaymentStatusMutation,
    useGetPaymentLogQuery,
    useUpdatePaymentProofMutation,
} = invoiceApi