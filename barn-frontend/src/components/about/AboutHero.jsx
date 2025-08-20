import React from 'react';
import { ABOUT_CONTENT } from '../../constants/aboutConstants';

const AboutHero = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-blue-900 to-cyan-800 flex flex-col justify-center items-center text-white py-20 px-4">
      <div className="text-center max-w-4xl">
        <p className="font-semibold text-teal-300 tracking-[0.2em] uppercase text-2xl md:text-3xl">
          {ABOUT_CONTENT.subtitle}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-8">
          {ABOUT_CONTENT.mainHeading}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
          Discover how BarnaClean is revolutionizing industrial operations through innovative technology and sustainable practices.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;