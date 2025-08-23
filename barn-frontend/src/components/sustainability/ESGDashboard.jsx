import React, { useState, useEffect } from 'react';
import { FaLeaf, FaUsers, FaBalanceScale, FaChartArea, FaWater, FaIndustry, FaGlobe, FaHeart, FaShieldAlt, FaTrophy, FaCertificate, FaRecycle } from 'react-icons/fa';
import { DESIGN_TOKENS } from '../../constants/designTokens';
import { MetricCard, StatusBadge, Alert, ProgressBar } from '../shared/Charts';
import Loading from '../shared/Loading';

/**
 * ESG Dashboard Component
 * Tracks Environmental, Social, and Governance metrics as outlined in BarnaClean document
 * 
 * Environmental: Reduced Fuel Consumption & Emissions, Less Chemical Pollution, Preserving Biodiversity, Ocean Restoration
 * Social: Improved Crew Safety, Enhanced Industry Reputation, Community Well-being
 * Governance: Data-Driven Compliance, Optimized Resource Management, Innovation & Leadership
 */

const ESGDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('current_year');
  const [activeESGTab, setActiveESGTab] = useState('environmental');

  useEffect(() => {
    // Simulate loading ESG data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // ESG Data based on BarnaClean document metrics
  const esgData = {
    environmental: {
      metrics: [
        {
          title: 'CO₂ Emissions Reduced',
          current: '500,000',
          unit: 'tons/year',
          trend: 'positive',
          change: '+21.3%',
          icon: <FaLeaf className="text-green-500" />,
          description: 'Carbon footprint reduction through optimized routing'
        },
        {
          title: 'Fuel Consumption Saved',
          current: '18.5',
          unit: '%',
          trend: 'positive', 
          change: '+15.2%',
          icon: <FaIndustry className="text-blue-500" />,
          description: 'Fuel efficiency improvements via AI optimization'
        },
        {
          title: 'Chemical Pollution Reduced',
          current: '85',
          unit: '%',
          trend: 'positive',
          change: '+12.8%', 
          icon: <FaWater className="text-cyan-500" />,
          description: 'Less frequent hull cleaning reduces chemical use'
        },
        {
          title: 'Biodiversity Protection',
          current: '95',
          unit: '% compliance',
          trend: 'positive',
          change: '+8.4%',
          icon: <FaGlobe className="text-emerald-500" />,
          description: 'Marine ecosystem preservation initiatives'
        }
      ],
      targets: {
        co2Reduction: { target: 30, achieved: 21.3 },
        fuelSaving: { target: 25, achieved: 18.5 },
        chemicalReduction: { target: 90, achieved: 85 }
      }
    },
    social: {
      metrics: [
        {
          title: 'Crew Safety Score',
          current: '94.7',
          unit: '%',
          trend: 'positive',
          change: '+5.2%',
          icon: <FaShieldAlt className="text-yellow-500" />,
          description: 'Improved working conditions and safety protocols'
        },
        {
          title: 'Industry Reputation Index',
          current: '4.8',
          unit: '/5.0',
          trend: 'positive',
          change: '+0.3%',
          icon: <FaTrophy className="text-purple-500" />,
          description: 'Enhanced brand reputation and stakeholder trust'
        },
        {
          title: 'Community Well-being',
          current: '87',
          unit: '% positive',
          trend: 'positive',
          change: '+7.1%',
          icon: <FaHeart className="text-red-500" />,
          description: 'Positive impact on coastal communities'
        },
        {
          title: 'Employee Satisfaction',
          current: '92',
          unit: '%',
          trend: 'positive',
          change: '+4.8%',
          icon: <FaUsers className="text-indigo-500" />,
          description: 'Workforce engagement and satisfaction levels'
        }
      ],
      initiatives: [
        'Crew training and safety programs',
        'Community engagement projects',
        'Industry leadership participation',
        'Stakeholder transparency initiatives'
      ]
    },
    governance: {
      metrics: [
        {
          title: 'Compliance Score',
          current: '98.2',
          unit: '%',
          trend: 'positive',
          change: '+2.1%',
          icon: <FaBalanceScale className="text-gray-600" />,
          description: 'Regulatory compliance and data governance'
        },
        {
          title: 'Resource Optimization',
          current: '91.5',
          unit: '% efficiency',
          trend: 'positive',
          change: '+6.3%',
          icon: <FaRecycle className="text-green-600" />,
          description: 'Optimized resource management and allocation'
        },
        {
          title: 'Innovation Index',
          current: '4.7',
          unit: '/5.0',
          trend: 'positive',
          change: '+0.4%',
          icon: <FaCertificate className="text-blue-600" />,
          description: 'Technology innovation and leadership metrics'
        },
        {
          title: 'Transparency Rating',
          current: '89',
          unit: '%',
          trend: 'positive',
          change: '+3.2%',
          icon: <FaChartArea className="text-cyan-600" />,
          description: 'Data transparency and reporting standards'
        }
      ],
      frameworks: [
        'UN Global Compact',
        'GRI Standards',
        'SASB Maritime Framework',
        'IMO Environmental Guidelines'
      ]
    }
  };

  const esgTabs = [
    { id: 'environmental', label: 'Environmental', icon: <FaLeaf />, color: 'green' },
    { id: 'social', label: 'Social', icon: <FaUsers />, color: 'blue' },
    { id: 'governance', label: 'Governance', icon: <FaBalanceScale />, color: 'purple' }
  ];

  const currentData = esgData[activeESGTab];

  if (isLoading) {
    return (
      <div className="w-full space-y-6">
        <div className="text-center">
          <Loading 
            size="large" 
            text="Loading ESG Analytics..." 
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
          <FaGlobe className="text-green-400" />
          ESG Impact Dashboard
        </h2>
        <p className="text-cyan-100 text-sm">
          Environmental, Social & Governance metrics for sustainable operations
        </p>
      </div>

      {/* Period Selection */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
        <div className="flex flex-wrap gap-2">
          {['current_year', 'last_quarter', 'ytd', 'all_time'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedPeriod === period 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {period.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* ESG Overview Alert */}
      <Alert
        type="success"
        title="ESG Performance Excellence"
        message="BarnaClean technology enables efficient operations while supporting ocean restoration and community well-being initiatives."
      />

      {/* ESG Tab Navigation */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20">
        <div className="flex gap-2">
          {esgTabs.map((tab) => {
            const isActive = activeESGTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveESGTab(tab.id)}
                className={`flex-1 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? `bg-${tab.color}-600 text-white shadow-lg`
                    : 'text-white hover:text-blue-100 hover:bg-white/20'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline font-semibold">{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ESG Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentData.metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={`${metric.current} ${metric.unit}`}
            icon={metric.icon}
            trend={metric.trend}
            change={metric.change}
            description={metric.description}
            className="bg-white/10 border-white/20 text-white"
          />
        ))}
      </div>

      {/* Environmental Targets Progress */}
      {activeESGTab === 'environmental' && (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FaLeaf className="text-green-400" />
            Environmental Targets 2024
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white">CO₂ Reduction Target</span>
                <span className="text-cyan-100">21.3% / 30%</span>
              </div>
              <ProgressBar 
                progress={(currentData.targets.co2Reduction.achieved / currentData.targets.co2Reduction.target) * 100}
                color="bg-green-500"
                className="bg-white/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white">Fuel Savings Target</span>
                <span className="text-cyan-100">18.5% / 25%</span>
              </div>
              <ProgressBar 
                progress={(currentData.targets.fuelSaving.achieved / currentData.targets.fuelSaving.target) * 100}
                color="bg-blue-500"
                className="bg-white/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white">Chemical Reduction Target</span>
                <span className="text-cyan-100">85% / 90%</span>
              </div>
              <ProgressBar 
                progress={(currentData.targets.chemicalReduction.achieved / currentData.targets.chemicalReduction.target) * 100}
                color="bg-cyan-500"
                className="bg-white/20"
              />
            </div>
          </div>
        </div>
      )}

      {/* Social Initiatives */}
      {activeESGTab === 'social' && (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FaUsers className="text-blue-400" />
            Social Impact Initiatives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentData.initiatives.map((initiative, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                <span className="text-cyan-100 text-sm">{initiative}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Governance Frameworks */}
      {activeESGTab === 'governance' && (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FaBalanceScale className="text-purple-400" />
            Compliance Frameworks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentData.frameworks.map((framework, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                <FaCertificate className="text-purple-400 flex-shrink-0" />
                <span className="text-cyan-100 text-sm font-medium">{framework}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ESG Summary */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">ESG Impact Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">500K+</div>
            <div className="text-cyan-100 text-sm">Tons CO₂ Saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">94.7%</div>
            <div className="text-cyan-100 text-sm">Safety Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">98.2%</div>
            <div className="text-cyan-100 text-sm">Compliance Rating</div>
          </div>
        </div>
        <p className="text-cyan-100 text-sm mt-4 text-center">
          "Technology enables us to work more efficiently and speed up the recovery process, 
          ensuring the oceans remain healthy for life in the future."
        </p>
      </div>
    </div>
  );
};

export default ESGDashboard;