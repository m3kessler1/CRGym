import axios from 'axios';

const BASE_URL = 'https://48r3v9wnr6.execute-api.eu-west-1.amazonaws.com/stage/';

// Function to fetch coaches
export const fetchCoaches = async () => {
  const response = await axios.get(`${BASE_URL}/coaches`);
  return response.data;
};
