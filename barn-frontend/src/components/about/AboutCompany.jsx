import React from 'react';
import { COMPANY_INFO } from '../../constants/aboutConstants';

const CompanyInfoSection = () => {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col justify-center items-center py-20 px-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <p className="font-semibold text-teal-500 tracking-[0.2em] uppercase text-2xl md:text-3xl">
            {COMPANY_INFO.title}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-8">
            Our Story & Vision
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Background</h3>
            <p className="text-gray-700 leading-relaxed">{COMPANY_INFO.background}</p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
            <p className="text-gray-700 leading-relaxed">{COMPANY_INFO.mission}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
            <p className="text-gray-700 leading-relaxed">{COMPANY_INFO.vision}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfoSection;