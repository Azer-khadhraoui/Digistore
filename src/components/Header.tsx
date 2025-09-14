import React, { useState } from 'react';
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
            <li><a href="#accueil">Accueil</a></li>
            <li><a href="#produits">Produits</a></li>
            <li><a href="#categories">Catégories</a></li>
            <li><a href="#devenir-vendeur">Devenir Vendeur</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div className="auth-buttons">
          <button className="btn-secondary">Connexion</button>
          <button className="btn-primary">Inscription</button>
        </div>

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
