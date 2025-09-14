import React, { useState } from 'react';
import './Products.css';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  author: string;
}

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');

  const products: Product[] = [
    {
      id: 1,
      title: "Cours complet React & TypeScript",
      description: "Maîtrisez React et TypeScript de A à Z avec des projets pratiques",
      price: 89.99,
      originalPrice: 149.99,
      category: "cours",
      rating: 4.8,
      reviewCount: 1250,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      badge: "Bestseller",
      author: "Marie Dubois"
    },
    {
      id: 2,
      title: "E-book: Guide du Marketing Digital",
      description: "Stratégies complètes pour dominer le marketing digital en 2025",
      price: 29.99,
      category: "ebook",
      rating: 4.6,
      reviewCount: 890,
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400",
      author: "Pierre Martin"
    },
    {
      id: 3,
      title: "Abonnement Premium Design",
      description: "Accès illimité à plus de 10,000 templates et ressources design",
      price: 19.99,
      category: "abonnement",
      rating: 4.9,
      reviewCount: 2150,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400",
      badge: "Populaire",
      author: "Studio Creative"
    },
    {
      id: 4,
      title: "Certification Data Science",
      description: "Certification reconnue en science des données avec projets réels",
      price: 199.99,
      originalPrice: 299.99,
      category: "certification",
      rating: 4.7,
      reviewCount: 650,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      author: "Institut DataPro"
    },
    {
      id: 5,
      title: "Template E-commerce Shopify",
      description: "Template professionnel pour boutique en ligne avec toutes les fonctionnalités",
      price: 49.99,
      category: "template",
      rating: 4.5,
      reviewCount: 320,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      author: "WebDesign Pro"
    },
    {
      id: 6,
      title: "Formation YouTube Success",
      description: "Tout pour créer et monétiser une chaîne YouTube à succès",
      price: 79.99,
      category: "cours",
      rating: 4.4,
      reviewCount: 980,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
      badge: "Nouveau",
      author: "Alex Creator"
    },
    {
      id: 7,
      title: "Pack Audio Beats Premium",
      description: "Collection de 500+ beats et samples pour producteurs musicaux",
      price: 39.99,
      category: "audio",
      rating: 4.6,
      reviewCount: 420,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      author: "BeatMaker Studio"
    },
    {
      id: 8,
      title: "Masterclass Photographie",
      description: "Techniques avancées de photographie portrait et paysage",
      price: 129.99,
      originalPrice: 199.99,
      category: "cours",
      rating: 4.9,
      reviewCount: 1580,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
      badge: "Top Rated",
      author: "Sophie Lens"
    },
    {
      id: 9,
      title: "Certification Google Ads",
      description: "Préparation complète aux certifications Google Ads et Analytics",
      price: 149.99,
      category: "certification",
      rating: 4.7,
      reviewCount: 760,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      author: "Digital Academy"
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'cours', name: 'Cours en ligne' },
    { id: 'ebook', name: 'E-books' },
    { id: 'certification', name: 'Certifications' },
    { id: 'abonnement', name: 'Abonnements' },
    { id: 'template', name: 'Templates' },
    { id: 'audio', name: 'Audio/Musique' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default: // popular
        return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <div className="products-page">
      <div className="products-container">
        <div className="products-header">
          <h1>Nos Produits Numériques</h1>
          <p>Découvrez notre sélection de produits digitaux de qualité premium</p>
        </div>

        <div className="products-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-controls">
            <div className="category-filter">
              <label>Catégorie:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sort-filter">
              <label>Trier par:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="popular">Popularité</option>
                <option value="rating">Note</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
                <option value="newest">Plus récents</option>
              </select>
            </div>
          </div>
        </div>

        <div className="products-stats">
          <span>{sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}</span>
        </div>

        <div className="products-grid">
          {sortedProducts.map(product => (
            <div key={product.id} className="product-card">
              {product.badge && (
                <div className={`product-badge ${product.badge.toLowerCase()}`}>
                  {product.badge}
                </div>
              )}
              
              <div className="product-image">
                <img src={product.image} alt={product.title} />
                <div className="product-overlay">
                  <button className="btn-preview">Aperçu</button>
                </div>
              </div>

              <div className="product-info">
                <div className="product-category">{categories.find(c => c.id === product.category)?.name}</div>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-author">Par {product.author}</div>
                
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

                <div className="product-footer">
                  <div className="product-price">
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

        {sortedProducts.length === 0 && (
          <div className="no-products">
            <h3>Aucun produit trouvé</h3>
            <p>Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;