import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './form';

function Counter({ count }) {
  return (
    <div className="counter">
      <p>Personas que han llenado el formulario: {count}</p>
    </div>
  );
}

function App() {
  const [contador, setContador] = useState(0);
  const [personas, setPersonas] = useState([]);

  const incrementarContador = () => {
    setContador(contador + 1);
  };

  const agregarPersona = (datosPersona) => {
    const nuevaPersona = {
      id: personas.length + 1,
      ...datosPersona
    };
    setPersonas([...personas, nuevaPersona]);
    incrementarContador();
  };

  return (
    <div className="app">
      <div className="form-container">
        <h2 className="mb-4">Formulario de Registro</h2>
        <Form onFormSubmit={agregarPersona} />
      </div>
      <Counter count={contador} />
      {/* Mostrar lista de personas */}
      <div className="person-list">
        <h3>Personas que han llenado el formulario:</h3>
        <ul>
          {personas.map((persona) => (
            <li key={persona.id}>
              Nombre: {persona.firstName} {persona.lastName} - Género: {persona.gender} - Fecha de Nacimiento: {persona.birthDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
