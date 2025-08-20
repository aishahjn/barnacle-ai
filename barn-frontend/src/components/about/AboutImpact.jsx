import React from 'react';
import { IMPACT_STATS } from '../../constants/aboutConstants';

const ImpactCard = ({ value, label, description }) => {
  return (
    <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 mb-4">
        {value}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{label}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const ImpactSection = () => {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col justify-center items-center py-20 px-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <p className="font-semibold text-teal-500 tracking-[0.2em] uppercase text-2xl md:text-3xl">
            OUR IMPACT
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-8">
            Making a Difference
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our solutions don't just save money—they create real environmental and operational impact that matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {IMPACT_STATS.map((stat, index) => (
            <ImpactCard
              key={index}
              value={stat.value}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;