import React from 'react';
import { SERVICE_INFO } from '../../constants/aboutConstants';

const ServiceInfoSection = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col justify-center items-center py-20 px-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <p className="font-semibold text-teal-500 tracking-[0.2em] uppercase text-2xl md:text-3xl">
            {SERVICE_INFO.title}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-8">
            What We Do
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {SERVICE_INFO.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICE_INFO.features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">{feature}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceInfoSection;