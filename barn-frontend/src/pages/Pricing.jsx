import React, { useState, useEffect, useCallback } from 'react';
import { FaDollarSign, FaShip, FaIndustry, FaCheck, FaStar, FaUsers, FaCrown, FaRocket, FaPhone, FaEnvelope, FaCalculator } from 'react-icons/fa';
import { DESIGN_TOKENS } from '../constants/designTokens';
import Loading from '../components/shared/Loading';
import { StatusBadge, Alert, MetricCard } from '../components/shared/Charts';
import { Fish, Whale, Octopus, Seahorse } from '../components/shared/MarineElement';

/**
 * Pricing Page Component
 * Implements Revenue Streams from BarnaClean Document:
 * 1. Software as a Service (SaaS) - Monthly/Annual subscriptions
 * 2. Fleet-Level Licensing - Based on number of vessels
 * 
 * Features:
 * - Subscription tiers for different company sizes
 * - Fleet licensing calculator
 * - ROI and savings projections
 * - Contact information for enterprise sales
 */

const Pricing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [billingPeriod, setBillingPeriod] = useState('annual');
  const [fleetSize, setFleetSize] = useState(5);
  const [calculatedSavings, setCalculatedSavings] = useState(null);

  useEffect(() => {
    // Simulate loading pricing data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Pricing plans based on BarnaClean revenue model
  const pricingPlans = {
    starter: {
      name: 'Starter',
      icon: <FaShip className="text-2xl text-blue-500" />,
      description: 'Perfect for small shipping companies',
      monthlyPrice: 299,
      annualPrice: 2990,
      vesselsIncluded: 3,
      features: [
        'Biofouling Prediction Model',
        'Basic Route Optimization',
        'Fuel Savings Dashboard',
        'Email Support',
        'Monthly Reports',
        'API Access (Limited)'
      ],
      popular: false,
      savingsEstimate: '15-20% fuel reduction'
    },
    professional: {
      name: 'Professional',
      icon: <FaIndustry className="text-2xl text-green-500" />,
      description: 'Ideal for medium-sized fleets',
      monthlyPrice: 799,
      annualPrice: 7990,
      vesselsIncluded: 10,
      features: [
        'Advanced AI Prediction Models',
        'Full Route Optimization (A*)',
        'Real-time Weather Integration',
        'ESG Impact Tracking',
        'Priority Support',
        'Weekly Analytics Reports',
        'Full API Access',
        'Custom Integrations'
      ],
      popular: true,
      savingsEstimate: '20-30% fuel reduction'
    },
    enterprise: {
      name: 'Enterprise',
      icon: <FaCrown className="text-2xl text-purple-500" />,
      description: 'For large fleet operations',
      monthlyPrice: 1999,
      annualPrice: 19990,
      vesselsIncluded: 25,
      features: [
        'Complete BarnaClean Suite',
        'Multi-fleet Management',
        'Advanced Predictive Analytics',
        'Custom AI Model Training',
        'Dedicated Account Manager',
        '24/7 Premium Support',
        'Real-time Monitoring',
        'Compliance Reporting',
        'White-label Options'
      ],
      popular: false,
      savingsEstimate: '25-35% fuel reduction'
    }
  };

  // Fleet licensing calculator
  const calculateFleetLicensing = useCallback(() => {
    const basePrice = 150; // Per vessel per month
    const volumeDiscount = fleetSize > 20 ? 0.2 : fleetSize > 10 ? 0.15 : fleetSize > 5 ? 0.1 : 0;
    const monthlyFleetCost = fleetSize * basePrice * (1 - volumeDiscount);
    const annualFleetCost = monthlyFleetCost * 12 * 0.9; // 10% annual discount
    
    // Fuel savings calculation (assuming average vessel burns 50 tons/day, $600/ton)
    const avgFuelCostPerVesselPerYear = 50 * 365 * 600; // $10.95M per vessel per year
    const fuelSavingsPercent = 0.25; // 25% average savings
    const totalFuelSavings = fleetSize * avgFuelCostPerVesselPerYear * fuelSavingsPercent;
    const roi = ((totalFuelSavings - annualFleetCost) / annualFleetCost) * 100;
    
    setCalculatedSavings({
      monthlyFleetCost,
      annualFleetCost,
      totalFuelSavings,
      roi,
      breakEvenMonths: Math.ceil(annualFleetCost / (totalFuelSavings / 12))
    });
  }, [fleetSize]);

  useEffect(() => {
    calculateFleetLicensing();
  }, [calculateFleetLicensing]);

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-blue-900 to-cyan-800 flex items-center justify-center pt-32">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <Loading 
            size="large" 
            text="Loading Pricing Plans..." 
            variant="default"
            color="blue"
          />
          <div className="space-y-3">
            <p className="text-white text-lg font-medium">
              Calculating your savings potential
            </p>
            <div className="flex items-center justify-center space-x-2 text-cyan-100 text-sm">
              <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
              <span>Loading subscription options...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 to-cyan-800 pt-32 pb-32 relative overflow-hidden">
      {/* Marine Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 opacity-15">
          <Fish size={120} color="#60a5fa" speed={8} />
        </div>
        <div className="absolute top-1/3 right-16 opacity-20">
          <Whale size={180} color="#1e40af" swimSpeed={12} />
        </div>
        <div className="absolute bottom-1/4 left-1/4 opacity-15">
          <Octopus size={140} color="#8b5cf6" waveSpeed={7} />
        </div>
        <div className="absolute top-2/3 right-1/4 opacity-25">
          <Seahorse size={100} color="#f59e0b" swaySpeed={6} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaDollarSign className="text-4xl text-green-400" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              BarnaClean Pricing
            </h1>
          </div>
          <p className="text-cyan-100 text-lg lg:text-xl max-w-3xl mx-auto mb-6">
            Choose the perfect plan for your fleet and start saving fuel today
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                billingPeriod === 'monthly' 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:text-blue-100'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                billingPeriod === 'annual' 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:text-blue-100'
              }`}
            >
              Annual (Save 17%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {Object.entries(pricingPlans).map(([planKey, plan]) => {
            const isSelected = selectedPlan === planKey;
            const price = billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const monthlyPrice = billingPeriod === 'annual' ? plan.annualPrice / 12 : plan.monthlyPrice;
            
            return (
              <div
                key={planKey}
                onClick={() => setSelectedPlan(planKey)}
                className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border transition-all duration-300 cursor-pointer hover:scale-105 ${
                  plan.popular 
                    ? 'border-green-400 ring-2 ring-green-400 shadow-2xl' 
                    : isSelected
                      ? 'border-blue-400 ring-2 ring-blue-400'
                      : 'border-white/20 hover:border-white/40'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <FaStar className="text-xs" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  {plan.icon}
                  <h3 className="text-2xl font-bold text-white mt-4 mb-2">{plan.name}</h3>
                  <p className="text-cyan-100 text-sm mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-white">
                      ${price.toLocaleString()}
                    </div>
                    <div className="text-cyan-100 text-sm">
                      {billingPeriod === 'annual' ? '/year' : '/month'} • Up to {plan.vesselsIncluded} vessels
                    </div>
                    {billingPeriod === 'annual' && (
                      <div className="text-green-400 text-sm font-semibold">
                        ${monthlyPrice.toFixed(0)}/month (billed annually)
                      </div>
                    )}
                  </div>

                  <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 mb-6">
                    <div className="text-green-300 text-sm font-semibold">
                      Expected Savings: {plan.savingsEstimate}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FaCheck className="text-green-400 flex-shrink-0" />
                      <span className="text-cyan-100 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                  }`}
                >
                  {isSelected ? 'Selected Plan' : 'Choose Plan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Fleet Licensing Calculator */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <FaCalculator className="text-cyan-400" />
              Fleet Licensing Calculator
            </h2>
            <p className="text-cyan-100">
              Calculate your custom fleet pricing and potential savings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Number of Vessels in Fleet
                </label>
                <input 
                  type="number"
                  min="1"
                  max="100"
                  value={fleetSize}
                  onChange={(e) => setFleetSize(parseInt(e.target.value) || 1)}
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-cyan-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricCard
                  title="Monthly Cost"
                  value={`$${calculatedSavings?.monthlyFleetCost.toLocaleString()}`}
                  icon={<FaDollarSign className="text-green-400" />}
                  className="bg-white/10 border-white/20"
                />
                <MetricCard
                  title="Annual Cost"
                  value={`$${calculatedSavings?.annualFleetCost.toLocaleString()}`}
                  icon={<FaDollarSign className="text-blue-400" />}
                  className="bg-white/10 border-white/20"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Projected Annual Savings</h3>
              
              <MetricCard
                title="Fuel Cost Savings"
                value={`$${calculatedSavings?.totalFuelSavings.toLocaleString()}`}
                icon={<FaRocket className="text-green-500" />}
                trend="positive"
                className="bg-white/10 border-white/20"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  title="ROI"
                  value={`${calculatedSavings?.roi.toFixed(0)}%`}
                  icon={<FaStar className="text-yellow-400" />}
                  trend="positive"
                  className="bg-white/10 border-white/20"
                />
                <MetricCard
                  title="Break-even"
                  value={`${calculatedSavings?.breakEvenMonths} months`}
                  icon={<FaCheck className="text-green-400" />}
                  className="bg-white/10 border-white/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">
            Contact our team to discuss custom enterprise solutions or get help choosing the right plan for your fleet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors">
              <FaPhone />
              Call Sales: 0128699358
            </button>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors">
              <FaEnvelope />
              Contact Enterprise Sales
            </button>
          </div>
          
          <p className="text-cyan-200 text-sm">
            Free trial available • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;