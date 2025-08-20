import React from 'react';
import backgroundImage from '../../assets/background.jpg';

const Hero = () => {
  return (
    <section
      className="min-h-screen w-full flex items-center justify-end relative overflow-hidden
                 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
    >
      {/* Background Image with Enhanced Overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center sm:bg-center md:bg-left lg:bg-left
                   transform scale-105 sm:scale-100"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.85)), url(${backgroundImage})`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 text-end max-w-4xl mr-40 md:mr-20 pr-8 sm:pr-12 md:pr-16 lg:pr-20">
        <div>
          {/* Main Title */}
          <h1 className="font-bold text-black tracking-widest leading-tight
                         text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                         drop-shadow-sm">
            Barnaclean
          </h1>

          {/* Subtitle */}
          <p className="font-semibold text-black tracking-wider leading-relaxed
                        text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                        opacity-90">
            Save Cost, Save Fuel
          </p>

          {/* CTA Button */}
          <div className="pt-4 sm:pt-6 md:pt-8">
            <button className="group relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5
                               bg-gradient-to-r from-blue-600 to-blue-700
                               text-white font-semibold rounded-2xl
                               hover:from-blue-700 hover:to-blue-800
                               transition-all duration-300 ease-in-out
                               text-sm sm:text-base md:text-lg lg:text-xl
                               tracking-wider shadow-lg hover:shadow-xl
                               transform hover:scale-105 active:scale-95">
              <span className="relative z-10">Start Predicting</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20
                            rounded-2xl transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 right-8 w-32 h-32 bg-blue-100 rounded-full
                      opacity-20 animate-pulse hidden lg:block" />
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-teal-100 rounded-full
                      opacity-30 animate-bounce hidden xl:block" />
    </section>
  );
};

export default Hero;
