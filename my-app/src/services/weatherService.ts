const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (city: string) => {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
};
