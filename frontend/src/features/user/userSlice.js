import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {
            id: '',
            username: '',
            email: '',
            profile_picture: '',
            createdAt: '',
            updatedAt: ''
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        },
        updateUser: (state, action) => {
            state.value = { ...state.value, ...action.payload };
        }
    }
});
export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;