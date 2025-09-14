import React, { useState } from 'react';
import './Products.css';
import { useProducts, Product } from '../context/ProductContext';

const Products: React.FC = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');

  console.log('Products component: Current products count:', products.length);
  console.log('Products component: Products:', products);

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