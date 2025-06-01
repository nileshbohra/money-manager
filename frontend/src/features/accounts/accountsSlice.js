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
        updateAccount: (state, action) => {
            const { id, updatedAccount } = action.payload;
            const accountIndex = state.value.findIndex(account => account.id === id);
            if (accountIndex !== -1)
                state.value[accountIndex] = updatedAccount;
            else
                console.error(`Account with id ${id} not found.`);
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

export const { addAccount, updateAccount, deleteAccount, setAccounts } = accountsSlice.actions;
export default accountsSlice.reducer;