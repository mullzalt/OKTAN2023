const { apiSlice } = require("../../app/apiSlice");


export const participantSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getParticipants: builder.query({
            query: ({ competitionId, params }) => {
                const { where, status, paid, size, page } = params
                const id = competitionId
                return {
                    url: `/competitions/${id}/members/`,
                    method: 'GET',
                    params: { where, status, paid, size, page }
                }
            }
        }),

        getParticipantById: builder.query({
            query: ({ competitionId, memberId }) => {
                return {
                    url: `/competitions/${competitionId}/members/${memberId}`,
                    method: 'GET'
                }
            }
        })


    })
})

export const {
    useGetParticipantsQuery,
    useGetParticipantByIdQuery
} = participantSlice