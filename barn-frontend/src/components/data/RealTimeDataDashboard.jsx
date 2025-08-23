import React, { useState, useEffect } from 'react';
import { FaWind, FaWater, FaShip, FaSatelliteDish, FaThermometerHalf, FaCompass, FaTachometerAlt, FaMapMarkerAlt, FaBroadcastTower, FaEye } from 'react-icons/fa';
import { DESIGN_TOKENS } from '../../constants/designTokens';
import { MetricCard, StatusBadge, Alert, ProgressBar } from '../shared/Charts';
import Loading from '../shared/Loading';

/**
 * Real-Time Data Dashboard Component
 * Displays live data sources mentioned in BarnaClean document page 6:
 * 
 * 1. Biofouling factors: sea temperature and salinity (key drivers of barnacle growth rates)
 * 2. Voyage dynamics: real-time marine weather (wind speed/direction) and ocean currents  
 * 3. Vessel behavior: historical AIS data (speed, idle times) for operational context
 */

const RealTimeDataDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDataSource, setSelectedDataSource] = useState('ais');
  const [liveData, setLiveData] = useState(null);
  const [connectionStatus] = useState('connected');

  useEffect(() => {
    // Simulate loading real-time data connections
    const timer = setTimeout(() => {
      setIsLoading(false);
      setLiveData(generateMockData());
    }, 1500);
    
    // Simulate periodic data updates
    const updateInterval = setInterval(() => {
      if (!isLoading) {
        setLiveData(generateMockData());
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(updateInterval);
    };
  }, [isLoading]);

  // Generate mock real-time data
  const generateMockData = () => {
    const timestamp = new Date().toLocaleTimeString();
    
    return {
      ais: {
        activeVessels: Math.floor(Math.random() * 50) + 150,
        vesselData: [
          {
            id: 'IMO9234567',
            name: 'MV Pacific Star',
            lat: 1.2966 + (Math.random() - 0.5) * 0.1,
            lng: 103.8522 + (Math.random() - 0.5) * 0.1,
            speed: (12.5 + (Math.random() - 0.5) * 2).toFixed(1),
            course: Math.floor(Math.random() * 360),
            status: 'Under way using engine',
            lastUpdate: timestamp
          },
          {
            id: 'IMO9345678',
            name: 'MV Atlantic Dawn', 
            lat: 51.8985 + (Math.random() - 0.5) * 0.1,
            lng: 4.4844 + (Math.random() - 0.5) * 0.1,
            speed: (8.2 + (Math.random() - 0.5) * 2).toFixed(1),
            course: Math.floor(Math.random() * 360),
            status: 'At anchor',
            lastUpdate: timestamp
          }
        ],
        totalMessages: Math.floor(Math.random() * 1000) + 5000,
        avgUpdateRate: '30s'
      },
      weather: {
        conditions: [
          {
            location: 'Singapore Strait',
            windSpeed: (15.2 + (Math.random() - 0.5) * 5).toFixed(1),
            windDirection: Math.floor(Math.random() * 360),
            waveHeight: (1.8 + Math.random() * 1.5).toFixed(1),
            visibility: (8.5 + Math.random() * 1.5).toFixed(1),
            temperature: (28.5 + (Math.random() - 0.5) * 3).toFixed(1),
            humidity: Math.floor(Math.random() * 20) + 70,
            pressure: (1013 + (Math.random() - 0.5) * 10).toFixed(1)
          },
          {
            location: 'North Sea',
            windSpeed: (22.8 + (Math.random() - 0.5) * 8).toFixed(1),
            windDirection: Math.floor(Math.random() * 360),
            waveHeight: (2.5 + Math.random() * 2).toFixed(1),
            visibility: (6.2 + Math.random() * 3).toFixed(1),
            temperature: (12.1 + (Math.random() - 0.5) * 4).toFixed(1),
            humidity: Math.floor(Math.random() * 15) + 80,
            pressure: (1008 + (Math.random() - 0.5) * 15).toFixed(1)
          }
        ],
        lastUpdate: timestamp,
        forecastAccuracy: '94.2%'
      },
      oceanCurrents: {
        currents: [
          {
            region: 'Malacca Strait',
            speed: (0.8 + Math.random() * 1.2).toFixed(2),
            direction: Math.floor(Math.random() * 360),
            temperature: (29.2 + (Math.random() - 0.5) * 2).toFixed(1),
            salinity: (34.1 + (Math.random() - 0.5) * 1).toFixed(1),
            depth: '0-50m'
          },
          {
            region: 'English Channel',
            speed: (1.2 + Math.random() * 1.5).toFixed(2),
            direction: Math.floor(Math.random() * 360),
            temperature: (14.8 + (Math.random() - 0.5) * 2).toFixed(1),
            salinity: (35.2 + (Math.random() - 0.5) * 0.8).toFixed(1),
            depth: '0-50m'
          }
        ],
        modelResolution: '1/12°',
        updateFrequency: '3 hours',
        lastUpdate: timestamp
      },
      environmental: {
        biofoulingFactors: {
          seaTemperature: (25.8 + (Math.random() - 0.5) * 4).toFixed(1),
          salinity: (34.8 + (Math.random() - 0.5) * 1.5).toFixed(1),
          dissolvedOxygen: (7.2 + Math.random() * 1.5).toFixed(1),
          turbidity: (12.5 + Math.random() * 8).toFixed(1),
          phLevel: (8.1 + (Math.random() - 0.5) * 0.3).toFixed(2)
        },
        growthRisk: Math.random() > 0.5 ? 'moderate' : 'low',
        riskFactors: ['Optimal temperature range', 'High salinity levels'],
        lastAssessment: timestamp
      }
    };
  };

  const dataSources = [
    { id: 'ais', label: 'AIS Data', icon: <FaSatelliteDish />, color: 'blue' },
    { id: 'weather', label: 'Marine Weather', icon: <FaWind />, color: 'green' },
    { id: 'oceanCurrents', label: 'Ocean Currents', icon: <FaWater />, color: 'cyan' },
    { id: 'environmental', label: 'Environmental', icon: <FaThermometerHalf />, color: 'orange' }
  ];

  if (isLoading) {
    return (
      <div className="w-full space-y-6">
        <div className="text-center">
          <Loading 
            size="large" 
            text="Connecting to real-time data sources..." 
            variant="default"
            color="blue"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white flex items-center justify-center gap-2">
          <FaBroadcastTower className="text-blue-400" />
          Real-Time Data Dashboard
        </h2>
        <p className="text-cyan-100 text-sm">
          Live AIS, weather, and oceanographic data for biofouling prediction
        </p>
      </div>

      {/* Connection Status */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusBadge 
              status={connectionStatus} 
              text={connectionStatus === 'connected' ? 'All Systems Online' : 'Connection Issues'}
            />
            <span className="text-cyan-100 text-sm">
              Last updated: {liveData?.ais?.vesselData[0]?.lastUpdate}
            </span>
          </div>
          <div className="flex items-center gap-2 text-cyan-100 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live data streaming</span>
          </div>
        </div>
      </div>

      {/* Data Source Tabs */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20">
        <div className="flex flex-wrap gap-2">
          {dataSources.map((source) => {
            const isActive = selectedDataSource === source.id;
            return (
              <button
                key={source.id}
                onClick={() => setSelectedDataSource(source.id)}
                className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? `bg-${source.color}-600 text-white shadow-lg`
                    : 'text-white hover:text-blue-100 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{source.icon}</span>
                  <span className="hidden sm:inline font-semibold">{source.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* AIS Data Display */}
      {selectedDataSource === 'ais' && liveData?.ais && (
        <div className="space-y-4">
          <Alert
            type="info"
            title="AIS Network Status"
            message={`Tracking ${liveData.ais.activeVessels} active vessels with ${liveData.ais.totalMessages} messages processed`}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <MetricCard
              title="Active Vessels"
              value={liveData.ais.activeVessels.toString()}
              icon={<FaShip className="text-blue-400" />}
              trend="positive"
              className="bg-white/10 border-white/20"
            />
            <MetricCard
              title="Messages/Hour"
              value={liveData.ais.totalMessages.toString()}
              icon={<FaSatelliteDish className="text-green-400" />}
              trend="positive"
              className="bg-white/10 border-white/20"
            />
            <MetricCard
              title="Update Rate"
              value={liveData.ais.avgUpdateRate}
              icon={<FaBroadcastTower className="text-cyan-400" />}
              className="bg-white/10 border-white/20"
            />
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Live Vessel Tracking</h3>
            <div className="space-y-4">
              {liveData.ais.vesselData.map((vessel) => (
                <div key={vessel.id} className="bg-white/10 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-semibold text-white">{vessel.name}</h4>
                      <p className="text-cyan-200 text-sm">{vessel.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-400" />
                      <div>
                        <div className="text-white text-sm">{vessel.lat.toFixed(4)}°, {vessel.lng.toFixed(4)}°</div>
                        <div className="text-cyan-200 text-xs">{vessel.status}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTachometerAlt className="text-yellow-400" />
                      <div>
                        <div className="text-white text-sm">{vessel.speed} knots</div>
                        <div className="text-cyan-200 text-xs">Course: {vessel.course}°</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEye className="text-green-400" />
                      <div>
                        <div className="text-white text-sm">Live</div>
                        <div className="text-cyan-200 text-xs">{vessel.lastUpdate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Weather Data Display */}
      {selectedDataSource === 'weather' && liveData?.weather && (
        <div className="space-y-4">
          <Alert
            type="success"
            title="Weather Data Active"
            message={`Marine weather monitoring with ${liveData.weather.forecastAccuracy} forecast accuracy`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveData.weather.conditions.map((condition, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">{condition.location}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    title="Wind Speed"
                    value={`${condition.windSpeed} kts`}
                    icon={<FaWind className="text-green-400" />}
                    className="bg-white/10 border-white/20"
                  />
                  <MetricCard
                    title="Wave Height"
                    value={`${condition.waveHeight} m`}
                    icon={<FaWater className="text-blue-400" />}
                    className="bg-white/10 border-white/20"
                  />
                  <MetricCard
                    title="Temperature"
                    value={`${condition.temperature}°C`}
                    icon={<FaThermometerHalf className="text-orange-400" />}
                    className="bg-white/10 border-white/20"
                  />
                  <MetricCard
                    title="Visibility"
                    value={`${condition.visibility} nm`}
                    icon={<FaEye className="text-cyan-400" />}
                    className="bg-white/10 border-white/20"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-200">Wind Direction:</span>
                    <span className="text-white">{condition.windDirection}°</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-200">Humidity:</span>
                    <span className="text-white">{condition.humidity}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-200">Pressure:</span>
                    <span className="text-white">{condition.pressure} hPa</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ocean Currents Display */}
      {selectedDataSource === 'oceanCurrents' && liveData?.oceanCurrents && (
        <div className="space-y-4">
          <Alert
            type="info"
            title="Ocean Current Model Active"
            message={`High-resolution current data at ${liveData.oceanCurrents.modelResolution} resolution, updated every ${liveData.oceanCurrents.updateFrequency}`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveData.oceanCurrents.currents.map((current, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">{current.region}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    title="Current Speed"
                    value={`${current.speed} m/s`}
                    icon={<FaWater className="text-cyan-400" />}
                    className="bg-white/10 border-white/20"
                  />
                  <MetricCard
                    title="Direction"
                    value={`${current.direction}°`}
                    icon={<FaCompass className="text-purple-400" />}
                    className="bg-white/10 border-white/20"
                  />
                  <MetricCard
                    title="Sea Temperature"
                    value={`${current.temperature}°C`}
                    icon={<FaThermometerHalf className="text-red-400" />}
                    className="bg-white/10 border-white/20"
                  />
                  <MetricCard
                    title="Salinity"
                    value={`${current.salinity} PSU`}
                    icon={<FaWater className="text-blue-400" />}
                    className="bg-white/10 border-white/20"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-200">Depth Range:</span>
                    <span className="text-white">{current.depth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Environmental Factors Display */}
      {selectedDataSource === 'environmental' && liveData?.environmental && (
        <div className="space-y-4">
          <Alert
            type={liveData.environmental.growthRisk === 'high' ? 'warning' : 'success'}
            title={`Biofouling Risk: ${liveData.environmental.growthRisk.toUpperCase()}`}
            message={`Current environmental conditions present ${liveData.environmental.growthRisk} risk for barnacle growth`}
          />

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Biofouling Environmental Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard
                title="Sea Temperature"
                value={`${liveData.environmental.biofoulingFactors.seaTemperature}°C`}
                icon={<FaThermometerHalf className="text-red-400" />}
                trend={parseFloat(liveData.environmental.biofoulingFactors.seaTemperature) > 25 ? 'warning' : 'positive'}
                className="bg-white/10 border-white/20"
              />
              <MetricCard
                title="Salinity"
                value={`${liveData.environmental.biofoulingFactors.salinity} PSU`}
                icon={<FaWaves className="text-blue-400" />}
                trend={parseFloat(liveData.environmental.biofoulingFactors.salinity) > 34 ? 'warning' : 'positive'}
                className="bg-white/10 border-white/20"
              />
              <MetricCard
                title="Dissolved O₂"
                value={`${liveData.environmental.biofoulingFactors.dissolvedOxygen} mg/L`}
                icon={<FaWind className="text-green-400" />}
                className="bg-white/10 border-white/20"
              />
              <MetricCard
                title="Turbidity"
                value={`${liveData.environmental.biofoulingFactors.turbidity} NTU`}
                icon={<FaEye className="text-yellow-400" />}
                className="bg-white/10 border-white/20"
              />
              <MetricCard
                title="pH Level"
                value={liveData.environmental.biofoulingFactors.phLevel}
                icon={<FaThermometerHalf className="text-purple-400" />}
                className="bg-white/10 border-white/20"
              />
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-2">Risk Factors</h4>
              <div className="space-y-2">
                {liveData.environmental.riskFactors.map((factor, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-cyan-100 text-sm">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeDataDashboard;