import React from 'react';
import './LocationCard.css';
import CharacterCard from './CharacterCard';

const LocationCard = ({ location, characters }) => {
  return (
    <div className="location-details">
      <div className="location-info-container">
        <div className="location-info">
          <h3>{location.name}</h3>
          <p>Tipo: {location.type}</p>
          <p>Dimensión: {location.dimension}</p>
          <p>Residentes: {characters.length}</p>
        </div>
      </div>
      <div className="character-list-container">
        <div className="character-list-title-container">
          <p className="character-list-title"><strong>Personajes que residen en la ubicación:</strong></p>
        </div>
        <div className="character-list">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
