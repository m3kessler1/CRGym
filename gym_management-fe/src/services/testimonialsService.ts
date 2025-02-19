import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL + "/testimonials";

interface Testimonial {
  coachId: string;
  firstName: string;
  lastName: string;
  rating: number;
  feedback: string;
  workoutId: string;
}

export const getTestimonials = async (coachId: string) => {
  const response = await axios.get(`${BASE_URL}/${coachId}`);
  return response.data;
};

export const addTestimonial = async (testimonial: Testimonial) => {
  const response = await axios.post(`${BASE_URL}`, testimonial);
  return response.data;
};
