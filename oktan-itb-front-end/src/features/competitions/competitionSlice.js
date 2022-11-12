const { apiSlice } = require("../../app/apiSlice");


export const competitionSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCompetitions: builder.query({
            query: (params) => {
                const {where, visible, isEnrolled} = params
                return{
                    url: `/competitions`,
                    params: {where, visible, isEnrolled}
                }
            }
        }), 

        getCompetitionById: builder.query({
            query: (id) => {
                return{
                    url: `/competitions/${id}`,
                }
            }
        }), 
    })
})

export const {
    useGetCompetitionsQuery, 
    useGetCompetitionByIdQuery
} = competitionSlice