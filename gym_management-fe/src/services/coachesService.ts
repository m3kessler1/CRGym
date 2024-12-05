import axios from 'axios';

const BASE_URL = 'https://gbeoc2wpu3.execute-api.eu-west-1.amazonaws.com/stage';

// Function to fetch coaches
export const fetchCoaches = async () => {
  const response = await axios.get(`${BASE_URL}/coaches`);
  return response.data;
};
