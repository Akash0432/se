import axios from 'axios';

export const getRoutesFromApi = async ({ startCity, destination, date }) => {
    return await axios.post('/api/buses/available', {
        startCity,
        destination,
        date
    });
};
