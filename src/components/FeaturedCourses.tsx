import React from 'react';
import './FeaturedCourses.css';

interface Product {
  id: number;
  title: string;
  creator: string;
  price: number;
  originalPrice?: number;
  rating: number;
  sales: number;
  image: string;
  category: string;
  type: string;
}

const FeaturedProducts: React.FC = () => {
  // Données mockées des produits populaires
  const products: Product[] = [
    {
      id: 1,
      title: "Guide Complet du Marketing Digital 2025",
      creator: "Sarah Martin",
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.8,
      sales: 2543,
      image: "📚",
      category: "Marketing",
      type: "Ebook"
    },
    {
      id: 2,
      title: "Certification Design UI/UX Premium",
      creator: "Alexandre Dubois",
      price: 199.99,
      rating: 4.9,
      sales: 876,
      image: "�",
      category: "Design",
      type: "Certification"
    },
    {
      id: 3,
      title: "Abonnement Pro - Outils Business",
      creator: "Julie Rousseau",
      price: 19.99,
      originalPrice: 39.99,
      rating: 4.7,
      sales: 3201,
      image: "�",
      category: "Business",
      type: "Abonnement"
    },
    {
      id: 4,
      title: "Cours Complet Python & Data Science",
      creator: "Pierre Laurent",
      price: 89.99,
      rating: 4.8,
      sales: 1654,
      image: "�",
      category: "Programmation",
      type: "Cours Vidéo"
    },
    {
      id: 5,
      title: "Templates Photoshop Professionnels",
      creator: "Marie Lefevre",
      price: 24.99,
      rating: 4.6,
      sales: 987,
      image: "🎨",
      category: "Design",
      type: "Templates"
    },
    {
      id: 6,
      title: "Certificat Cybersécurité Avancée",
      creator: "Thomas Bernard",
      price: 299.99,
      rating: 4.9,
      sales: 456,
      image: "🔒",
      category: "Sécurité",
      type: "Certification"
    }
  ];

  return (
    <section className="featured-courses">
      <div className="courses-container">
        <div className="section-header">
          <h2>Produits les plus populaires</h2>
          <p>Découvrez les produits numériques les plus appréciés par notre communauté</p>
        </div>
        
        <div className="courses-grid">
          {products.map(product => (
            <div key={product.id} className="course-card">
              <div className="course-image">
                <span className="course-emoji">{product.image}</span>
                <div className="course-level">{product.type}</div>
              </div>
              
              <div className="course-content">
                <div className="course-category">{product.category}</div>
                <h3 className="course-title">{product.title}</h3>
                <p className="course-instructor">Par {product.creator}</p>
                
                <div className="course-stats">
                  <div className="rating">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating-value">{product.rating}</span>
                  </div>
                  <div className="students-count">
                    {product.sales.toLocaleString()} ventes
                  </div>
                </div>
                
                <div className="course-footer">
                  <div className="price">
                    <span className="current-price">{product.price}€</span>
                    {product.originalPrice && (
                      <span className="original-price">{product.originalPrice}€</span>
                    )}
                  </div>
                  <button className="btn-add-cart">Ajouter au panier</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-all">
          <button className="btn-view-all">Voir tous les produits</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
