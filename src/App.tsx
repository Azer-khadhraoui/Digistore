import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedCourses';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <FeaturedProducts />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
