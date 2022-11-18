const { apiSlice } = require("../../app/apiSlice");


export const participantSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getParticipants: builder.query({
            query: ({ competitionId, params }) => {
                const { where, status, paid, size, page } = params
                const id = competitionId
                return {
                    url: `/competitions/${id}/members/`,
                    params: { where, status, paid, size, page }
                }
            }
        })
    })
})

export const {
    useGetParticipantsQuery
} = participantSlice