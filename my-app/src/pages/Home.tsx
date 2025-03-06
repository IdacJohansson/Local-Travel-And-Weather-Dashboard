import React from "react";

const Home = () => {
  return (
    <div className="main">
      {/* Section 1 - header with SEARCH BOX COMPONENT */}

      <div className="section-one">
        <p>Logo</p>
        <h1>Local Travel & Weather Dashboard</h1>
      </div>
      <div>SEARCH BOX COMPONENT</div>

      {/* Section 2 - TRANSPORT DEPARTURES and LOCAL WEATHER COMPONENTS */}
      <div className="section-two">
        <div>TRANSPORT DEPARTURES COMPONENT</div>
        <div>LOCAL WEATHER COMPONENT</div>
      </div>

      {/* Section 3 - OPTIONAL and TRAFFIC UPDATES COMPONENTS */}
      <div className="section-three">
        <div>OPTIONAL COMPONENT</div>
        <div>TRAFFIC UPDATES COMPONENT</div>
      </div>
    </div>
  );
};

export default Home;
