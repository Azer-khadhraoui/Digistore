import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>DigiStore</h3>
            <p>La marketplace de référence pour les produits numériques. Achetez, vendez et grandissez avec nous.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="Instagram">📷</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Produits</h4>
            <ul>
              <li><a href="#">Ebooks</a></li>
              <li><a href="#">Cours en ligne</a></li>
              <li><a href="#">Certifications</a></li>
              <li><a href="#">Templates</a></li>
              <li><a href="#">Abonnements</a></li>
              <li><a href="#">Tous les produits</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Pour les vendeurs</h4>
            <ul>
              <li><a href="#">Devenir vendeur</a></li>
              <li><a href="#">Créer un produit</a></li>
              <li><a href="#">Ressources marketing</a></li>
              <li><a href="#">Centre d'aide vendeur</a></li>
              <li><a href="#">Politique de commission</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Centre d'aide</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Signaler un problème</a></li>
              <li><a href="#">Status de la plateforme</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Entreprise</h4>
            <ul>
              <li><a href="#">À propos</a></li>
              <li><a href="#">Carrières</a></li>
              <li><a href="#">Presse</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Partenariats</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p>&copy; 2025 DigiStore. Tous droits réservés.</p>
            <div className="legal-links">
              <a href="#">Conditions d'utilisation</a>
              <a href="#">Politique de confidentialité</a>
              <a href="#">Cookies</a>
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
