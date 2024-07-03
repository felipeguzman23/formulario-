import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EpisodeList() {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode');
        setEpisodes(response.data.results);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };
    fetchEpisodes();
  }, []);

  const handleEpisodeClick = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      setSelectedEpisode(response.data);
      const characterResponses = await Promise.all(response.data.characters.map(url => axios.get(url)));
      setCharacters(characterResponses.map(res => res.data));
    } catch (error) {
      console.error('Error fetching episode details:', error);
    }
    setLoading(false);
  };

  return (
    <div className="episode-section">
      <h2 className="mb-4">Episodios de Rick and Morty</h2>
      <ul className="episode-list">
        {episodes.map((episode) => (
          <li key={episode.id} onClick={() => handleEpisodeClick(episode.id)}>
            {episode.name}
          </li>
        ))}
      </ul>
      {loading && <p>Cargando...</p>}
      {selectedEpisode && (
        <div className="episode-details">
          <h3>{selectedEpisode.name}</h3>
          <p>Fecha de emisión: {selectedEpisode.air_date}</p>
          <p>Episodio: {selectedEpisode.episode}</p>
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
      )}
    </div>
  );
}

export default EpisodeList;
