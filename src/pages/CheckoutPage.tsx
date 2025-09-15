import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePurchasedProducts } from '../context/PurchasedProductsContext';
import './CheckoutPage.css';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  paymentMethod: 'card' | 'paypal';
}

const CheckoutPage: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { addPurchasedProduct } = usePurchasedProducts();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Tunisie'
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    paymentMethod: 'card'
  });

  const [acceptTerms, setAcceptTerms] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-checkout">
            <h2>Votre panier est vide</h2>
            <p>Ajoutez des produits à votre panier avant de procéder au paiement</p>
            <button onClick={() => navigate('/produits')} className="btn-back-to-products">
              Voir les produits
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode'];
    return required.every(field => customerInfo[field as keyof CustomerInfo]);
  };

  const validateStep2 = () => {
    if (paymentInfo.paymentMethod === 'paypal') return true;
    const required = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
    return required.every(field => paymentInfo[field as keyof PaymentInfo]);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2() && acceptTerms) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    
    // Simulation du traitement de paiement
    setTimeout(() => {
      // Créer une commande
      const order = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        items: cartItems,
        total: getTotalPrice(),
        customer: customerInfo,
        payment: paymentInfo.paymentMethod,
        status: 'completed'
      };
      
      // Sauvegarder la commande dans localStorage
      const existingOrders = JSON.parse(localStorage.getItem('digistore-orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('digistore-orders', JSON.stringify(existingOrders));
      
      // Déverrouiller tous les produits achetés
      cartItems.forEach(item => {
        addPurchasedProduct(item.product.id, order.id);
        console.log(`Produit déverrouillé: ${item.product.title} (ID: ${item.product.id})`);
      });
      
      clearCart();
      setIsProcessing(false);
      
      // Rediriger vers la page de confirmation
      navigate('/order-confirmation', { state: { order } });
    }, 3000);
  };

  const formatPrice = (price: number) => price.toFixed(2);

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Finaliser votre commande</h1>
          <div className="checkout-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Informations</span>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Paiement</span>
            </div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form">
            {currentStep === 1 && (
              <div className="step-content">
                <h2>Vos informations</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Prénom *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nom *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Téléphone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Pays *</label>
                    <select name="country" value={customerInfo.country} onChange={handleCustomerInfoChange}>
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Adresse *</label>
                    <input
                      type="text"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Ville *</label>
                    <input
                      type="text"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Code postal *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={customerInfo.postalCode}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content">
                <h2>Méthode de paiement</h2>
                
                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentInfo.paymentMethod === 'card'}
                      onChange={handlePaymentInfoChange}
                    />
                    <span className="payment-method-label">
                      <span className="payment-icon">💳</span>
                      Carte bancaire
                    </span>
                  </label>
                  
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentInfo.paymentMethod === 'paypal'}
                      onChange={handlePaymentInfoChange}
                    />
                    <span className="payment-method-label">
                      <span className="payment-icon">💰</span>
                      PayPal
                    </span>
                  </label>
                </div>

                {paymentInfo.paymentMethod === 'card' && (
                  <div className="card-form">
                    <div className="form-group">
                      <label>Nom sur la carte *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentInfoChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Numéro de carte *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentInfoChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Date d'expiration *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentInfoChange}
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentInfoChange}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="terms-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    J'accepte les conditions générales de vente et la politique de confidentialité
                  </label>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-content">
                <h2>Confirmation de commande</h2>
                <div className="order-summary">
                  <h3>Récapitulatif</h3>
                  <div className="customer-summary">
                    <h4>Informations client</h4>
                    <p>{customerInfo.firstName} {customerInfo.lastName}</p>
                    <p>{customerInfo.email}</p>
                    <p>{customerInfo.address}, {customerInfo.city} {customerInfo.postalCode}</p>
                  </div>
                  
                  <div className="payment-summary">
                    <h4>Méthode de paiement</h4>
                    <p>{paymentInfo.paymentMethod === 'card' ? 'Carte bancaire' : 'PayPal'}</p>
                  </div>
                </div>

                <button 
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="btn-process-payment"
                >
                  {isProcessing ? 'Traitement en cours...' : `Payer ${formatPrice(getTotalPrice())} TND`}
                </button>
              </div>
            )}

            <div className="checkout-actions">
              {currentStep > 1 && (
                <button onClick={handlePreviousStep} className="btn-previous">
                  Retour
                </button>
              )}
              
              {currentStep < 3 && (
                <button 
                  onClick={handleNextStep} 
                  className="btn-next"
                  disabled={
                    (currentStep === 1 && !validateStep1()) ||
                    (currentStep === 2 && (!validateStep2() || !acceptTerms))
                  }
                >
                  Continuer
                </button>
              )}
            </div>
          </div>

          <div className="order-summary-sidebar">
            <h3>Votre commande</h3>
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.product.id} className="order-item">
                  <img src={item.product.image} alt={item.product.title} />
                  <div className="order-item-details">
                    <h4>{item.product.title}</h4>
                    <p>Quantité: {item.quantity}</p>
                    <p className="order-item-price">{formatPrice(item.product.price * item.quantity)} TND</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-total">
              <div className="total-line">
                <span>Total</span>
                <span>{formatPrice(getTotalPrice())} TND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;