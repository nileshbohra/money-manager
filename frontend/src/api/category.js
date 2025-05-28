import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

const getCategoriesApi = async () => {
    try {
        const response = await axios.get(`${API_URL}/category/`, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching the data", error);
        throw error;
    }
};

const addNewCategoryApi = async (categoryData) => {
    try {
        const response = await axios.post(`${API_URL}/category/add`, categoryData, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error adding category", error);
        throw error;
    }
};

const editCategoryApi = async (id, categoryName, categoryType) => {
    try {
        const response = await axios.post(`${API_URL}/category/edit`, { id, categoryName, categoryType }, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error editing category", error);
        throw error;
    }
};

const deleteCategoryApi = async (categoryId) => {
    try {
        const response = await axios.post(`${API_URL}/category/delete`, { id: categoryId }, {
            withCredentials: true // Ensure cookies are sent with the request
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting category", error);
        throw error;
    }
};

export { getCategoriesApi, addNewCategoryApi, editCategoryApi, deleteCategoryApi };