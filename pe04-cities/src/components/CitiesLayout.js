import { useState, useEffect } from 'react';
import CityList from './CityList';
import CityDetails from './CityDetails';

function CitiesLayout() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showDirectory, setShowDirectory] = useState(false);
  const [showAddCity, setShowAddCity] = useState(false);

  // Load cities from localStorage on component mount
  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem('cities')) || [];
    setCities(savedCities);
  }, []);

  // Save cities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  const handleAddCity = (newCity) => {
    const cityWithId = {
      ...newCity,
      id: Date.now(),
    };
    setCities(prev => [...prev, cityWithId]);
  };

  return (
    <div className={`cities-layout ${showDirectory || showAddCity ? 'showing-content' : ''}`}>
      <div className="cities-sidebar">
        {!showDirectory && !showAddCity && (
          <div className="menu-buttons">
            <button 
              className="menu-button"
              onClick={() => setShowDirectory(true)}
            >
              Cities List
            </button>
            <button 
              className="menu-button"
              onClick={() => setShowAddCity(true)}
            >
              Add City
            </button>
          </div>
        )}
        {(showDirectory || showAddCity) && (
          <CityList 
            cities={cities}
            onAddCity={handleAddCity}
            selectedCityId={selectedCity?.id}
            onSelectCity={setSelectedCity}
            showDirectory={showDirectory}
            showAddCity={showAddCity}
            onBack={() => {
              setShowDirectory(false);
              setShowAddCity(false);
              setSelectedCity(null);
            }}
          />
        )}
      </div>
      {selectedCity && (
        <div className="cities-content">
          <CityDetails city={selectedCity} />
        </div>
      )}
    </div>
  );
}

export default CitiesLayout; 