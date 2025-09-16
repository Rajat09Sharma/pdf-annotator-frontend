import { createSlice } from "@reduxjs/toolkit";

const initialState = { username: null, token: null }
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthToken(state, action) {
            state.token = action.payload.token;
            state.username = action.payload.username;
        },
        logout(state) {
            state.token = null;
            state.username = null;
        }
    }
});


export const authAction = authSlice.actions;
export default authSlice.reducer;
