import React, { useState } from 'react';
import './Navbar.css';
import CharacterCard from './CharacterCard';
import EpisodeCard from './EpisodeCard'; // Asegúrate de importar el nuevo componente

const Navbar = () => {
  const [mostWantedCharacters, setMostWantedCharacters] = useState([]);
  const [mostWantedEpisode, setMostWantedEpisode] = useState(null);
  const [showMostWantedCharacters, setShowMostWantedCharacters] = useState(false);
  const [showMostWantedEpisode, setShowMostWantedEpisode] = useState(false);

  const handleMostWantedCharacters = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      const randomCharacters = getRandomCharacters(data.results, 5);
      setMostWantedCharacters(randomCharacters);
      setShowMostWantedCharacters(true);
      setShowMostWantedEpisode(false); // Ocultar episodios si se muestran personajes
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleMostWantedEpisode = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/episode');
      const data = await response.json();
      const randomEpisode = getRandomEpisode(data.results);
      setMostWantedEpisode(randomEpisode);
      setShowMostWantedEpisode(true);
      setShowMostWantedCharacters(false); // Ocultar personajes si se muestra el episodio
    } catch (error) {
      console.error('Error fetching episodes:', error);
    }
  };

  const getRandomCharacters = (characters, num) => {
    const shuffled = characters.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const getRandomEpisode = (episodes) => {
    const randomIndex = Math.floor(Math.random() * episodes.length);
    return episodes[randomIndex];
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-brand">Bienvenidos a la Página de Fans de Rick and Morty</a>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <button className="navbar-link" onClick={handleMostWantedCharacters}>
                Personajes más buscados
              </button>
            </li>
            <li className="navbar-item">
              <button className="navbar-link" onClick={handleMostWantedEpisode}>
                Episodio más buscado
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {showMostWantedCharacters && (
        <div className="most-wanted-container">
          <h2>Los personajes más buscados son:</h2>
          <div className="character-list">
            {mostWantedCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </div>
      )}
      {showMostWantedEpisode && mostWantedEpisode && (
        <div className="most-wanted-container">
          <h2>El episodio más buscado es:</h2>
          <div className="episode-list">
            <EpisodeCard key={mostWantedEpisode.id} episode={mostWantedEpisode} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
