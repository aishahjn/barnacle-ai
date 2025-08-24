import React, { useState, useEffect } from 'react';
import { FaChartBar, FaShip, FaIndustry, FaTachometerAlt, FaUser, FaCog, FaInfoCircle, FaChartLine, FaMap, FaGlobe, FaBroadcastTower, FaCalendarAlt } from 'react-icons/fa';
import { DESIGN_TOKENS } from '../constants/designTokens';
import BiofoulingPredictor from '../components/statistics/BiofoulingPredictor';
import CaptainDashboard from '../components/statistics/CaptainDashboard';
import FleetOperatorDashboard from '../components/statistics/FleetOperatorDashboard';
import MarineAnalyticsDashboard from '../components/statistics/MarineAnalyticsDashboard';
import RouteOptimizer from '../components/routing/RouteOptimizer';
import ESGDashboard from '../components/sustainability/ESGDashboard';
import RealTimeDataDashboard from '../components/data/RealTimeDataDashboard';
import MaintenanceScheduler from '../components/maintenance/MaintenanceScheduler';
import Loading from '../components/shared/Loading';
import { Alert } from '../components/shared/Charts';

/**
 * Complete Statistics Page with Tab Navigation
 * Implements Jakob Nielsen's 10 Usability Heuristics:
 * 1. Visibility of system status - Clear tab states and loading indicators
 * 2. Match between system and real world - Marine dashboard terminology
 * 3. User control and freedom - Easy tab navigation and dashboard switching
 * 4. Consistency and standards - Consistent tab design and behavior
 * 5. Error prevention - Clear navigation and user guidance
 * 6. Recognition rather than recall - Visual tab indicators and icons
 * 7. Flexibility and efficiency - Quick dashboard switching for different user roles
 * 8. Aesthetic and minimalist design - Clean, organized layout
 * 9. Help users recognize and recover from errors - Error states and guidance
 * 10. Help and documentation - Contextual help and tooltips
 */

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('fleet');
  const [isLoading, setIsLoading] = useState(true);
  
  // Tab configuration following Nielsen's Heuristic 2: Match between system and real world
  const tabs = [
    {
      id: 'fleet',
      label: 'Fleet Operations',
      icon: <FaIndustry />,
      description: 'Fleet management and performance analytics',
      component: FleetOperatorDashboard,
      userRole: 'Fleet Manager'
    },
    {
      id: 'captain',
      label: 'Captain View',
      icon: <FaShip />,
      description: 'Vessel status and navigation data',
      component: CaptainDashboard,
      userRole: 'Ship Captain'
    },
    {
      id: 'route',
      label: 'Route Optimizer',
      icon: <FaMap />,
      description: 'AI-powered route optimization with fuel savings',
      component: RouteOptimizer,
      userRole: 'Navigation Officer'
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      icon: <FaCalendarAlt />,
      description: 'Hull cleaning optimization and maintenance scheduling',
      component: MaintenanceScheduler,
      userRole: 'Maintenance Manager'
    },
    {
      id: 'realtime',
      label: 'Live Data',
      icon: <FaBroadcastTower />,
      description: 'Real-time AIS, weather, and oceanographic data',
      component: RealTimeDataDashboard,
      userRole: 'Data Analyst'
    },
    {
      id: 'esg',
      label: 'ESG Impact',
      icon: <FaGlobe />,
      description: 'Environmental, Social & Governance metrics',
      component: ESGDashboard,
      userRole: 'Sustainability Officer'
    },
    {
      id: 'predictor',
      label: 'Biofouling Predictor',
      icon: <FaTachometerAlt />,
      description: 'AI-powered growth prediction',
      component: BiofoulingPredictor,
      userRole: 'Marine Engineer'
    },
    {
      id: 'analytics',
      label: 'Advanced Analytics',
      icon: <FaChartLine />,
      description: 'Data visualization and trends',
      component: MarineAnalyticsDashboard,
      userRole: 'Data Analyst'
    }
  ];
  
  // Nielsen Heuristic 1: Visibility of system status
  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  
  // Nielsen Heuristic 3: User control and freedom
  const handleTabChange = (tabId) => {
    if (tabId !== activeTab) {
      setIsLoading(true);
      setActiveTab(tabId);
      
      // Simulate loading new dashboard data
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  };
  
  const currentTab = tabs.find(tab => tab.id === activeTab);
  const ActiveComponent = currentTab?.component;
  
  if (isLoading && activeTab === 'fleet') {
    return (
      <section className="min-h-screen bg-gradient-to-br from-blue-900 to-cyan-800 flex items-center justify-center pt-32">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <Loading 
            size="large" 
            text="Loading BarnaClean Analytics..." 
            variant="default"
            color="blue"
          />
          <div className="space-y-3">
            <p className="text-white text-lg font-medium">
              Initializing systems
            </p>
            <div className="flex items-center justify-center space-x-2 text-cyan-100 text-sm">
              <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
              <span>Loading vessel data...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 to-cyan-800 pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaChartBar className="text-4xl text-cyan-400" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              BarnaClean Analytics
            </h1>
          </div>
          <p className="text-cyan-100 text-lg lg:text-xl max-w-3xl mx-auto">
            Marine analytics for vessel performance optimization
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`group relative min-w-0 flex-1 overflow-hidden py-2 px-2 lg:py-3 lg:px-3 text-center text-xs lg:text-sm font-medium transition-all duration-200 rounded-xl ${
                    isActive
                      ? 'text-blue-600 bg-white shadow-lg'
                      : 'text-white hover:text-blue-100 hover:bg-white/20'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  title={tab.description}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className={`text-lg transition-colors ${
                      isActive ? 'text-blue-600' : 'text-cyan-300 group-hover:text-blue-200'
                    }`}>
                      {tab.icon}
                    </span>
                    <span className="hidden sm:inline font-semibold">{tab.label}</span>
                  </div>
                  <div className={`text-xs mt-1 transition-colors ${
                    isActive ? 'text-blue-500' : 'text-cyan-200'
                  }`}>
                    {tab.userRole}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="space-y-6">
          {/* Loading State for Tab Switching */}
          {isLoading ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-20">
              <div className="flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Loading 
                    size="large" 
                    text={`Loading ${currentTab?.label}...`}
                    variant="default"
                    color="blue"
                  />
                  <p className="text-cyan-100">
                    Loading {currentTab?.userRole.toLowerCase()} view
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Active Dashboard Component */
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20">
              <div className="transition-all duration-300 ease-in-out">
                {ActiveComponent && <ActiveComponent />}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20 mt-8">
          <div className="flex items-center justify-between text-sm text-cyan-100">
            <div className="flex items-center gap-4">
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
              <span>Data refresh: Every 30s</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCog className="text-cyan-300" />
              <button className="text-white hover:text-cyan-200 font-medium transition-colors">
                Dashboard Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;