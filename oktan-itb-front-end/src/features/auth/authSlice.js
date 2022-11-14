import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: '', token: '', profile: '' },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, profile } = action.payload
            state.user = user
            state.token = accessToken
            state.profile = profile
        },
        destroyCredentials: (state, action) => {
            state.user = ''
            state.token = ''
            state.profile = ''
        }
    },
})

export const { setCredentials, destroyCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentProfile = (state) => state.auth.profile