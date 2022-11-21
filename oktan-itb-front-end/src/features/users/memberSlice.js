const { apiSlice } = require("../../app/apiSlice");


export const memberSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMembers: builder.query({
            query: (params) => {
                return {
                    url: `/members`,
                    method: 'GET',
                    params: params
                }
            }
        }),

        getMemberById: builder.query({
            query: ({ id }) => {
                return {
                    url: `/members/${id}`,
                    method: 'GET'
                }
            }
        }),

    })
})

export const {
    useGetMemberByIdQuery,
    useGetMembersQuery
} = memberSlice