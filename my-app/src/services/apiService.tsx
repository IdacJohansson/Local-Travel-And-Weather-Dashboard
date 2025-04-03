import axios from "axios";

const baseURL = process.env.REACT_APP_TRAFFIC_BASE_URL;

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
