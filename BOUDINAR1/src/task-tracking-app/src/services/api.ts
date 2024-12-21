import axios from 'axios';

const API_URL = 'https://your-api-url.com'; // Replace with your actual API URL

export const startActivity = async (description: string) => {
    try {
        const response = await axios.post(`${API_URL}/activities/start`, { description });
        return response.data;
    } catch (error) {
        throw new Error('Error starting activity: ' + error.message);
    }
};

export const getOngoingActivity = async () => {
    try {
        const response = await axios.get(`${API_URL}/activities/ongoing`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching ongoing activity: ' + error.message);
    }
};