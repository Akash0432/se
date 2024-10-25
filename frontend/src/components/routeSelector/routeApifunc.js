import axios from 'axios';

const baseURL = "http://localhost:8003/booking/"; // Set the base URL here

export const getRoutesFromApi = async ({ startCity, destination, date }) => {
    try {
        const response = await axios.post(baseURL, { startCity, destination, date });
        return response.data; // Return the relevant data from the response
    } catch (error) {
        console.error("Error fetching routes:", error);
        throw error; // Re-throw the error for further handling
    }
};
