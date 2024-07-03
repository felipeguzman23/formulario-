import React from 'react';

function EpisodeDetails({ episode, characters }) {
  return (
    <div className="episode-details">
      <h3>{episode.name}</h3>
      <p>Fecha de emisión: {episode.air_date}</p>
      <p>Episodio: {episode.episode}</p>
      <p>Personajes en este episodio:</p>
      <div className="character-list">
        {characters.map((character) => (
          <div className="character-card" key={character.id}>
            <img src={character.image} alt={character.name} className="character-image"/>
            <div className="character-info">
              <h3>{character.name}</h3>
              <p><span className={`character-status ${character.status.toLowerCase()}`}>{character.status}</span> - {character.species}</p>
              <p>Última ubicación conocida: {character.location.name}</p>
              <p>Visto por primera vez en: {character.origin.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EpisodeDetails;
