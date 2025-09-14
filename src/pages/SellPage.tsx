import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellPage.css';
import { useProducts } from '../context/ProductContext';

const SellPage: React.FC = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Informations produit
    productTitle: '',
    productDescription: '',
    productCategory: '',
    productPrice: '',
    productFile: null as File | null,
    productImage: null as File | null,
    
    // Informations vendeur
    sellerName: '',
    sellerEmail: '',
    sellerPhone: '',
    sellerAddress: '',
    sellerCity: '',
    sellerPostalCode: '',
    
    // Informations bancaires
    bankName: '',
    iban: '',
    paypalEmail: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fonction pour convertir un fichier en URL base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validation des champs requis
      if (!formData.productTitle || !formData.productDescription || !formData.productCategory || 
          !formData.productPrice || !formData.productImage || !formData.sellerName || 
          !formData.sellerEmail) {
        alert('Veuillez remplir tous les champs obligatoires.');
        setIsSubmitting(false);
        return;
      }

      // Conversion de l'image en base64
      let imageUrl = '';
      if (formData.productImage) {
        try {
          imageUrl = await fileToBase64(formData.productImage);
        } catch (error) {
          console.error('Erreur lors de la conversion de l\'image:', error);
          alert('Erreur lors du traitement de l\'image. Veuillez réessayer.');
          setIsSubmitting(false);
          return;
        }
      }

      // Création du nouveau produit
      const newProduct = {
        title: formData.productTitle,
        description: formData.productDescription,
        category: formData.productCategory,
        price: parseFloat(formData.productPrice),
        image: imageUrl,
        author: formData.sellerName
      };

      // Ajout du produit
      addProduct(newProduct);

      // Simulation d'un délai pour l'expérience utilisateur
      setTimeout(() => {
        alert('Votre produit a été publié avec succès ! Il est maintenant visible dans la liste des produits.');
        setIsSubmitting(false);
        
        // Réinitialisation du formulaire
        setFormData({
          productTitle: '',
          productDescription: '',
          productCategory: '',
          productPrice: '',
          productFile: null,
          productImage: null,
          sellerName: '',
          sellerEmail: '',
          sellerPhone: '',
          sellerAddress: '',
          sellerCity: '',
          sellerPostalCode: '',
          bankName: '',
          iban: '',
          paypalEmail: ''
        });
        setCurrentStep(1);
        
        // Redirection vers la page des produits
        navigate('/produits');
      }, 1500);

    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="sell-page">
      <div className="sell-container">
        <div className="sell-header">
          <h1>Vendez votre Produit Numérique</h1>
          <p>Publiez votre produit directement, sans inscription. Remplissez simplement le formulaire ci-dessous.</p>
        </div>

        <div className="form-progress">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="step-circle">1</div>
            <span>Produit</span>
          </div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="step-circle">2</div>
            <span>Vos infos</span>
          </div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="step-circle">3</div>
            <span>Paiement</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="sell-form">
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Informations sur votre produit</h2>
              
              <div className="form-group">
                <label htmlFor="productTitle">Titre du produit *</label>
                <input
                  type="text"
                  id="productTitle"
                  name="productTitle"
                  value={formData.productTitle}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Cours complet de développement web"
                />
              </div>

              <div className="form-group">
                <label htmlFor="productCategory">Catégorie *</label>
                <select
                  id="productCategory"
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="cours">Cours en ligne</option>
                  <option value="ebook">E-book</option>
                  <option value="template">Template/Design</option>
                  <option value="audio">Audio/Musique</option>
                  <option value="certification">Certification</option>
                  <option value="abonnement">Service/Abonnement</option>
                  <option value="logiciel">Logiciel/Application</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="productDescription">Description détaillée *</label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  required
                  placeholder="Décrivez votre produit en détail, ce qu'il apporte, à qui il s'adresse..."
                  rows={5}
                />
              </div>

              <div className="form-group">
                <label htmlFor="productPrice">Prix (€) *</label>
                <input
                  type="number"
                  id="productPrice"
                  name="productPrice"
                  value={formData.productPrice}
                  onChange={handleInputChange}
                  required
                  min="1"
                  step="0.01"
                  placeholder="29.99"
                />
              </div>

              <div className="form-group">
                <label htmlFor="productImage">Image de présentation *</label>
                <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
                <small>Format JPG, PNG. Taille recommandée: 800x600px</small>
                {formData.productImage && (
                  <div className="image-preview">
                    <img 
                      src={URL.createObjectURL(formData.productImage)} 
                      alt="Aperçu du produit" 
                      style={{ 
                        maxWidth: '200px', 
                        maxHeight: '150px', 
                        marginTop: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                      }} 
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="productFile">Fichier du produit *</label>
                <input
                  type="file"
                  id="productFile"
                  name="productFile"
                  onChange={handleFileChange}
                  required
                />
                <small>Votre produit numérique (PDF, ZIP, MP4, etc.)</small>
              </div>

              <div className="form-actions">
                <button type="button" onClick={nextStep} className="btn-next">
                  Suivant
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <h2>Vos coordonnées</h2>
              
              <div className="form-group">
                <label htmlFor="sellerName">Nom complet *</label>
                <input
                  type="text"
                  id="sellerName"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleInputChange}
                  required
                  placeholder="Votre nom et prénom"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sellerEmail">Email *</label>
                <input
                  type="email"
                  id="sellerEmail"
                  name="sellerEmail"
                  value={formData.sellerEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="votre@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sellerPhone">Téléphone *</label>
                <input
                  type="tel"
                  id="sellerPhone"
                  name="sellerPhone"
                  value={formData.sellerPhone}
                  onChange={handleInputChange}
                  required
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sellerAddress">Adresse *</label>
                <input
                  type="text"
                  id="sellerAddress"
                  name="sellerAddress"
                  value={formData.sellerAddress}
                  onChange={handleInputChange}
                  required
                  placeholder="123 rue de la paix"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="sellerPostalCode">Code postal *</label>
                  <input
                    type="text"
                    id="sellerPostalCode"
                    name="sellerPostalCode"
                    value={formData.sellerPostalCode}
                    onChange={handleInputChange}
                    required
                    placeholder="75001"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sellerCity">Ville *</label>
                  <input
                    type="text"
                    id="sellerCity"
                    name="sellerCity"
                    value={formData.sellerCity}
                    onChange={handleInputChange}
                    required
                    placeholder="Paris"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep} className="btn-prev">
                  Précédent
                </button>
                <button type="button" onClick={nextStep} className="btn-next">
                  Suivant
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <h2>Informations de paiement</h2>
              <p className="payment-info">Choisissez comment vous souhaitez recevoir vos paiements</p>
              
              <div className="payment-options">
                <div className="payment-option">
                  <h3>💳 Virement bancaire</h3>
                  <div className="form-group">
                    <label htmlFor="bankName">Nom de la banque</label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      placeholder="Ex: Crédit Agricole"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="iban">IBAN</label>
                    <input
                      type="text"
                      id="iban"
                      name="iban"
                      value={formData.iban}
                      onChange={handleInputChange}
                      placeholder="FR76 1234 5678 9012 3456 7890 123"
                    />
                  </div>
                </div>

                <div className="payment-separator">OU</div>

                <div className="payment-option">
                  <h3>💰 PayPal</h3>
                  <div className="form-group">
                    <label htmlFor="paypalEmail">Email PayPal</label>
                    <input
                      type="email"
                      id="paypalEmail"
                      name="paypalEmail"
                      value={formData.paypalEmail}
                      onChange={handleInputChange}
                      placeholder="votre@paypal.com"
                    />
                  </div>
                </div>
              </div>

              <div className="terms">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>J'accepte les conditions générales de vente et la politique de confidentialité</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={prevStep} className="btn-prev">
                  Précédent
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publication en cours...' : 'Publier mon produit'}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="sell-benefits">
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h3>Publication Immédiate</h3>
            <p>Votre produit sera en ligne dans les 24h après validation</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>85% de Commission</h3>
            <p>Gardez la majorité de vos revenus, nous prenons seulement 15%</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <h3>Paiements Sécurisés</h3>
            <p>Recevez vos paiements chaque semaine de manière sécurisée</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;