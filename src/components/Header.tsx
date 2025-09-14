import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="DigiStore Logo" className="logo-icon" />
          <div className="logo-text">
            <h2>DigiStore</h2>
            <span className="logo-slogan">Votre succès numérique</span>
          </div>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/produits">Produits</Link></li>
            <li><Link to="/vendre">Vendre</Link></li>
          </ul>
        </nav>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
