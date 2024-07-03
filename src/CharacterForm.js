import React, { useState } from 'react';

function CharacterForm({ onFormSubmit }) {
  const [searchCharacter, setSearchCharacter] = useState('');

  const handleCharacterChange = (e) => {
    setSearchCharacter(e.target.value);
  };

  const handleCharacterSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(searchCharacter);
  };

  return (
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
  );
}

export default CharacterForm;
