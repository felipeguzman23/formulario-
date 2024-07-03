import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CharacterForm from './CharacterForm';
import EpisodeForm from './EpisodeForm';
import LocationForm from './LocationForm';
import CharacterCard from './CharacterCard';
import LocationCard from './LocationCard';
import EpisodeCard from './EpisodeCard';
import axios from 'axios';
import tituloImage from './titulo.png';

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationCharacters, setLocationCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('characters');

  const fetchCharacters = async (name) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
      setCharacters(response.data.results);
      setViewMode('characters');
    } catch (error) {
      console.error('Error fetching characters:', error);
      setCharacters([]);
    }
    setLoading(false);
  };

  const fetchEpisodeDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      setSelectedEpisode(response.data);
      const characterResponses = await Promise.all(response.data.characters.map(url => axios.get(url)));
      setEpisodeCharacters(characterResponses.map(res => res.data));
      setViewMode('episodes');
    } catch (error) {
      console.error('Error fetching episode details:', error);
    }
    setLoading(false);
  };

  const fetchLocationDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
      setSelectedLocation(response.data);
      const characterResponses = await Promise.all(response.data.residents.map(url => axios.get(url)));
      setLocationCharacters(characterResponses.map(res => res.data));
      setViewMode('locations');
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
    setLoading(false);
  };

  const handleSearchCharacter = (term) => {
    fetchCharacters(term);
  };

  const handleSearchEpisode = (id) => {
    fetchEpisodeDetails(id);
  };

  const handleSearchLocation = (id) => {
    fetchLocationDetails(id);
  };

  return (
    <div className="app">
      <img src={tituloImage} alt="Title" className="title-image" />
      <div className="form-section">
        <div className="form-container">
          <CharacterForm onFormSubmit={handleSearchCharacter} />
        </div>
        <div className="form-container">
          <EpisodeForm onFormSubmit={handleSearchEpisode} />
        </div>
        <div className="form-container">
          <LocationForm onFormSubmit={handleSearchLocation} />
        </div>
      </div>
      {loading && <p>Cargando...</p>}
      {viewMode === 'characters' && !loading && characters.length > 0 && (
        <div className="character-list">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
      {viewMode === 'characters' && !loading && characters.length === 0 && <p>No se encontraron personajes.</p>}
      {viewMode === 'episodes' && selectedEpisode && (
        <EpisodeCard episode={selectedEpisode} characters={episodeCharacters} />
      )}
      {viewMode === 'locations' && selectedLocation && (
        <LocationCard location={selectedLocation} characters={locationCharacters} />
      )}
    </div>
  );
}

export default App;
