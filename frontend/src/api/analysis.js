import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

const getMonthlyAnalysis = async (categoryType) => {
    try {
        const response = await axios.post(`${API_URL}/analysis/monthly`, { category_type: categoryType }, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching the data", error);
        throw error;
    }
};
export { getMonthlyAnalysis };