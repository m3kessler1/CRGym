import axios from 'axios';

const BASE_URL = 'https://a3axqm5k2b.execute-api.eu-west-1.amazonaws.com/stage';

// Function to fetch coaches
export const fetchCoaches = async () => {
  const response = await axios.get(`${BASE_URL}/coaches`);
  return response.data;
};
