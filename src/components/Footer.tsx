import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>DigiStore</h3>
            <p>La première marketplace tunisienne pour les produits numériques. Achetez, vendez et grandissez avec la communauté digitale tunisienne.</p>
            <div className="social-links">
              <span style={{color: '#999', cursor: 'not-allowed'}} aria-label="Facebook">📘</span>
              <span style={{color: '#999', cursor: 'not-allowed'}} aria-label="Twitter">🐦</span>
              <span style={{color: '#999', cursor: 'not-allowed'}} aria-label="LinkedIn">💼</span>
              <span style={{color: '#999', cursor: 'not-allowed'}} aria-label="Instagram">📷</span>
            </div>
          </div>

          <div className="footer-section">
            <h4>Produits</h4>
            <ul>
              <li><Link to="/produits">Ebooks</Link></li>
              <li><Link to="/produits">Cours en ligne</Link></li>
              <li><Link to="/produits">Certifications</Link></li>
              <li><Link to="/produits">Templates</Link></li>
              <li><Link to="/produits">Abonnements</Link></li>
              <li><Link to="/produits">Tous les produits</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Pour les vendeurs</h4>
            <ul>
              <li><Link to="/vendre">Devenir vendeur</Link></li>
              <li><Link to="/vendre">Créer un produit</Link></li>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>Ressources marketing</span></li>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>Centre d'aide vendeur</span></li>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>Politique de commission</span></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>Centre d'aide</span></li>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>Contact</span></li>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>FAQ</span></li>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>Signaler un problème</span></li>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>Status de la plateforme</span></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Entreprise</h4>
            <ul>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>À propos</span></li>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>Carrières</span></li>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>Presse</span></li>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>Blog</span></li>
              <li><span style={{color: '#999', cursor: 'not-allowed'}}>Partenariats</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p>&copy; 2025 DigiStore. Tous droits réservés.</p>
            <div className="legal-links">
              <span style={{color: '#999', cursor: 'not-allowed'}}>Conditions d'utilisation</span>
              <span style={{color: '#999', cursor: 'not-allowed'}}>Politique de confidentialité</span>
              <span style={{color: '#999', cursor: 'not-allowed'}}>Cookies</span>
            </div>
          </div>
          
          <div className="footer-newsletter">
            <h5>Restez informé</h5>
            <div className="newsletter-form">
              <input type="email" placeholder="Votre email" />
              <button type="submit">S'abonner</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
