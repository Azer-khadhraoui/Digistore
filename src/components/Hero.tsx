import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import backgroundImage from './background.webp';

const Hero: React.FC = () => {
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
  };

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-slogan">Votre succès numérique commence ici</div>
          <h1 className="hero-title">
            La première marketplace tunisienne de produits numériques
          </h1>
          <p className="hero-description">
            Ebooks, cours en ligne, certifications, abonnements premium... Explorez notre marketplace tunisienne de produits numériques créés par des experts locaux. Vendez vos propres créations et générez des revenus en dinars tunisiens.
          </p>
          <div className="hero-buttons">
            <Link to="/produits" className="btn-hero-primary">Explorer les produits</Link>
            <Link to="/vendre" className="btn-hero-secondary">Commencer maintenant</Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <h3>15,000+</h3>
              <p>Produits disponibles</p>
            </div>
            <div className="stat">
              <h3>80,000+</h3>
              <p>Clients satisfaits</p>
            </div>
            <div className="stat">
              <h3>12,000+</h3>
              <p>Vendeurs actifs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
