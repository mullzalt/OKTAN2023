const { apiSlice } = require("../../app/apiSlice");


export const notificationSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotificationsByMemberId: builder.query({
            query: ({ memberId, params }) => {
                const { about } = params
                return {
                    url: `/notifications/${memberId}`,
                    method: 'GET',
                    params: { about }
                }
            }
        }),

        getAnnoucement: builder.query({
            query: () => ({
                url: `/notifications`,
                method: 'GET',
            })
        }),

        sendAnnoucement: builder.mutation({
            query: (body) => ({
                url: `/notifications`,
                method: 'POST',
                body: body
            })
        }),

        sendNotification: builder.mutation({
            query: (body) => ({
                url: `/notifications`,
                method: 'PUT',
                body: body
            })
        }),

        deletedNotification: builder.mutation({
            query: ({ notificationId }) => ({
                url: `/notifications/${notificationId}`,
                method: 'DELETE',
            })
        })






    })
})

export const {
    useDeletedNotificationMutation,
    useGetAnnoucementQuery,
    useGetNotificationsByMemberIdQuery,
    useSendAnnoucementMutation,
    useSendNotificationMutation,

} = notificationSlice