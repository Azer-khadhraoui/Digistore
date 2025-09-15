import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import SellPage from './pages/SellPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { PurchasedProductsProvider } from './context/PurchasedProductsContext';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <PurchasedProductsProvider>
          <Router>
            <div className="App">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produits" element={<ProductsPage />} />
                <Route path="/vendre" element={<SellPage />} />
                <Route path="/panier" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </PurchasedProductsProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
