import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './ProductContext';

export interface PurchasedProduct {
  productId: number;
  purchaseDate: Date;
  orderId: string;
  downloadUrl?: string;
  downloadCount: number;
  maxDownloads: number;
}

interface PurchasedProductsContextType {
  purchasedProducts: PurchasedProduct[];
  addPurchasedProduct: (productId: number, orderId: string) => void;
  isPurchased: (productId: number) => boolean;
  getPurchasedProduct: (productId: number) => PurchasedProduct | undefined;
  incrementDownloadCount: (productId: number) => void;
  canDownload: (productId: number) => boolean;
}

const PurchasedProductsContext = createContext<PurchasedProductsContextType | undefined>(undefined);

export const PurchasedProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>(() => {
    // Charger depuis localStorage
    const saved = localStorage.getItem('digistore-purchased-products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => ({
          ...item,
          purchaseDate: new Date(item.purchaseDate)
        }));
      } catch (error) {
        console.error('Erreur lors du chargement des produits achetés:', error);
        return [];
      }
    }
    return [];
  });

  const saveToLocalStorage = (products: PurchasedProduct[]) => {
    try {
      localStorage.setItem('digistore-purchased-products', JSON.stringify(products));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des produits achetés:', error);
    }
  };

  const addPurchasedProduct = (productId: number, orderId: string) => {
    const newPurchase: PurchasedProduct = {
      productId,
      purchaseDate: new Date(),
      orderId,
      downloadUrl: generateDownloadUrl(productId),
      downloadCount: 0,
      maxDownloads: 10 // Limite de téléchargements
    };

    setPurchasedProducts(prev => {
      // Éviter les doublons
      const filtered = prev.filter(p => p.productId !== productId);
      const updated = [...filtered, newPurchase];
      saveToLocalStorage(updated);
      return updated;
    });
  };

  const isPurchased = (productId: number): boolean => {
    return purchasedProducts.some(p => p.productId === productId);
  };

  const getPurchasedProduct = (productId: number): PurchasedProduct | undefined => {
    return purchasedProducts.find(p => p.productId === productId);
  };

  const incrementDownloadCount = (productId: number) => {
    setPurchasedProducts(prev => {
      const updated = prev.map(p =>
        p.productId === productId
          ? { ...p, downloadCount: p.downloadCount + 1 }
          : p
      );
      saveToLocalStorage(updated);
      return updated;
    });
  };

  const canDownload = (productId: number): boolean => {
    const purchased = getPurchasedProduct(productId);
    return purchased ? purchased.downloadCount < purchased.maxDownloads : false;
  };

  // Génère une URL de téléchargement simulée
  const generateDownloadUrl = (productId: number): string => {
    // En production, ceci serait une vraie URL sécurisée
    return `https://downloads.digistore.com/product-${productId}-${Date.now()}.zip`;
  };

  return (
    <PurchasedProductsContext.Provider value={{
      purchasedProducts,
      addPurchasedProduct,
      isPurchased,
      getPurchasedProduct,
      incrementDownloadCount,
      canDownload
    }}>
      {children}
    </PurchasedProductsContext.Provider>
  );
};

export const usePurchasedProducts = () => {
  const context = useContext(PurchasedProductsContext);
  if (context === undefined) {
    throw new Error('usePurchasedProducts must be used within a PurchasedProductsProvider');
  }
  return context;
};