import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CharacterForm from './CharacterForm';
import EpisodeForm from './EpisodeForm';
import LocationForm from './LocationForm';
import CharacterCard from './CharacterCard';
import LocationCard from './LocationCard';
import EpisodeCard from './EpisodeCard';
import Navbar from './Navbar'; // Importa el componente Navbar
import Footer from './Footer'; // Importa el componente Footer
import axios from 'axios';
import tituloImage from './titulo.png';
import backgroundMusic from './intro.mp3';

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationCharacters, setLocationCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('characters');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  const audioRef = useRef(new Audio(backgroundMusic));

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

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

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleBackToList = () => {
    setSelectedCharacter(null);
  };

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setFooterVisible(true);
    } else {
      setFooterVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <Navbar /> {/* Usa el componente Navbar */}
      <div className="content">
        <div className="title-image">
          <img src={tituloImage} alt="Título de la aplicación" />
        </div>
        <button className="music-toggle-btn" onClick={toggleMusic}>
          {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
        </button>
        <div className="form-section">
          <div className="form-container animated-container">
            <CharacterForm onFormSubmit={handleSearchCharacter} />
          </div>
          <div className="form-container animated-container">
            <EpisodeForm onFormSubmit={handleSearchEpisode} />
          </div>
          <div className="form-container animated-container">
            <LocationForm onFormSubmit={handleSearchLocation} />
          </div>
        </div>
        {loading && <p>Cargando...</p>}
        {selectedCharacter ? (
          <div className="character-details">
            <button onClick={handleBackToList} className="btn btn-secondary mb-3">Volver</button>
            <CharacterCard character={selectedCharacter} />
          </div>
        ) : (
          <>
            {viewMode === 'characters' && !loading && characters.length > 0 && (
              <div className="character-list">
                {characters.map((character) => (
                  <div key={character.id} onClick={() => handleCharacterClick(character)}>
                    <CharacterCard character={character} />
                  </div>
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
          </>
        )}
      </div>
      <Footer isVisible={footerVisible} /> {/* Usa el componente Footer */}
    </div>
  );
}

export default App;
