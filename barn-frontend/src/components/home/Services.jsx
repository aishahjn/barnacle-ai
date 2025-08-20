import React from 'react';
import { SERVICES_CONTENT, FEATURES_DATA } from '../../constants/servicesConstants';

/**
 * Reusable Feature Card Component
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {number} props.index
 */

const FeatureCard = ({ title, description, index }) => {
  return (
    <div className="relative group w-72 h-96 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600 text-white text-center shadow-xl transform transition-all duration-500 ease-in-out hover:scale-105 cursor-pointer overflow-hidden">

      <div className="flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-3xl font-bold">Features</h3>
        <h3 className="text-3xl font-bold">{index + 1}</h3>
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
        <h4 className="text-2xl font-bold mb-2">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>

    </div>
  );
};

const Services = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-center items-center py-20 px-4">
      <div className="text-center">
        <p className="font-semibold text-teal-500 tracking-[0.2em] uppercase text-4xl">
          {SERVICES_CONTENT.subtitle}
        </p>
        <h1 className=" tracking-widest mt-7 text-4xl md:text-5xl font-bold text-gray-900">
          {SERVICES_CONTENT.mainHeading}
        </h1>
      </div>

      {/* Cards Container */}
      <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8">
        {FEATURES_DATA.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;