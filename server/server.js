const express = require("express");
const axios = require("axios");

const app = express();

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:54570"],
};

app.use(cors(corsOptions));

const apiKey = (process.env.REACT_APP_API_KEY =
  "4581b803513643bd987a303e7049d864");
const apiUrl = (process.env.REACT_APP_API_URL =
  "https://api.trafikinfo.trafikverket.se/v2/data.json");
const serverPort = (process.env.REACT_APP_PORT = "8080");

const currentTime = new Date().toISOString();

const latitude = 59.3293;
const longitude = 18.0686;

// route logic

const trafficXML = `
<REQUEST>
  <LOGIN authenticationkey="${apiKey}" />
  <QUERY objecttype="Situation" schemaversion="1" limit="8">
  <FILTER>
    <NEAR name="Deviation.Geometry.WGS84" value="${longitude} ${latitude} " />
    <GT name="Deviation.CreationTime" value="${currentTime}" />
  </FILTER>
  </QUERY>
</REQUEST>`;

app.get("/traffic-updates", async (req, res) => {
  try {
    const response = await axios.post(apiUrl, trafficXML, {
      headers: {
        "Content-Type": "text/xml",
      },
    });

    console.log("Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed fetching data");
  }
});

app.listen(serverPort, () => {
  console.log(`Server is running on port: ${serverPort}`);
});
