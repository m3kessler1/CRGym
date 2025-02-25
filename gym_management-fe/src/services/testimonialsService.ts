import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL + "/testimonials";

interface Testimonial {
  coachId: string;
  firstName: string;
  lastName: string;
  rating: number;
  feedback: string;
  workoutId: string;
  isCoach: boolean;
}

export const getTestimonials = async (coachId: string) => {
  const response = await axios.get(`${BASE_URL}/${coachId}`);
  return response.data;
};

export const addTestimonial = async (testimonialData: Testimonial) => {
  console.log("testimonialData", testimonialData);
  try {
    const response = await axios.post(`${BASE_URL}`, testimonialData);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error creating testimonial:", error);
    throw error; // Rethrow the error for further handling
  }
};