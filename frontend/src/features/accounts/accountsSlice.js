import { createSlice } from "@reduxjs/toolkit";

const accountsSlice = createSlice({
    name: 'accounts',
    initialState: {
        value: []
    },
    reducers: {
        addAccount: (state, action) => {
            state.value.push(action.payload);
        },
        editAccount: (state, action) => {
            state.value = state.value.map(account => account.id === action.payload.id ? action.payload : account);
        },
        deleteAccount: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter(account => account.id !== id);
        },
        setAccounts: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { addAccount, editAccount, deleteAccount, setAccounts } = accountsSlice.actions;
export default accountsSlice.reducer;