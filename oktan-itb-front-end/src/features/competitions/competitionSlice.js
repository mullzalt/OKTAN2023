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
            query: (id) => {
                return {
                    url: `/competitions/${id}`,
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
        })
    })
})

export const {
    useGetCompetitionsQuery,
    useGetCompetitionByIdQuery
} = competitionSlice