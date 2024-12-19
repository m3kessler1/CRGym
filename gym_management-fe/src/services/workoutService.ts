import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const fetchWorkouts = async (data: any) => {
  try { 
    const response = await axios.get(
      `${BASE_URL}/workouts/available/?sport=${data.activity}&time=${data.time}&date=${data.date}&coach=${data.coach}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    throw error;
  }
};

export const fetchBookedWorkouts = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/workouts/booked`, {
      headers: {
        Authorization: `Bearer ${token}`,
    },
  });
    return response.data;
  } catch (error) {
    console.error("Error fetching booked workouts:", error);
    throw error;
  }
};

export const fetchUserWorkouts = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/workouts/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
    },
  });
    return response.data;
  } catch (error) {
    console.error("Error fetching user workouts:", error);
    throw error;
  }
};

export const cancelWorkout = async (workoutId: string, token: string) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/workouts/booked/${workoutId}`, {
        // Add any necessary body data here if required by your API
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error cancelling workout:", error);
    throw error;
  }
};
