import { useState } from 'react';

function CityDetails({ city }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="city-details">
      {!showDetails ? (
        <div 
          className="city-details-link"
          onClick={() => setShowDetails(true)}
        >
          <h2>{city.name}</h2>
        </div>
      ) : (
        <div className="city-info">
          <div className="city-header">
            <h2>{city.name}</h2>
          </div>
          <div className="city-details-content">
            <p>Country: {city.country}</p>
            <p>Population: {city.population}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CityDetails; 