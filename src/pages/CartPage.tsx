import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Votre panier est vide</h2>
            <p>Découvrez nos produits numériques et ajoutez-les à votre panier</p>
            <Link to="/produits" className="btn-continue-shopping">
              Voir les produits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Mon Panier</h1>
          <span className="cart-count">{getTotalItems()} article{getTotalItems() > 1 ? 's' : ''}</span>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-items-header">
              <h3>Articles dans votre panier</h3>
              <button 
                onClick={clearCart} 
                className="btn-clear-cart"
                disabled={cartItems.length === 0}
              >
                Vider le panier
              </button>
            </div>

            {cartItems.map(item => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.product.image} alt={item.product.title} />
                </div>
                
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.product.title}</h4>
                  <p className="cart-item-author">Par {item.product.author}</p>
                  <p className="cart-item-category">{item.product.category}</p>
                </div>

                <div className="cart-item-quantity">
                  <label>Quantité:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-price">
                  <div className="unit-price">{formatPrice(item.product.price)}€ / unité</div>
                  <div className="total-price">{formatPrice(item.product.price * item.quantity)}€</div>
                </div>

                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="btn-remove-item"
                  title="Supprimer du panier"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Résumé de la commande</h3>
              
              <div className="summary-line">
                <span>Sous-total ({getTotalItems()} articles)</span>
                <span>{formatPrice(getTotalPrice())}€</span>
              </div>
              
              <div className="summary-line">
                <span>Frais de traitement</span>
                <span>0.00€</span>
              </div>
              
              <div className="summary-line total">
                <span>Total</span>
                <span>{formatPrice(getTotalPrice())}€</span>
              </div>

              <Link to="/checkout" className="btn-checkout">
                Procéder au paiement
              </Link>

              <Link to="/produits" className="btn-continue-shopping-small">
                Continuer mes achats
              </Link>
            </div>

            <div className="security-info">
              <div className="security-item">
                <span className="security-icon">🔒</span>
                <span>Paiement sécurisé</span>
              </div>
              <div className="security-item">
                <span className="security-icon">📧</span>
                <span>Livraison instantanée par email</span>
              </div>
              <div className="security-item">
                <span className="security-icon">🛡️</span>
                <span>Garantie satisfait ou remboursé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;