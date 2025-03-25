import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TransportDepartures from "./components/TransportDepartures/TransportDepartures";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/departures" element={<TransportDepartures />} />
      </Routes>
    </Router>
  );
}

export default App;
