import React from 'react';
import { Product } from '../context/ProductContext';
import { usePurchasedProducts } from '../context/PurchasedProductsContext';
import { useCart } from '../context/CartContext';
import './ProductPreviewModal.css';

interface ProductPreviewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({ product, isOpen, onClose }) => {
  const { isPurchased, canDownload, incrementDownloadCount, getPurchasedProduct } = usePurchasedProducts();
  const { addToCart, isInCart } = useCart();

  if (!isOpen) return null;

  const purchased = isPurchased(product.id);
  const purchasedProduct = getPurchasedProduct(product.id);

  const handleDownload = () => {
    if (purchased && canDownload(product.id)) {
      // Incrémenter le compteur de téléchargements
      incrementDownloadCount(product.id);
      
      // Télécharger le vrai fichier du produit
      if (product.productFile && product.productFileName) {
        try {
          // Créer un lien de téléchargement avec le fichier réel
          const link = document.createElement('a');
          link.href = product.productFile;
          link.download = product.productFileName;
          
          // Ajouter le lien au DOM, cliquer, puis le supprimer
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          alert(`✅ Téléchargement de "${product.productFileName}" réussi !\n\nCe produit a été téléchargé ${(purchasedProduct?.downloadCount || 0) + 1} fois sur ${purchasedProduct?.maxDownloads || 10} autorisées.`);
          
          console.log('Téléchargement du fichier réel:', {
            product: product.title,
            fileName: product.productFileName,
            downloadCount: (purchasedProduct?.downloadCount || 0) + 1
          });
        } catch (error) {
          console.error('Erreur lors du téléchargement:', error);
          alert('Erreur lors du téléchargement du fichier. Veuillez réessayer.');
        }
      } else {
        // Fallback: créer un fichier de démonstration si pas de fichier réel
        const fileContent = `=== ${product.title} ===

Félicitations ! Vous avez acheté ce produit sur DigiStore.

Informations du produit:
- Titre: ${product.title}
- Auteur: ${product.author}
- Catégorie: ${product.category}
- Prix: ${product.price}€
- Note: ${product.rating}/5 (${product.reviewCount} avis)

Description:
${product.description}

Ce fichier est une démonstration du système de téléchargement.
Le fichier original n'était pas disponible.

Date de téléchargement: ${new Date().toLocaleString('fr-FR')}
Téléchargements restants: ${(purchasedProduct?.maxDownloads || 10) - (purchasedProduct?.downloadCount || 0) - 1}

Merci d'avoir choisi DigiStore !
`;

        // Créer et télécharger le fichier
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${product.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')}.txt`;
        
        // Déclencher le téléchargement
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        // Message de confirmation
        alert(`✅ Téléchargement de "${product.title}" réussi !\n\nCe produit a été téléchargé ${(purchasedProduct?.downloadCount || 0) + 1} fois sur ${purchasedProduct?.maxDownloads || 10} autorisées.`);
        
        console.log('Téléchargement réussi (fallback):', {
          product: product.title,
          downloadCount: (purchasedProduct?.downloadCount || 0) + 1,
          remainingDownloads: (purchasedProduct?.maxDownloads || 10) - (purchasedProduct?.downloadCount || 0) - 1
        });
      }
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.title} a été ajouté au panier !`);
  };

  const categories = [
    { id: 'cours', name: 'Cours en ligne' },
    { id: 'ebook', name: 'E-books' },
    { id: 'certification', name: 'Certifications' },
    { id: 'abonnement', name: 'Abonnements' },
    { id: 'template', name: 'Templates' },
    { id: 'audio', name: 'Audio/Musique' },
    { id: 'logiciel', name: 'Logiciel/Application' }
  ];

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <div className="modal-image">
            <img src={product.image} alt={product.title} />
            {purchased && (
              <div className="owned-badge">
                ✅ Possédé
              </div>
            )}
          </div>
          
          <div className="modal-info">
            <div className="product-category">{getCategoryName(product.category)}</div>
            <h2>{product.title}</h2>
            <p className="product-author">Par {product.author}</p>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="rating-text">{product.rating} ({product.reviewCount} avis)</span>
            </div>

            <div className="product-price">
              <span className="current-price">{product.price}€</span>
              {product.originalPrice && (
                <span className="original-price">{product.originalPrice}€</span>
              )}
            </div>

            {product.badge && (
              <div className={`product-badge ${product.badge.toLowerCase()}`}>
                {product.badge}
              </div>
            )}
          </div>
        </div>

        <div className="modal-body">
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {purchased && (
            <div className="download-section">
              <h3>Votre produit</h3>
              <div className="download-info">
                <div className="download-stats">
                  <span>Acheté le: {purchasedProduct?.purchaseDate.toLocaleDateString('fr-FR')}</span>
                  <span>Téléchargements: {purchasedProduct?.downloadCount}/{purchasedProduct?.maxDownloads}</span>
                </div>
                
                {canDownload(product.id) ? (
                  <button 
                    className="btn-download-product"
                    onClick={handleDownload}
                  >
                    📥 Télécharger maintenant
                  </button>
                ) : (
                  <div className="download-limit-reached">
                    ⚠️ Limite de téléchargements atteinte
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="product-features">
            <h3>Ce que vous obtenez</h3>
            <ul>
              <li>✅ Accès immédiat après l'achat</li>
              <li>✅ Téléchargements illimités pendant 1 an</li>
              <li>✅ Mises à jour gratuites</li>
              <li>✅ Support client premium</li>
              <li>✅ Garantie satisfait ou remboursé 30 jours</li>
              {product.productFile && product.productFileName && (
                <li>📄 Fichier inclus: {product.productFileName}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          {!purchased ? (
            <div className="purchase-actions">
              <button 
                className={`btn-add-cart ${isInCart(product.id) ? 'in-cart' : ''}`}
                onClick={handleAddToCart}
                disabled={isInCart(product.id)}
              >
                {isInCart(product.id) ? '✅ Dans le panier' : '🛒 Ajouter au panier'}
              </button>
              
              <div className="security-badges">
                <span className="security-badge">🔒 Paiement sécurisé</span>
                <span className="security-badge">📧 Livraison instantanée</span>
                <span className="security-badge">🛡️ Garantie 30 jours</span>
              </div>
            </div>
          ) : (
            <div className="owned-actions">
              <div className="owned-message">
                <span className="owned-icon">🎉</span>
                <span>Vous possédez ce produit !</span>
              </div>
              {canDownload(product.id) && (
                <button 
                  className="btn-download-product"
                  onClick={handleDownload}
                >
                  📥 Télécharger
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewModal;