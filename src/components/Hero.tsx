import React from 'react';
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
            Découvrez des produits numériques exclusifs pour votre réussite
          </h1>
          <p className="hero-description">
            Ebooks, cours en ligne, certifications, abonnements premium... Explorez notre marketplace de produits numériques créés par des experts. Vendez vos propres créations et générez des revenus.
          </p>
          <div className="hero-buttons">
            <button className="btn-hero-primary">Explorer les produits</button>
            <button className="btn-hero-secondary">Commencer à vendre</button>
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
