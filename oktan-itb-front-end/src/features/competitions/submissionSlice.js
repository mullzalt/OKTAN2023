const { apiSlice } = require("../../app/apiSlice");


export const submissionSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({


        createPaper: builder.mutation({
            query: ({ participantId }) => {
                return {
                    url: `/submissions/participants/${participantId}`,
                    method: 'POST'
                }
            }
        }),

        getPapersByParId: builder.query({
            query: ({ participantId }) => {
                return {
                    url: `/submissions/participants/${participantId}`,
                    method: 'GET'
                }
            }
        }),

        updatePaper: builder.mutation({
            query: ({ participantId, body }) => {
                return {
                    url: `/submissions/participants/${participantId}`,
                    method: 'PUT',
                    body: body
                }
            }
        }),

        submitPaper: builder.mutation({
            query: ({ participantId }) => {
                return {
                    url: `/submissions/participants/${participantId}/paper`,
                    method: 'POST'
                }
            }
        }),

        uploadPaper: builder.mutation({
            query: ({ participantId, body }) => {
                return {
                    url: `/submissions/participants/${participantId}/paper`,
                    method: 'PUT',
                    body: body
                }
            }
        }),

        removePaper: builder.mutation({
            query: ({ participantId }) => {
                return {
                    url: `/submissions/participants/${participantId}/paper`,
                    method: 'DELETE'
                }
            }
        }),

        reviewPaper: builder.mutation({
            query: ({ participantId, body }) => {
                return {
                    url: `/submissions/moderators/${participantId}/`,
                    method: 'PUT',
                    body: body
                }
            }
        }),

        getPapers: builder.query({
            query: (params) => {
                return {
                    url: `/submissions/moderators/`,
                    method: 'GET',
                    params: params
                }
            }
        }),


    })
})

export const {
    useCreatePaperMutation,
    useGetPapersByParIdQuery,
    useSubmitPaperMutation,
    useRemovePaperMutation,
    useReviewPaperMutation,
    useUpdatePaperMutation,
    useUploadPaperMutation,
    useGetPapersQuery,


} = submissionSlice