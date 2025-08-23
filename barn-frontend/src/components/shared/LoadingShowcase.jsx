import React, { useState } from 'react';
import Loading, { LoadingOverlay, InlineLoading, SkeletonLoader, PulseLoader } from './Loading';

/**
 * Minimalistic Loading Component Showcase
 * Demonstrates clean loading variants and features
 */
const LoadingShowcase = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [progress, setProgress] = useState(65);

  const variants = ['default', 'dots', 'bar'];
  const colors = ['gray', 'blue', 'green'];
  const sizes = ['small', 'medium', 'large'];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Minimalistic Loading Components</h1>
          <p className="text-lg text-gray-600">Clean, simple loading indicators with essential functionality</p>
        </div>

        {/* Main Loading Variants */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">Loading Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {variants.map(variant => (
              <div key={variant} className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-6 capitalize text-center">{variant}</h3>
                <div className="flex justify-center">
                  <Loading 
                    variant={variant}
                    text={`${variant} loading...`}
                    size="medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Color Variations */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">Color Variations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {colors.map(color => (
              <div key={color} className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-6 capitalize text-center">{color}</h3>
                <div className="flex justify-center">
                  <Loading 
                    variant="default"
                    color={color}
                    text={`${color} color`}
                    size="medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">Size Variations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sizes.map(size => (
              <div key={size} className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-6 capitalize text-center">{size}</h3>
                <div className="flex justify-center">
                  <Loading 
                    variant="default"
                    size={size}
                    text={`${size} size`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Progress Loading */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">Progress Loading</h2>
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center space-y-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  -10%
                </button>
                <span className="font-medium text-gray-700 min-w-[100px] text-center">Progress: {progress}%</span>
                <button
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  +10%
                </button>
              </div>
              <Loading 
                variant="default"
                size="large"
                progress={progress}
                showPercentage={true}
                text="Processing your request..."
              />
            </div>
          </div>
        </section>

        {/* Inline Loaders */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">Inline Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Inline Loading */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-700 mb-6 text-center">Inline Loading</h3>
              <div className="space-y-6">
                <InlineLoading text="Processing..." variant="default" />
                <InlineLoading text="Saving data..." variant="dots" color="blue" />
                <InlineLoading text="Loading content..." variant="bar" color="green" />
              </div>
            </div>

            {/* Pulse Loader */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-700 mb-6 text-center">Pulse Loader</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-md flex items-center space-x-2">
                    <PulseLoader size="small" color="white" />
                    <span>Loading</span>
                  </button>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <PulseLoader size="medium" color="blue" />
                  <span className="text-gray-600">Processing request...</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skeleton Loader */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">Skeleton Loader</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-700 mb-6 text-center">With Avatar</h3>
              <SkeletonLoader lines={3} showAvatar={true} />
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-gray-700 mb-6 text-center">Text Only</h3>
              <SkeletonLoader lines={4} showAvatar={false} />
            </div>
          </div>
        </section>

        {/* Loading Overlay Demo */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">Loading Overlay</h2>
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-center">
              <button
                onClick={() => setShowOverlay(true)}
                className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Show Loading Overlay
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Loading Overlay */}
      {showOverlay && (
        <LoadingOverlay 
          text="Loading data..."
          progress={progress}
          variant="default"
          color="gray"
          onClose={() => setShowOverlay(false)}
        />
      )}

      {/* Auto close overlay after 3 seconds */}
      {showOverlay && setTimeout(() => setShowOverlay(false), 3000)}
    </div>
  );
};

export default LoadingShowcase;