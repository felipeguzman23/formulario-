import React from 'react';
import './Footer.css';

const Footer = ({ isVisible }) => {
  return (
    <footer className={`footer ${isVisible ? 'visible' : ''}`}>
      <p>&copy; 2023 Página de fans de Rick y Morty. Todos los derechos reservados.</p>
      <a 
        href="https://github.com/afuh/rick-and-morty-api-node" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="github-link"
      >
        <i className="fab fa-github"></i>
      </a>
    </footer>
  );
};

export default Footer;
