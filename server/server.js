const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const cors = require("cors");
const RESROBOT_API_KEY = process.env.RESROBOT_API_KEY;
console.log("Using API Key:", RESROBOT_API_KEY);


app.use(cors());

// const apiKey = process.env.TRAFFIC_API_KEY;
// const apiUrl = process.env.TRAFFIC_API_URL;
// const TRAFFIC_PORT = process.env.TRAFFIC_PORT;

TRAFFIC_API_KEY = "4581b803513643bd987a303e7049d864";
TRAFFIC_API_URL = "https://api.trafikinfo.trafikverket.se/v2/data.json";
TRAFFIC_PORT = 8080;
DEPARTURES_API_URL = "https://api.trafikinfo.trafikverket.se/v2/data.xml";

// route logic for traffic situations

app.get("/traffic-situations", async (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res.status(400).send("Missing latitude or longitude parameters");
  }
  console.log(
    `Received latitude in traffic: ${latitude}, longitude: ${longitude}`
  );

  const trafficXML = `<REQUEST>
  <LOGIN authenticationkey="${TRAFFIC_API_KEY}" />
  <QUERY objecttype="Situation" schemaversion="1" limit="5">
    <FILTER>
    <NEAR name="Deviation.Geometry.WGS84" value="${longitude} ${latitude}" />
    <LT name="Deviation.CreationTime" value="2025-12-31T23:59:59Z" />
     <GT name="Deviation.CreationTime" value="2025-01-01T00:00:00Z" />
    </FILTER>
    <INCLUDE>Deviation.CreationTime</INCLUDE>
    <INCLUDE>Deviation.Geometry.WGS84</INCLUDE>
    <INCLUDE>Deviation.Message</INCLUDE>
    <INCLUDE>Deviation.MessageCode</INCLUDE>
    <INCLUDE>Deviation.LocationDescriptor</INCLUDE>
    <INCLUDE>Deviation.SeverityText</INCLUDE>
  </QUERY>
</REQUEST>`;

  try {
    const response = await axios.post(TRAFFIC_API_URL, trafficXML, {
      headers: {
        "Content-Type": "text/xml",
      },
    });
    console.log("Response traffic data:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching traffic situations:", error);
    res.status(500).send("Failed fetching data");
  }
});

app.get("/api/departures", async (req, res) => {
  const { lat, lng } = req.query;
  console.log(`Received request with lat: ${lat}, lng: ${lng}`); // Debugging

  if (!lat || !lng) {
    console.error("Missing latitude or longitude in request");
    return res.status(400).json({ error: "Latitude and Longitude are required" });
  }

  try {
    // Fetch nearby station data from ResRobot API
    const stationResponse = await axios.get(
      `https://api.resrobot.se/v2.1/location.nearbystops?format=json&originCoordLat=${lat}&originCoordLong=${lng}&maxNo=1&accessId=${RESROBOT_API_KEY}`
    );
    
    console.log("Station response:", stationResponse.data); // Debugging

    if (!stationResponse.data.stopLocationOrCoordLocation) {
      throw new Error("Invalid station response from ResRobot API");
    }

    const station = stationResponse.data.stopLocationOrCoordLocation[0]?.StopLocation;
    if (!station || !station.extId) {
      throw new Error("No valid station found");
    }

    const stationId = station.extId;
    const stationName = station.name;

    // Fetch departures using the station ID
    const departuresResponse = await axios.get(
      `https://api.resrobot.se/v2.1/departureBoard?format=json&id=${stationId}&maxJourneys=10&accessId=${RESROBOT_API_KEY}`
    );

    console.log("Departures response:", departuresResponse.data); // Debugging

    if (!departuresResponse.data.Departure) {
      throw new Error("No departures found");
    }

    const departures = departuresResponse.data.Departure.map((dep) => ({
      time: dep.time,
      destination: dep.direction,
      type: dep.ProductAtStop?.catOut || "Unknown",
      route: dep.name || "Unknown",
    }));

    res.json({ station: stationName, departures });
  } catch (error) {
    console.error("Error fetching departures:", error.message);
    res.status(500).json({ error: "Failed to fetch transport departures" });
  }
});


app.listen(TRAFFIC_PORT, () => {
  console.log(`Server is running on port: ${TRAFFIC_PORT}`);
});
