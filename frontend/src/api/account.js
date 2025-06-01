import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const getAccountsApi = async () => {
    try {
        const response = await axios.get(`${API_URL}/accounts`, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching the data", error);
        throw error;
    }
};

export const createAccountApi = async (accountData) => {
    try {
        const response = await axios.post(`${API_URL}/accounts`, accountData, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error creating the account", error);
        throw error;
    }
};

export const updateAccountApi = async (accountId, accountData) => {
    try {
        const response = await axios.put(`${API_URL}/accounts/${accountId}`, accountData, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error updating the account", error);
        throw error;
    }
};

export const deleteAccountApi = async (accountId) => {
    try {
        const response = await axios.delete(`${API_URL}/accounts/${accountId}`, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting the account", error);
        throw error;
    }
};