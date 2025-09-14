import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import SellPage from './pages/SellPage';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produits" element={<ProductsPage />} />
            <Route path="/vendre" element={<SellPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
