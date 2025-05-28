import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

const getAnalysis = async () => {
    try {
        const response = await axios.get(`${API_URL}/analysis`, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching the data", error);
        throw error;
    }
};
export { getAnalysis };