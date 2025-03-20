import React, { useState, useEffect } from "react";

interface Departure {
  time: string;
  transportType: string;
  destination: string;
}

const TransportDepartures: React.FC = () => {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState("");

  const TRAFIKEVERKET_API_KEY = "db7b4d95-5656-4bec-8239-55ae38100ed2";
  const GEOCODING_API_KEY = "53955b1b20e34129a80ed99f47485f5d";

  const parseXML = (xml: string) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const errorNode = xmlDoc.querySelector("parsererror");
    if (errorNode) throw new Error("Error parsing XML");
    return xmlDoc;
  };

  const fetchDepartures = async () => {
    console.log("Fetching departures for lat:", latitude, "lon:", longitude);
    if (latitude && longitude) {
      try {
        const requestBody = `<REQUEST>
          <LOGIN authenticationkey="${TRAFIKEVERKET_API_KEY}" />
          <QUERY objecttype="TrainAnnouncement" orderby="AdvertisedTimeAtLocation" schemaversion="1.0">
            <FILTER>
              <EQ name="ActivityType" value="Avgang" />
              <EQ name="LocationSignature" value="${latitude},${longitude}" />
              <GT name="AdvertisedTimeAtLocation" value="$NOW" />
              <LT name="AdvertisedTimeAtLocation" value="$NOW.AddHours(2)" />
            </FILTER>
            <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
            <INCLUDE>ProductInformation</INCLUDE>
            <INCLUDE>ToLocation</INCLUDE>
          </QUERY>
        </REQUEST>`;

        const response = await fetch("https://api.trafikinfo.trafikverket.se/v2/data.xml", {
          method: "POST",
          headers: { "Content-Type": "text/xml", Accept: "application/xml" },
          body: requestBody,
        });

        const textData = await response.text();
        console.log("Trafikverket API Response:", textData);
        const xmlDoc = parseXML(textData);

        const trainAnnouncements = xmlDoc.getElementsByTagName("TrainAnnouncement");
        if (trainAnnouncements.length > 0) {
          const departuresList = Array.from(trainAnnouncements).map((item: any) => {
            const time = item.getElementsByTagName("AdvertisedTimeAtLocation")[0].textContent;
            const transportType = item.getElementsByTagName("ProductInformation")[0]?.textContent || "Unknown";
            const destination = item.getElementsByTagName("ToLocation")[0]?.textContent || "Unknown";
            return { time, transportType, destination };
          });

          setDepartures(departuresList);
          setError("");
        } else {
          setDepartures([]);
          setError("No departures found for this location.");
        }
      } catch (error) {
        setError("Error fetching transport data.");
        console.error("Transport API error:", error);
      }
    }
  };

  const handleAddressChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = event.target.value;
    setAddress(newAddress);

    if (newAddress) {
      console.log("Fetching geocode for address:", newAddress);
      try {
        const geocodeResponse = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(newAddress)}&key=${GEOCODING_API_KEY}`
        );
        const geocodeData = await geocodeResponse.json();
        console.log("Geocode API Response:", geocodeData);

        if (geocodeData.results && geocodeData.results.length > 0) {
          const { lat, lng } = geocodeData.results[0].geometry;
          setLatitude(lat);
          setLongitude(lng);
          setError("");
        } else {
          setError("Location not found. Try another address.");
        }
      } catch (error) {
        setError("Error geocoding the address.");
        console.error("Geocoding error:", error);
      }
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      console.log("Latitude and Longitude updated:", latitude, longitude);
      fetchDepartures();
    }
  }, [latitude, longitude]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Transport Departures</h2>

      {/* Address Input */}
      <input
        type="text"
        placeholder="Enter location"
        value={address}
        onChange={handleAddressChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />

      {/* Error Message */}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* Departures List */}
      {departures.length > 0 ? (
        <ul className="bg-white p-4 rounded-lg shadow-md">
          {departures.map((departure, index) => (
            <li key={index} className="border-b py-2 flex justify-between items-center">
              <span className="font-semibold">{departure.time}</span>
              <span className="text-blue-500">{departure.transportType}</span>
              <span className="text-gray-700">to {departure.destination}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">No departures available</p>
      )}
    </div>
  );
};

export default TransportDepartures;
