import React from 'react';
import AboutHero from './AboutHero';
import AboutServices from './AboutServices';
import AboutCompany from './AboutCompany';
import AboutTeam from './AboutTeam';
import AboutImpact from './AboutImpact';

/**
 * Main AboutSections Component
 */
const AboutSections = () => {
  return (
    <div className="w-full">
      <AboutHero />
      <AboutServices />
      <AboutCompany />
      <AboutTeam />
      <AboutImpact />
    </div>
  );
};

export default AboutSections;