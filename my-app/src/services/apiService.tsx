import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL = 'http://localhost:8080'; 

export const fetchTrafficUpdatesData = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/traffic-updates`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching traffic data:", error);
    throw error;
  }
};
