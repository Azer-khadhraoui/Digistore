import React from 'react';
import Hero from '../components/Hero';
import FeaturedCourses from '../components/FeaturedCourses';
import Features from '../components/Features';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedCourses />
      <Features />
    </div>
  );
};

export default Home;