import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderConfirmationPage.css';

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="order-confirmation-page">
        <div className="confirmation-container">
          <div className="no-order">
            <h2>Aucune commande trouvée</h2>
            <Link to="/" className="btn-home">Retour à l'accueil</Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">✅</div>
          <h1>Commande confirmée !</h1>
          <p>Merci pour votre achat. Votre commande a été traitée avec succès.</p>
        </div>

        <div className="order-details">
          <div className="order-info">
            <h2>Détails de votre commande</h2>
            <div className="order-meta">
              <div className="meta-item">
                <span className="meta-label">Numéro de commande:</span>
                <span className="meta-value">#{order.id.toUpperCase()}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Date:</span>
                <span className="meta-value">{formatDate(order.date)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Total:</span>
                <span className="meta-value">{order.total.toFixed(2)}€</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Statut:</span>
                <span className="meta-value status-completed">Complétée</span>
              </div>
            </div>
          </div>

          <div className="customer-info">
            <h3>Informations client</h3>
            <div className="customer-details">
              <p><strong>{order.customer.firstName} {order.customer.lastName}</strong></p>
              <p>{order.customer.email}</p>
              <p>{order.customer.phone}</p>
              <p>{order.customer.address}</p>
              <p>{order.customer.city}, {order.customer.postalCode}</p>
              <p>{order.customer.country}</p>
            </div>
          </div>
        </div>

        <div className="order-items">
          <h3>Produits commandés</h3>
          <div className="items-list">
            {order.items.map((item: any) => (
              <div key={item.product.id} className="confirmation-item">
                <img src={item.product.image} alt={item.product.title} />
                <div className="item-details">
                  <h4>{item.product.title}</h4>
                  <p>Par {item.product.author}</p>
                  <p>Quantité: {item.quantity}</p>
                </div>
                <div className="item-price">
                  {(item.product.price * item.quantity).toFixed(2)}€
                </div>
                <div className="download-section">
                  <button className="btn-download">
                    📥 Télécharger
                  </button>
                  <span className="download-info">Disponible immédiatement</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="next-steps">
          <h3>Prochaines étapes</h3>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">📧</div>
              <h4>Email de confirmation</h4>
              <p>Un email de confirmation avec les liens de téléchargement a été envoyé à {order.customer.email}</p>
            </div>
            <div className="step-card">
              <div className="step-icon">📱</div>
              <h4>Accès immédiat</h4>
              <p>Vous pouvez télécharger vos produits immédiatement en cliquant sur les boutons ci-dessus</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🔄</div>
              <h4>Accès permanent</h4>
              <p>Vos achats restent disponibles dans votre compte à vie</p>
            </div>
          </div>
        </div>

        <div className="support-info">
          <div className="support-card">
            <h4>Besoin d'aide ?</h4>
            <p>Si vous avez des questions concernant votre commande ou si vous rencontrez des problèmes de téléchargement, n'hésitez pas à nous contacter.</p>
            <div className="support-contacts">
              <a href="mailto:support@digistore.com" className="support-link">
                📧 support@digistore.com
              </a>
              <a href="tel:+33123456789" className="support-link">
                📞 +33 1 23 45 67 89
              </a>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/produits" className="btn-continue-shopping">
            Continuer mes achats
          </Link>
          <Link to="/" className="btn-home">
            Retour à l'accueil
          </Link>
          <button onClick={() => window.print()} className="btn-print">
            Imprimer la facture
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;