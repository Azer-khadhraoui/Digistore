import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
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
  sellerEmail?: string;
  createdAt: Date;
  productFile?: string; // Fichier du produit en base64
  productFileName?: string; // Nom original du fichier
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'createdAt'>) => void;
  removeProduct: (id: number) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Produits par défaut
const defaultProducts: Product[] = [
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
    author: "Marie Dubois",
    createdAt: new Date('2024-01-15')
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
    author: "Pierre Martin",
    createdAt: new Date('2024-02-20')
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
    author: "Studio Creative",
    createdAt: new Date('2024-03-10')
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
    author: "Institut DataPro",
    createdAt: new Date('2024-04-05')
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
    author: "WebDesign Pro",
    createdAt: new Date('2024-05-12')
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
    author: "Alex Creator",
    createdAt: new Date('2024-06-18')
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
    author: "BeatMaker Studio",
    createdAt: new Date('2024-07-22')
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
    author: "Sophie Lens",
    createdAt: new Date('2024-08-14')
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
    author: "Digital Academy",
    createdAt: new Date('2024-09-01')
  }
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    // Essayer de charger depuis localStorage
    const savedProducts = localStorage.getItem('digistore-products');
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        // Convertir les dates string en objets Date
        return parsedProducts.map((product: any) => ({
          ...product,
          createdAt: new Date(product.createdAt)
        }));
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        return defaultProducts;
      }
    }
    return defaultProducts;
  });

  // Sauvegarder dans localStorage à chaque changement
  const saveToLocalStorage = (newProducts: Product[]) => {
    try {
      console.log('Saving to localStorage:', newProducts.length, 'products');
      const dataToSave = JSON.stringify(newProducts);
      
      // Vérifier la taille des données
      const dataSize = new Blob([dataToSave]).size;
      console.log('Data size to save:', dataSize, 'bytes');
      
      if (dataSize > 4 * 1024 * 1024) { // 4MB limit
        console.warn('Data too large for localStorage, reducing...');
        // Garder seulement les 50 derniers produits si trop volumineux
        const reducedProducts = newProducts.slice(-50);
        localStorage.setItem('digistore-products', JSON.stringify(reducedProducts));
        console.log('Saved reduced data set');
      } else {
        localStorage.setItem('digistore-products', dataToSave);
        console.log('Successfully saved to localStorage');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      // Essayer de nettoyer le localStorage et réessayer
      try {
        localStorage.removeItem('digistore-products');
        localStorage.setItem('digistore-products', JSON.stringify(newProducts.slice(-10)));
        console.log('Cleaned localStorage and saved reduced data');
      } catch (cleanError) {
        console.error('Failed to clean and save:', cleanError);
      }
    }
  };

  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'createdAt'>) => {
    console.log('ProductContext: Adding product', productData);
    
    const newProduct: Product = {
      ...productData,
      id: Math.max(...products.map(p => p.id), 0) + 1,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date(),
      badge: 'Nouveau'
    };

    console.log('ProductContext: New product created', newProduct);

    const updatedProducts = [...products, newProduct];
    console.log('ProductContext: Updated products array', updatedProducts);
    
    setProducts(updatedProducts);
    saveToLocalStorage(updatedProducts);
    
    console.log('ProductContext: Product added and saved');
  };

  const removeProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    saveToLocalStorage(updatedProducts);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...updates } : product
    );
    setProducts(updatedProducts);
    saveToLocalStorage(updatedProducts);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      removeProduct,
      updateProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};