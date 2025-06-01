import { createSlice } from "@reduxjs/toolkit";

const authTokenSlice = createSlice({
    name: 'authToken',
    initialState: {
        value: null,
        isAuthenticated: false,
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.value = action.payload;
        },
        removeToken: (state) => {
            state.value = null;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        removeIsAuthenticated: (state) => {
            state.isAuthenticated = false;
        }
    }
})

export const { setAuthToken, removeToken, setIsAuthenticated, removeIsAuthenticated } = authTokenSlice.actions;

export default authTokenSlice.reducer;
