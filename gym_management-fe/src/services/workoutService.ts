import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL_WORKOUT;
interface WorkoutSearchParams {
  activity: string;
  time: string;
  date: string;
  coach: string;
} // Backend URL

export const bookWorkout = async (userId: string, coachId: string, date: string, time: string, activity: string, status: string) => {
  console.log(userId, coachId, date, time, activity, status);
  try {
    const response = await axios.post(`${BASE_URL}/book`, {
      userId,
      coachId,
      date,
      time,
      activity,
      status
    });
    return response.data;
  } catch ( error) {
    console.error("Error booking workout:", error);
    throw error;
  }
};

export const getBookedWorkoutsByUsers = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booked workouts:", error);
    throw error;
  }
};


export const cancelWorkout = async (workoutId: string) => {
  console.log("workoutId : ", workoutId);
  try {
    const response = await axios.patch(`${BASE_URL}/${workoutId}/cancel`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling workout:", error);
    throw error;
  }
};

export const waitingForFeedback = async (workoutId: string) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${workoutId}/waiting-for-feedback`);
    return response.data;
  } catch (error) {
    console.error("Error waiting for feedback:", error);
    throw error;
  }
};



