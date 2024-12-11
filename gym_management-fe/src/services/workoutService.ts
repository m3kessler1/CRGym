import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const fetchWorkouts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/workouts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coaches:", error);
    throw error;
  }
};
