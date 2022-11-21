const { apiSlice } = require("../../app/apiSlice");


export const competitionSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCompetitions: builder.query({
            query: (params) => {
                const { where, category, drafted, enrolled } = params
                return {
                    url: `/competitions`,
                    params: { where, category, drafted, enrolled }
                }
            }
        }),

        getCompetitionById: builder.query({
            query: (payload) => {
                return {
                    url: `/competitions/${payload.id}`,
                    params: { checkEnroll: payload.checkEnroll || '' }
                }
            }
        }),

        saveCompetition: builder.mutation({
            query: ({ id, body }) => {
                return {
                    url: `/competitions/${id}`,
                    method: 'PUT',
                    body: body
                }
            }
        }),

        createEmptyCompetitions: builder.mutation({
            query: () => {
                return {
                    url: `/competitions/`,
                    method: 'POST',
                }
            }
        }),

        toogleArchiveCompetitions: builder.mutation({
            query: ({ id }) => {
                return {
                    url: `/competitions/${id}/publish`,
                    method: 'PUT',

                }
            }
        })
    })
})

export const {
    useGetCompetitionsQuery,
    useGetCompetitionByIdQuery,
    useCreateEmptyCompetitionsMutation,
    useSaveCompetitionMutation,
    useToogleArchiveCompetitionsMutation
} = competitionSlice