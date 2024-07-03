import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationForm = ({ onFormSubmit }) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/location');
        setLocations(response.data.results);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, []);

  const handleLocationChange = (e) => {
    setSearchLocation(e.target.value);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(searchLocation);
  };

  return (
    <form onSubmit={handleLocationSubmit}>
      <div className="mb-3">
        <label htmlFor="searchLocation" className="form-label">Buscar Ubicación</label>
        <select
          className="form-select"
          id="searchLocation"
          name="searchLocation"
          value={searchLocation}
          onChange={handleLocationChange}
          required
        >
          <option value="">Selecciona una ubicación</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>{location.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-secondary">Buscar Ubicación</button>
    </form>
  );
};

export default LocationForm;
