import React from 'react';
import './Features.css';

const Features: React.FC = () => {
  const features = [
    {
      icon: "💳",
      title: "Achat instantané",
      description: "Téléchargez vos produits numériques immédiatement après l'achat. Accès 24/7."
    },
    {
      icon: "👨‍💼",
      title: "Créateurs vérifiés",
      description: "Tous nos vendeurs sont vérifiés pour garantir la qualité de leurs produits."
    },
    {
      icon: "🏆",
      title: "Certifications reconnues",
      description: "Obtenez des certifications valorisantes reconnues par l'industrie."
    },
    {
      icon: "💬",
      title: "Communauté active",
      description: "Échangez avec d'autres acheteurs et créez votre réseau professionnel."
    },
    {
      icon: "💰",
      title: "Vendez vos créations",
      description: "Monétisez votre expertise en vendant vos ebooks, cours, templates et plus."
    },
    {
      icon: "📱",
      title: "Accès multi-plateforme",
      description: "Accédez à vos achats depuis tous vos appareils avec synchronisation."
    }
  ];

  const stats = [
    { number: "95%", label: "Taux de satisfaction" },
    { number: "24/7", label: "Support disponible" },
    { number: "30j", label: "Garantie remboursement" },
    { number: "∞", label: "Accès à vie" }
  ];

  return (
    <section className="features">
      <div className="features-container">
        <div className="section-header">
          <h2>Pourquoi choisir DigiStore ?</h2>
          <p>Une marketplace complète pour acheter et vendre des produits numériques</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="stats-section">
          <h3>Nos chiffres parlent d'eux-mêmes</h3>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-section">
          <div className="cta-content">
            <h3>Prêt à découvrir notre marketplace ?</h3>
            <p>Rejoignez des milliers d'utilisateurs qui font confiance à DigiStore</p>
            <div className="cta-buttons">
              <button className="btn-cta-primary">Commencer maintenant</button>
              <button className="btn-cta-secondary">Devenir vendeur</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
