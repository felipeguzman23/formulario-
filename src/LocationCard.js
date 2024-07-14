import React, { useEffect, useState } from 'react';
import './LocationCard.css';
import CharacterCard from './CharacterCard';

const LocationCard = ({ location }) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const residentPromises = location.residents.map(url =>
          fetch(url).then(response => response.json())
        );
        const residentData = await Promise.all(residentPromises);
        setResidents(residentData);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, [location.residents]);

  return (
    <div className="location-details">
      <div className="location-info-container">
        <div className="location-info">
          <h3>{location.name}</h3>
          <p>Tipo: {location.type}</p>
          <p>Dimensión: {location.dimension}</p>
          <p>Residentes: {location.residents.length}</p>
        </div>
      </div>
      <div className="resident-list-container">
        <div className="resident-list-title-container">
          <p className="resident-list-title"><strong>Personajes que residen aquí:</strong></p>
        </div>
        <div className="resident-list">
          {residents.map((resident) => (
            <CharacterCard key={resident.id} character={resident} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
