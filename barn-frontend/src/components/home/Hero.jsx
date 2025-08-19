import React from 'react';
import backgroundImage from '../../assets/background.jpg';

const Hero = () => {
  return (
    <section
      className="h-screen w-full flex items-center justify-center snap-start relative"
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="relative z-10 text-white text-center">
        <h1 className="text-5xl font-bold">Welcome to BARNACLEAN</h1>
      </div>
    </section>
  );
};

export default Hero;