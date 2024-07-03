import React from 'react';
import './EpisodeCard.css';
import CharacterCard from './CharacterCard';

const EpisodeCard = ({ episode, characters }) => {
  return (
    <div className="episode-details">
      <div className="episode-card">
        <div className="episode-info">
          <h3>{episode.name}</h3>
          <p>Fecha de emisión: {episode.air_date}</p>
          <p>Episodio: {episode.episode}</p>
          <p><strong>Personajes que aparecen en el episodio:</strong></p>
        </div>
      </div>
      <div className="character-list">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default EpisodeCard;
