import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CityList({ 
  cities, 
  onAddCity, 
  selectedCityId, 
  onSelectCity,
  showDirectory,
  showAddCity,
  onBack
}) {
  const [newCity, setNewCity] = useState({
    name: '',
    country: '',
    population: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCity(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCity.name || !newCity.country || !newCity.population) {
      alert('Please fill in all fields');
      return;
    }
    
    onAddCity(newCity);
    
    // Reset form
    setNewCity({
      name: '',
      country: '',
      population: ''
    });

    // Redirect to directory
    onBack();  // This will close the add form
    setTimeout(() => {
      document.querySelector('.menu-button').click();  // Click the Cities Directory button
    }, 100);
  };

  return (
    <div className="city-list">
      <div className="section-header">
        <h2>{showAddCity ? 'Add New City' : 'Cities List'}</h2>
      </div>
      
      {showAddCity && (
        <form onSubmit={handleSubmit} className="add-city-form">
          <div className="form-group">
            <label htmlFor="name">City Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter city name"
              value={newCity.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <input
              id="country"
              type="text"
              name="country"
              placeholder="Enter country"
              value={newCity.country}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="population">Population:</label>
            <input
              id="population"
              type="text"
              name="population"
              placeholder="Enter population"
              value={newCity.population}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Add City</button>
        </form>
      )}

      {showDirectory && (
        <div className="cities-list">
          {cities.length === 0 ? (
            <p className="no-cities">No cities added yet. Add your first city!</p>
          ) : (
            cities.map(city => (
              <div
                key={city.id}
                className={`city-item ${selectedCityId === city.id ? 'selected' : ''}`}
              >
                <div 
                  className="city-link"
                  onClick={() => onSelectCity(city)}
                >
                  <h3>{city.name}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div className="back-button-container">
        <button className="back-button" onClick={onBack}>← Back</button>
      </div>
    </div>
  );
}

export default CityList; 