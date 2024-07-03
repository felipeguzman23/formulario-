import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Form({ onFormSubmitCharacter, onFormSubmitEpisode }) {
  const [searchCharacter, setSearchCharacter] = useState('');
  const [searchEpisode, setSearchEpisode] = useState('');
  const [episodes, setEpisodes] = useState([]);

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

  const handleCharacterChange = (e) => {
    setSearchCharacter(e.target.value);
  };

  const handleEpisodeChange = (e) => {
    setSearchEpisode(e.target.value);
  };

  const handleCharacterSubmit = (e) => {
    e.preventDefault();
    onFormSubmitCharacter(searchCharacter);
  };

  const handleEpisodeSubmit = (e) => {
    e.preventDefault();
    onFormSubmitEpisode(searchEpisode);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleCharacterSubmit}>
        <div className="mb-3">
          <label htmlFor="searchCharacter" className="form-label">Buscar Personaje</label>
          <input
            type="text"
            className="form-control"
            id="searchCharacter"
            name="searchCharacter"
            value={searchCharacter}
            onChange={handleCharacterChange}
            placeholder="Ingresa el nombre del personaje"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Buscar Personaje</button>
      </form>
      <form onSubmit={handleEpisodeSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="searchEpisode" className="form-label">Buscar Episodio</label>
          <select
            className="form-select"
            id="searchEpisode"
            name="searchEpisode"
            value={searchEpisode}
            onChange={handleEpisodeChange}
            required
          >
            <option value="">Selecciona un episodio</option>
            {episodes.map((episode) => (
              <option key={episode.id} value={episode.id}>{episode.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-secondary">Buscar Episodio</button>
      </form>
    </div>
  );
}

export default Form;
