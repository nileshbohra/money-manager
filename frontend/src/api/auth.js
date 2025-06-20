import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

const registerApi = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user", error);
        throw error;
    }
};

const loginApi = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in", error);
        throw error;
    }
};

const checkLoginApi = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/check`, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error checking login status", error);
        throw error;
    }
};

const logoutApi = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/logout`, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error logging out", error);
        throw error;
    }
};

const googleOAuthLoginApi = async (idToken) => {
    try {
        const response = await axios.post(`${API_URL}/auth/google`, { id_token: idToken }, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in with Google", error);
        throw error;
    }
};

export { registerApi, loginApi, checkLoginApi, logoutApi, googleOAuthLoginApi };