const { apiSlice } = require("../../app/apiSlice");


export const enrollSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        postEmpyEnroll: builder.mutation({
            query: ({ competitionId, memberId }) => {
                return {
                    url: `/competitions/${competitionId}/members/${memberId}`,
                    method: 'POST',
                }
            }
        }),

        updateEnroll: builder.mutation({
            query: ({ competitionId, memberId, body }) => {
                return {
                    url: `/competitions/${competitionId}/members/${memberId}`,
                    method: 'PUT',
                    body: body
                }
            }
        }),

        uploadEnrollCard: builder.mutation({
            query: ({ competitionId, memberId, body }) => {
                return {
                    url: `/competitions/${competitionId}/members/${memberId}/card`,
                    method: 'PUT',
                    body: body
                }
            }
        }),

        removeEnrollCard: builder.mutation({
            query: ({ competitionId, memberId, body }) => {
                return {
                    url: `/competitions/${competitionId}/members/${memberId}/card`,
                    method: 'DELELTE',
                    body: body
                }
            }
        }),

        verifyEnroll: builder.mutation({
            query: ({ competitionId, memberId, body }) => {
                return {
                    url: `/competitions/${competitionId}/members/${memberId}/verify`,
                    method: 'PUT',
                    body: body
                }
            }
        }),






    })
})

export const {
    usePostEmpyEnrollMutation,
    useUpdateEnrollMutation,
    useUploadEnrollCardMutation,
    useRemoveEnrollCardMutation,
    useVerifyEnrollMutation
} = enrollSlice