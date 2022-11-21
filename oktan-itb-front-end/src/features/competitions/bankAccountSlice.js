const { apiSlice } = require("../../app/apiSlice");


export const bankSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        createBank: builder.mutation({
            query: ({ body }) => {
                return {
                    url: `/banks/`,
                    method: 'POST',
                    body: body
                }
            }
        }),

        getBanks: builder.query({
            query: ({ params }) => {
                return {
                    url: `/banks/`,
                    method: 'GET',
                    params: params
                }
            }
        }),

        getBankById: builder.query({
            query: (id) => {
                return {
                    url: `/banks/${id}`,
                    method: 'GET',
                }
            }
        }),

        updateBank: builder.mutation({
            query: ({ id, body }) => {
                return {
                    url: `/banks/${id}`,
                    method: 'PUT',
                    body: body
                }
            }
        }),

        deleteBank: builder.mutation({
            query: ({ id, body }) => {
                return {
                    url: `/banks/${id}`,
                    method: 'DELETE',
                    body: body
                }
            }
        }),


    })
})

export const {

    useCreateBankMutation,
    useUpdateBankMutation,
    useGetBankByIdQuery,
    useGetBanksQuery,
    useDeleteBankMutation
} = bankSlice