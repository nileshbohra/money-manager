import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getUserApi = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`, {
            withCredentials: true, // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};