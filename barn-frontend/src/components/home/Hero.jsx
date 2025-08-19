import React from 'react';
import backgroundImage from '../../assets/background.jpg';

const Hero = () => {
  return (
    <section
      className="h-screen w-full flex items-center justify-end snap-start relative px-6 md:pr-40 lg:pr-60"
    >
      <div
  className="absolute top-0 left-0 w-full h-full bg-cover bg-center sm:bg-center md:bg-left"
  style={{
    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.63)), url(${backgroundImage})`,
  }}
></div>

      <div className="relative z-10 text-right">
        <h1 className="font-bold text-black tracking-wide 
                       text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          Barnaclean
        </h1>
        <p className="mt-3 font-semibold text-black tracking-wide 
                      text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Save Cost, Save Fuel
        </p>
        <button className="mt-6 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold 
                           rounded-2xl hover:bg-blue-700 transition duration-300 
                           text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide">
          Start Predicting
        </button>
      </div>
    </section>
  );
};

export default Hero;
