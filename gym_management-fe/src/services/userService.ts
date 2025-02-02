import axios from "axios";
export interface RegisterData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  target: string;
  activity: string;
}

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const updateUser = async (
  data: Partial<RegisterData>,
  token: string,
  userId: string
) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const updatePassword = async (data: object, token: string, userId: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/change-password/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

export const getCoach = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/coach`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};
