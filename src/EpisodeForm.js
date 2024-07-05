import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EpisodeForm({ onFormSubmit }) {
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

  const handleEpisodeChange = (e) => {
    setSearchEpisode(e.target.value);
  };

  const handleEpisodeSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(searchEpisode);
  };

  return (
    <form onSubmit={handleEpisodeSubmit}>
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
      <button type="submit" className="btn btn-primary">Buscar Episodio</button>
    </form>
  );
}

export default EpisodeForm;
