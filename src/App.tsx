import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import SellPage from './pages/SellPage';

function App() {
  return (
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
  );
}

export default App;
