import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../features/category/categorySlice";
import transactionSlice from "../features/transaction/transactionSlice";
import authTokenSlice from "../features/authToken/authTokenSlice"
import accountsSlice from "../features/accounts/accountsSlice";
import userSlice from "../features/user/userSlice";

const store = configureStore({
    reducer: {
        category: categorySlice,
        transaction: transactionSlice,
        authToken: authTokenSlice,
        accounts: accountsSlice,
        user: userSlice,
    }
})

export default store;