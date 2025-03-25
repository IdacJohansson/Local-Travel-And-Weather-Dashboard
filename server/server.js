const express = require("express");
const axios = require("axios");
require("dotenv").config({ path: "../.env" });

const app = express();
const cors = require("cors");

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

app.listen(TRAFFIC_PORT, () => {
  console.log(`Server is running on port: ${TRAFFIC_PORT}`);
});
