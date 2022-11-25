import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../config'

export const competitionApi = createApi({
    reducerPath: 'competitions',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + '/v1/',
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
        getCompetitionById: builder.query({
            query: (id) => ({
                url: `competitions/${id}`,
                method: 'GET'
            })
        }),

        getCompetitions: builder.query({
            query: (param = null) => ({
                url: `competitions${param ? `?${param}` : ''}`,
                method: 'GET'
            })
        }),

        getMyStatus: builder.query({
            query: (id) => ({
                url: `competitions/${id}/me`,
                method: 'GET'
            })
        }),

        getMyPaper: builder.query({
            query: (id) => ({
                url: `competitions/${id}/submissions/me`,
                method: 'GET'
            })
        }),

        enrollCompetition: builder.mutation({
            query: (payload) => ({
                url: `competitions/${payload.id}/enroll`,
                method: 'POST',
                body: payload.body
            })
        }),

        getParticipantCard: builder.query({
            query: (payload) => ({
                url: `competitions/${payload.competitionId}/card/${payload.memberId}`,
                method: 'GET'
            })
        })

    })
})


export const {
    useGetCompetitionByIdQuery,
    useGetCompetitionsQuery,
    useGetMyStatusQuery,
    useGetMyPaperQuery,
    useEnrollCompetitionMutation,
    useGetParticipantCardQuery


} = competitionApi