import React, { useState, useEffect } from 'react';
import { FaChartBar, FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaShip, FaClock } from 'react-icons/fa';
import { calculateRealBiofoulingPrediction } from '../../utils/csvDataLoader'; // Updated import
import { ProgressBar, StatusBadge, Alert, MetricCard } from '../shared/Charts';

/**
 * Enhanced BiofoulingPredictor Component
 * Implements Jakob Nielsen's 10 Usability Heuristics:
 * 1. Visibility of system status - Real-time prediction updates
 * 2. Match between system and real world - Marine terminology
 * 3. User control and freedom - Reset/clear functionality
 * 4. Consistency and standards - Consistent input patterns
 * 5. Error prevention - Input validation
 * 6. Recognition rather than recall - Clear labels and units
 * 7. Flexibility and efficiency - Quick presets for common scenarios
 * 8. Aesthetic and minimalist design - Clean, focused interface
 * 9. Help users recognize and recover from errors - Clear error messages
 * 10. Help and documentation - Tooltips and guidance
 */

const BiofoulingPredictor = () => {
  const [formData, setFormData] = useState({
    seaTemperature: 25.0,
    salinity: 35.0,
    vesselSpeed: 12.0,
    idleTime: 0,
    daysSinceClean: 30,
    chlorophyllA: 0.5, // Added based on real data
    windSpeed: 5.0,    // Added based on real data
    currentSpeed: 0.5  // Added based on real data
  });
  
  const [prediction, setPrediction] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  // Nielsen Heuristic 1: Visibility of System Status
  // Real-time calculation when inputs change
  useEffect(() => {
    const calculatePrediction = () => {
      // Simple validation for now
      const hasValidData = Object.values(formData).every(val => !isNaN(val) && val !== null && val !== undefined);
      
      if (hasValidData) {
        setErrors({});
        setIsCalculating(true);
        
        // Simulate calculation delay for better UX feedback
        setTimeout(() => {
          // Updated to use real data prediction function
          const result = calculateRealBiofoulingPrediction(formData);
          setPrediction(result);
          setIsCalculating(false);
          
          // Show alert for high fouling conditions
          if (result.foulingClass === 'high' && result.recommendedCleaning) {
            setShowAlert(true);
          }
        }, 300);
      } else {
        setPrediction(null);
      }
    };
    
    calculatePrediction();
  }, [formData]);
  
  // Nielsen Heuristic 2: Match between system and real world
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };
  
  // Nielsen Heuristic 3: User control and freedom
  const handleReset = () => {
    setFormData({
      seaTemperature: 25.0,
      salinity: 35.0,
      vesselSpeed: 12.0,
      idleTime: 0,
      daysSinceClean: 30,
      chlorophyllA: 0.5,
      windSpeed: 5.0,
      currentSpeed: 0.5
    });
    setShowAlert(false);
  };
  
  // Nielsen Heuristic 7: Flexibility and efficiency
  const presets = {
    tropical: { seaTemperature: 28.0, salinity: 36.0, chlorophyllA: 1.2, label: 'Tropical Waters' },
    temperate: { seaTemperature: 22.0, salinity: 34.0, chlorophyllA: 0.5, label: 'Temperate Waters' },
    arctic: { seaTemperature: 5.0, salinity: 32.0, chlorophyllA: 0.1, label: 'Arctic Waters' }
  };
  
  const applyPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      ...presets[preset]
    }));
  };
  
  // Removed unused styles variable
  
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white flex items-center justify-center gap-2">
          <FaShip className="text-cyan-400" />
          Biofouling Growth Predictor
        </h2>
      </div>
      
      {/* Alert for high fouling */}
      {showAlert && prediction && prediction.recommendedCleaning && (
        <Alert
          type="warning"
          title="Cleaning Recommended"
          message={`Hull cleaning is recommended. Current fouling level: ${prediction.foulingPercent}%. Expected fuel penalty: ${prediction.fuelPenaltyPercent}%`}
          onDismiss={() => setShowAlert(false)}
        />
      )}
      
      {/* Quick Presets */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
        <h3 className="text-sm font-semibold text-white mb-3">Quick Environmental Presets</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(presets).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-md text-xs transition-colors border border-white/30"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Environmental Conditions */}
        <div className="space-y-4 md:col-span-2 lg:col-span-2">
          <h3 className="font-semibold text-white text-sm border-b border-white/30 pb-2">
            Environmental Conditions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sea Temperature */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2 flex items-center gap-1">
                Sea Temperature (°C)
                <FaInfoCircle 
                  className="text-cyan-300 text-xs cursor-help" 
                  title="Optimal growth: 25-30°C"
                />
              </label>
              <input 
                type="number" 
                step="0.1"
                min="-2"
                max="40"
                value={formData.seaTemperature}
                onChange={(e) => handleInputChange('seaTemperature', e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm ${
                  errors.seaTemperature ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="25.0"
              />
              {errors.seaTemperature && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationTriangle />
                  {errors.seaTemperature}
                </p>
              )}
            </div>
            
            {/* Salinity */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2 flex items-center gap-1">
                Salinity (PSU)
                <FaInfoCircle 
                  className="text-cyan-300 text-xs cursor-help" 
                  title="Optimal growth: 34-38 PSU"
                />
              </label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="45"
                value={formData.salinity}
                onChange={(e) => handleInputChange('salinity', e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm ${
                  errors.salinity ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="35.0"
              />
              {errors.salinity && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationTriangle />
                  {errors.salinity}
                </p>
              )}
            </div>
            
            {/* Vessel Speed */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2 flex items-center gap-1">
                Vessel Speed (knots)
                <FaInfoCircle 
                  className="text-cyan-300 text-xs cursor-help" 
                  title="Lower speeds increase fouling risk"
                />
              </label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="30"
                value={formData.vesselSpeed}
                onChange={(e) => handleInputChange('vesselSpeed', e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm ${
                  errors.vesselSpeed ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="12.0"
              />
              {errors.vesselSpeed && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationTriangle />
                  {errors.vesselSpeed}
                </p>
              )}
            </div>
            
            {/* Idle Time */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2 flex items-center gap-1">
                Idle Time (hours)
                <FaInfoCircle 
                  className="text-cyan-300 text-xs cursor-help" 
                  title="Extended idle time increases fouling"
                />
              </label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="168"
                value={formData.idleTime}
                onChange={(e) => handleInputChange('idleTime', e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm ${
                  errors.idleTime ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="0"
              />
              {errors.idleTime && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationTriangle />
                  {errors.idleTime}
                </p>
              )}
            </div>
            
            {/* Days Since Cleaning */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2 flex items-center gap-1">
                Days Since Hull Cleaning
                <FaInfoCircle 
                  className="text-cyan-300 text-xs cursor-help" 
                  title="Fouling accumulates over time"
                />
              </label>
              <input 
                type="number" 
                step="1"
                min="0"
                max="365"
                value={formData.daysSinceClean}
                onChange={(e) => handleInputChange('daysSinceClean', e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm ${
                  errors.daysSinceClean ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="30"
              />
              {errors.daysSinceClean && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationTriangle />
                  {errors.daysSinceClean}
                </p>
              )}
            </div>
            
            {/* Chlorophyll-a */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2 flex items-center gap-1">
                Chlorophyll-a (mg/m³)
                <FaInfoCircle 
                  className="text-cyan-300 text-xs cursor-help" 
                  title="Nutrient availability affects growth"
                />
              </label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                max="20"
                value={formData.chlorophyllA}
                onChange={(e) => handleInputChange('chlorophyllA', e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm ${
                  errors.chlorophyllA ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="0.5"
              />
              {errors.chlorophyllA && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationTriangle />
                  {errors.chlorophyllA}
                </p>
              )}
            </div>
            
            {/* Wind Speed */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2 flex items-center gap-1">
                Wind Speed (m/s)
                <FaInfoCircle 
                  className="text-cyan-300 text-xs cursor-help" 
                  title="Environmental stress factor"
                />
              </label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="50"
                value={formData.windSpeed}
                onChange={(e) => handleInputChange('windSpeed', e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm ${
                  errors.windSpeed ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="5.0"
              />
              {errors.windSpeed && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationTriangle />
                  {errors.windSpeed}
                </p>
              )}
            </div>
            
            {/* Ocean Current Speed */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2 flex items-center gap-1">
                Ocean Current (m/s)
                <FaInfoCircle 
                  className="text-cyan-300 text-xs cursor-help" 
                  title="Water movement affects fouling"
                />
              </label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                max="5"
                value={formData.currentSpeed}
                onChange={(e) => handleInputChange('currentSpeed', e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm ${
                  errors.currentSpeed ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="0.5"
              />
              {errors.currentSpeed && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationTriangle />
                  {errors.currentSpeed}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Prediction Results */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white text-sm border-b border-white/30 pb-2">
            Prediction Results
          </h3>
          
          {isCalculating ? (
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400 mb-3"></div>
                <p className="text-cyan-100">Calculating...</p>
              </div>
            </div>
          ) : prediction ? (
            <div className="space-y-4">
              {/* Fouling Percentage */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Fouling Level</span>
                  <StatusBadge status={prediction.foulingClass} />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {prediction.foulingPercent}%
                </div>
                <ProgressBar progress={prediction.foulingPercent} />
              </div>
              
              {/* Fuel Penalty */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <FaInfoCircle className="text-cyan-300" />
                  <span className="text-white font-medium">Fuel Penalty</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  +{prediction.fuelPenaltyPercent}%
                </div>
                <p className="text-cyan-100 text-sm mt-1">
                  Estimated increase in fuel consumption
                </p>
              </div>
              
              {/* Speed Reduction */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <FaShip className="text-cyan-300" />
                  <span className="text-white font-medium">Speed Reduction</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {prediction.speedReduction}%
                </div>
                <p className="text-cyan-100 text-sm mt-1">
                  Expected vessel speed decrease
                </p>
              </div>
              
              {/* Recommendations */}
              {prediction.recommendedCleaning && (
                <div className="bg-yellow-500/20 backdrop-blur-md rounded-lg p-4 border border-yellow-500/30">
                  <div className="flex items-start gap-2">
                    <FaExclamationTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-200 mb-1">Cleaning Recommended</h4>
                      <p className="text-yellow-100 text-sm">
                        Hull cleaning is recommended to prevent further efficiency loss.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Environmental Factors */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <h4 className="font-semibold text-white mb-3">Environmental Factors</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-cyan-200 text-sm">Temperature</div>
                    <div className="font-semibold text-white">{prediction.environmentalFactors.temperature}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyan-200 text-sm">Salinity</div>
                    <div className="font-semibold text-white">{prediction.environmentalFactors.salinity}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyan-200 text-sm">Speed</div>
                    <div className="font-semibold text-white">{prediction.environmentalFactors.speed}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyan-200 text-sm">Idle Time</div>
                    <div className="font-semibold text-white">{prediction.environmentalFactors.idle}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-center">
              <FaInfoCircle className="text-cyan-300 text-2xl mx-auto mb-3" />
              <p className="text-cyan-100">
                Enter environmental conditions to see biofouling predictions
              </p>
            </div>
          )}
          
          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/30 transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
      
      {/* Information Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
        <div className="flex items-start gap-3">
          <FaInfoCircle className="text-cyan-300 text-lg mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white mb-1">How It Works</h3>
            <p className="text-cyan-100 text-sm">
              Our AI model uses real-world biofouling data to predict hull growth based on environmental conditions. 
              The enhanced algorithm considers temperature, salinity, vessel speed, idle time, and additional factors 
              like chlorophyll-a concentration and ocean currents for more accurate predictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiofoulingPredictor;