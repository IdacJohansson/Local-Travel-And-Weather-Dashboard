import { useState, useRef } from 'react';

const GeolocationApp: React.FC = () => {
  const [location, setLocation] = useState<string>('');
 const [address, setAddress] = useState<string>('');
 const inputRef = useRef<HTMLInputElement>(null);
 const getLocation = async () => {
  if (address.trim() === '') {
 if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(
  (position) => {
 const latitude = position.coords.latitude;
 const longitude = position.coords.longitude;
 setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
  },
  () => {
 setLocation('Unable to retrieve location.');
  }
  );
} else {
  setLocation('Geolocation is not supported by this browser.');
  }
  } else {
 try {
 const response = await fetch(
 `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
 address
 )}`
  );
  const data = await response.json();
 if (data.length > 0) {
const { lat, lon } = data[0];
setLocation(
`Your Location is ${address} 👉🏻 Latitude: ${lat}, Longitude: ${lon}`
 );
if (inputRef.current) {
inputRef.current.value = '';
 }
setAddress('');
 } else {
setLocation('Location not found.');
 }
} catch {
 setLocation('Error fetching location.');
 }
 }
 };
 return (
  <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light text-center p-4">

  {/* Search Input with Button */}
 <div
 className="input-group mb-3"
 style={{ maxWidth: '500px', width: '100%' }}
 >
  <input
 ref={inputRef}
type="text"
placeholder="Search for a location..."
value={address}
onChange={(e) => setAddress(e.target.value)}
className="form-control border-primary shadow-sm"
/>
<button onClick={getLocation} className="mt-3 btn btn-primary">
 Get Location
</button>
</div>
{/* Display Location */}
<p className="mt-3">{location}</p>
</div>
 );
};
export default GeolocationApp;
