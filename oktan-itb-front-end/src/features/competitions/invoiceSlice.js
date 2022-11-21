const { apiSlice } = require("../../app/apiSlice");


export const invoiceSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getMyInvoices: builder.query({
            query: ({ memberId }) => {
                return {
                    url: `/invoices/members/${memberId}`,
                    method: 'GET'
                }
            }
        }),


        sendInvoice: builder.mutation({
            query: ({ memberId, competitionId }) => {
                return {
                    url: `/invoices/members/${memberId}/competitions/${competitionId}`,
                    method: 'POST'
                }
            }
        }),

        savePayments: builder.mutation({
            query: ({ memberId, competitionId, body }) => {
                return {
                    url: `/invoices/members/${memberId}/competitions/${competitionId}`,
                    method: 'PUT',
                    body: body
                }
            }
        }),

        getInvoiceByMemberAndCompetitionId: builder.query({
            query: ({ memberId, competitionId }) => {
                return {
                    url: `/invoices/members/${memberId}/competitions/${competitionId}`,
                    method: 'GET'
                }
            }
        }),



        submitPayments: builder.mutation({
            query: ({ memberId, competitionId, body }) => {
                return {
                    url: `/invoices/members/${memberId}/competitions/${competitionId}/proof`,
                    method: 'POST',
                    body: body
                }
            }
        }),
        uploadPaymentProof: builder.mutation({
            query: ({ memberId, competitionId, body }) => {
                return {
                    url: `/invoices/members/${memberId}/competitions/${competitionId}/proof`,
                    method: 'PUT',
                    body: body
                }
            }
        }),
        removePaymentProof: builder.mutation({
            query: ({ memberId, competitionId }) => {
                return {
                    url: `/invoices/members/${memberId}/competitions/${competitionId}/proof`,
                    method: 'DELETE'
                }
            }
        }),


        getInvoicesLog: builder.query({
            query: (params) => {
                return {
                    url: `/invoices/moderators`,
                    method: 'GET',
                    params: params
                }
            }
        }),

        getInvoiceById: builder.query({
            query: ({ invoiceId }) => {
                return {
                    url: `/invoices/moderators/${invoiceId}`,
                    method: 'GET'
                }
            }
        }),
        verifyPayments: builder.mutation({
            query: ({ invoiceId, body }) => {
                return {
                    url: `/invoices/moderators/${invoiceId}`,
                    method: 'PUT',
                    body: body
                }
            }
        }),



    })
})

export const {
    useGetInvoiceByIdQuery,
    useGetInvoiceByMemberAndCompetitionIdQuery,
    useGetInvoicesLogQuery,
    useGetMyInvoicesQuery,
    useRemovePaymentProofMutation,
    useSendInvoiceMutation,
    useSavePaymentsMutation,
    useVerifyPaymentsMutation,
    useUploadPaymentProofMutation,
    useSubmitPaymentsMutation,



} = invoiceSlice