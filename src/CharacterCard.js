import React from 'react';
import './CharacterCard.css'; // Asegúrate de tener estilos para el componente

const CharacterCard = ({ character }) => {
  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} className="character-image" />
      <div className="character-info">
        <h3>{character.name}</h3>
        <p>
          <span className={`character-status ${character.status.toLowerCase()}`}>
            {character.status}
          </span>{' '}
          - {character.species}
        </p>
        <p>Última ubicación conocida: {character.location.name}</p>
        <p>Visto por primera vez en: {character.origin.name}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
