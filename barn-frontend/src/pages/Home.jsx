import React from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <Hero />
      </section>

      {/* Services Section */}
      <section className="relative">
        <Services />
      </section>
    </div>
  );
};

export default Home;