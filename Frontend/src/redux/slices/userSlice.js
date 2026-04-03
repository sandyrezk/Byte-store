import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('currentToken')) ? true : false,
    token: JSON.parse(localStorage.getItem('currentToken')) || '',
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUsser(state, action) {
            state.user = action.payload
        },
        setLoggedInOut(state, action) {
            state.isLoggedIn = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        }
    }
})

const userReducer = userSlice.reducer
export const { setCurrentUsser, setLoggedInOut, setToken } = userSlice.actions
export default userReducer