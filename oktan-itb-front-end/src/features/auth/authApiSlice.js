const { apiSlice } = require("../../app/apiSlice");


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login', 
                method: 'POST',
                body: {...credentials}
            })
        }), 

        register: builder.mutation({
            query: credentials => ({
                url: '/register', 
                method: 'POST',
                body: {...credentials}
            })
        }), 

        getProfile: builder.query({
            query: () => ({
                url: '/me',
                method: 'GET'
            })
        }), 

        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'DELETE'
            })
        }), 

        resendEmail: builder.mutation({
            query: (id) => ({
                url: `/validation/${id}`,
                method: 'POST'
            })
        })
    })
})


export const {
    useLoginMutation,
    useGetProfileQuery,
    useLogoutMutation,
    useRegisterMutation,
    useResendEmailMutation
} = authApiSlice