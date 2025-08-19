import React from 'react';
import backgroundImage from '../assets/background.jpg';
import NavBar from '../components/shared/NavBar';

const Home = () => {
  return (
    <div>
      <NavBar />
      {/* Hero Section */}
      <section
        className="h-screen w-full flex items-center justify-center snap-start relative"
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="relative z-10 text-white text-center">
          <h1 className="text-5xl font-bold">Welcome to BARNACLEAN</h1>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="h-screen w-full flex items-center justify-center snap-start bg-indigo-900"
      >
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold">Our Services</h2>
        </div>
      </section>
    </div>
  );
};

export default Home;