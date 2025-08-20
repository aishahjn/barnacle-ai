import React from 'react';
import { SERVICES_CONTENT, FEATURES_DATA, FEATURE_CARD } from '../../constants/servicesConstants';

/**
 * Reusable Feature Card Component
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {number} props.index
 */

const FeatureCard = ({ title, description, index }) => {
  return (
    <div className="relative group w-full max-w-sm h-96 rounded-3xl flex items-center justify-center
                    bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600
                    text-white text-center shadow-2xl
                    transform transition-all duration-500 ease-out
                    hover:scale-105 hover:shadow-3xl hover:-translate-y-2
                    cursor-pointer overflow-hidden
                    before:absolute before:inset-0 before:bg-gradient-to-br
                    before:from-white/10 before:to-transparent before:rounded-3xl">

      {/* Default State */}
      <div className="flex flex-col items-center justify-center transition-all duration-500
                      group-hover:opacity-0 group-hover:scale-95 z-10">
        <div className={`${FEATURE_CARD.defaultIconSize} rounded-full bg-white/20 flex items-center justify-center mb-4
                        backdrop-blur-sm border border-white/30`}>
          <span className="text-2xl font-bold">{index + 1}</span>
        </div>
        <h3 className="text-xl font-bold tracking-wide">{FEATURE_CARD.defaultTitle}</h3>
      </div>

      {/* Hover State */}
      <div className="absolute inset-0 p-6 flex flex-col justify-center items-center
                      opacity-0 group-hover:opacity-100 transition-all duration-500
                      group-hover:scale-100 z-10">
        <div className={`${FEATURE_CARD.hoverIconSize} rounded-full bg-white/20 flex items-center justify-center mb-4
                        backdrop-blur-sm border border-white/30`}>
          <span className="text-xl font-bold">{index + 1}</span>
        </div>
        <h4 className="text-xl font-bold mb-3 tracking-wide">{title}</h4>
        <p className="text-sm leading-relaxed opacity-90 px-2">{description}</p>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full
                      animate-pulse group-hover:animate-bounce" />
      <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full
                      animate-pulse group-hover:animate-bounce ${FEATURE_CARD.animationDelay}" />
    </div>
  );
};

const Services = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white
                    flex flex-col justify-center items-center py-16 sm:py-20 md:py-24 px-4">
      {/* Header Section */}
      <div className="text-center mx-auto mb-16 sm:mb-20">
        <p className="font-semibold text-teal-500 tracking-[0.5em] uppercase text-4xl sm:text-2xl
                      mb-4 sm:mb-6 opacity-80">
          {SERVICES_CONTENT.subtitle}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900
                       leading-tight tracking-wide whitespace-nowrap">
          {SERVICES_CONTENT.mainHeading}
        </h1>
        <div className="w-30 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mt-10
                        rounded-full" />
      </div>

      {/* Cards Container */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10
                        justify-items-center items-stretch">
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

      {/* Bottom Spacing */}
      <div className="h-16 sm:h-20" />
    </div>
  );
};

export default Services;