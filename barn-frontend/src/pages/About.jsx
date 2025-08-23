import React, { useState, useEffect } from 'react'
import AboutSections from '../components/about/AboutSections'
import Loading from '../components/shared/Loading'
import { DESIGN_TOKENS } from '../constants/designTokens'
import { MantaRay, Shark, Whale, Lighthouse, Anchor, Submarine, Fish, Jellyfish, Starfish, Seaweed } from '../components/shared/MarineElement'

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading with a brief delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-cyan-800 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <Loading 
            size="large" 
            text="Loading About Section..." 
            variant="default"
            color="blue"
          />
          <div className="space-y-3">
            <p className="text-white text-lg font-medium">
              Discovering our marine mission
            </p>
            <div className="flex items-center justify-center space-x-2 text-cyan-100 text-sm">
              <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
              <span>Loading team and impact data...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full relative overflow-hidden">
      {/* Enhanced Marine Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-12">
          <MantaRay size={180} opacity={0.15} animationSpeed={8} />
        </div>
        <div className="absolute top-1/3 right-16">
          <Shark size={200} opacity={0.2} animationSpeed={7} />
        </div>
        <div className="absolute bottom-32 left-1/4">
          <Whale size={240} opacity={0.1} animationSpeed={10} />
        </div>
        <div className="absolute top-2/3 right-8">
          <Lighthouse size={160} opacity={0.25} />
        </div>
        <div className="absolute bottom-20 right-1/3">
          <Anchor size={100} opacity={0.3} />
        </div>
        <div className="absolute top-1/2 left-8">
          <Submarine size={180} opacity={0.15} />
        </div>
        {/* Additional enhanced elements */}
        <div className="absolute top-1/4 left-1/3">
          <Fish size={120} opacity={0.2} animationSpeed={6} />
        </div>
        <div className="absolute bottom-1/4 right-1/4">
          <Jellyfish size={140} opacity={0.18} animationSpeed={7} />
        </div>
        <div className="absolute top-3/4 left-16">
          <Starfish size={80} opacity={0.25} animationSpeed={5} />
        </div>
        <div className="absolute top-1/6 right-1/3">
          <Seaweed height={120} opacity={0.2} animationSpeed={4} />
        </div>
      </div>
      
      <div className="relative z-10">
        <AboutSections />
      </div>
    </div>
  )
}

export default About