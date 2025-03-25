import axios from "axios";

const baseURL = "http://localhost:8080";

export const fetchTrafficUpdatesData = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await axios.get(`${baseURL}/traffic-situations`, {
      params: { longitude, latitude },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching traffic data:", error);
    throw error;
  }
};
