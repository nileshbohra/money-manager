import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


export const getTransactionsApi = async () => {
    try {
        const response = await axios.get(`${API_URL}/transactions`, {
            withCredentials: true, // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};
export const addTransactionApi = async (transactionData) => {
    try {
        const response = await axios.post(
            `${API_URL}/transactions/add`,
            transactionData,
            {
                withCredentials: true, // Ensure cookies are sent with the request
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding transaction:", error);
        throw error;
    }
};
export const editTransactionApi = async (transactionData) => {
    try {
        const response = await axios.post(
            `${API_URL}/transactions/edit`,
            transactionData,
            {
                withCredentials: true, // Ensure cookies are sent with the request
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error editing transaction:", error);
        throw error;
    }
};
export const deleteTransactionApi = async (transactionId) => {
    try {
        const response = await axios.post(
            `${API_URL}/transactions/delete`,
            { id: transactionId },
            {
                withCredentials: true, // Ensure cookies are sent with the request
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting transaction:", error);
        throw error;
    }
};