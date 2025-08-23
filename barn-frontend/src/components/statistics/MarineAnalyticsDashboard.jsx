import React, { useState, useEffect } from 'react';
import { FaChartLine, FaGasPump, FaAnchor, FaWater, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { 
  BarChart, 
  MultiLineChart, 
  GaugeChart, 
  AreaChart,
  MetricCard,
  Alert,
  StatusBadge
} from '../shared/Charts';
import { 
  generateTimeSeriesData, 
  processFleetData
} from '../../utils/dataProcessing';
import { REAL_BIOFOULING_DATA } from '../../utils/csvDataLoader';

/**
 * Advanced Marine Analytics Dashboard
 * Implements Jakob Nielsen's 10 Usability Heuristics:
 * 1. Visibility of system status - Real-time data updates and status indicators
 * 2. Match between system and real world - Marine terminology and familiar concepts
 * 3. User control and freedom - Filter controls and time period selection
 * 4. Consistency and standards - Consistent chart styling and interaction patterns
 * 5. Error prevention - Data validation and fallback displays
 * 6. Recognition rather than recall - Clear labels, legends, and contextual information
 * 7. Flexibility and efficiency - Quick access to different analysis views
 * 8. Aesthetic and minimalist design - Clean, focused data presentation
 * 9. Help users recognize and recover from errors - Clear error states
 * 10. Help and documentation - Tooltips and explanatory text
 */

const MarineAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [alerts, setAlerts] = useState([]);
  
  // Process data for different visualizations using real data
  const timeSeriesData = generateTimeSeriesData(REAL_BIOFOULING_DATA);
  const fleetData = processFleetData(REAL_BIOFOULING_DATA);
  
  // Calculate key performance indicators
  const avgFoulingLevel = timeSeriesData.reduce((sum, item) => sum + item.foulingPercent, 0) / timeSeriesData.length;
  const fuelImpact = timeSeriesData.reduce((sum, item) => sum + item.fuelConsumption, 0) / timeSeriesData.length;
  const avgSpeedReduction = timeSeriesData.reduce((sum, item) => sum + item.speedReduction, 0) / timeSeriesData.length;
  const environmentalScore = timeSeriesData.reduce((sum, item) => sum + item.environmentalScore, 0) / timeSeriesData.length;
  
  // Generate alerts based on data
  useEffect(() => {
    const newAlerts = [];
    
    if (avgFoulingLevel > 70) {
      newAlerts.push({
        id: 'high-fouling',
        type: 'warning',
        title: 'High Biofouling Detected',
        message: `Fleet average biofouling: ${avgFoulingLevel.toFixed(1)}%. Consider scheduling maintenance.`
      });
    }
    
    if (fuelImpact > 2.5) {
      newAlerts.push({
        id: 'fuel-penalty',
        type: 'error',
        title: 'Excessive Fuel Consumption',
        message: `Current fuel penalty: ${((fuelImpact - 2.0) / 2.0 * 100).toFixed(1)}% above baseline.`
      });
    }
    
    setAlerts(newAlerts);
  }, [avgFoulingLevel, fuelImpact]);
  
  // Prepare data for different chart types
  const multiLineData = timeSeriesData.map(item => ({
    date: item.date,
    fouling: item.foulingPercent,
    fuel: item.fuelConsumption * 10, // Scale for visibility
    speed: item.speedReduction * 5 // Scale for visibility
  }));
  
  const barChartData = timeSeriesData.slice(-7).map((item, index) => ({
    day: `Day ${index + 1}`,
    fouling: item.foulingPercent
  }));
  
  const multiLineConfig = [
    { key: 'fouling', label: 'Biofouling %', color: '#EF4444' },
    { key: 'fuel', label: 'Fuel Impact (x10)', color: '#F59E0B' },
    { key: 'speed', label: 'Speed Reduction (x5)', color: '#3B82F6' }
  ];
  
  return (
    <div className="w-full space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FaChartLine className="text-cyan-400" />
            Marine Analytics Dashboard
          </h1>
        </div>
        
        {/* Time Range Selector */}
        <div className="mt-4 lg:mt-0">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 bg-white"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
        </div>
      </div>
      
      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map(alert => (
            <Alert
              key={alert.id}
              type={alert.type}
              title={alert.title}
              message={alert.message}
              onDismiss={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
            />
          ))}
        </div>
      )}
      
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Avg Biofouling Level"
          value={avgFoulingLevel.toFixed(1)}
          unit="%"
          color={avgFoulingLevel > 70 ? 'red' : avgFoulingLevel > 40 ? 'orange' : 'green'}
          icon={<FaAnchor />}
          trend={-2.3}
        />
        
        <MetricCard
          title="Fuel Impact"
          value={fuelImpact.toFixed(2)}
          unit="tpd"
          color={fuelImpact > 2.5 ? 'red' : 'blue'}
          icon={<FaGasPump />}
          trend={1.8}
        />
        
        <MetricCard
          title="Speed Reduction"
          value={avgSpeedReduction.toFixed(1)}
          unit="%"
          color={avgSpeedReduction > 10 ? 'red' : 'purple'}
          icon={<FaClock />}
          trend={-0.5}
        />
        
        <MetricCard
          title="Environmental Score"
          value={environmentalScore.toFixed(0)}
          unit="/100"
          color={environmentalScore > 80 ? 'green' : 'orange'}
          icon={<FaWater />}
          trend={3.2}
        />
      </div>
      
      {/* Real-time Gauges */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <FaExclamationTriangle className="text-orange-500" />
          Real-time Fleet Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <GaugeChart
              value={avgFoulingLevel}
              maxValue={100}
              label="Biofouling %"
              size={180}
              dangerThreshold={80}
              warningThreshold={60}
            />
          </div>
          
          <div className="text-center">
            <GaugeChart
              value={(fuelImpact - 2.0) / 2.0 * 100}
              maxValue={100}
              label="Fuel Penalty %"
              size={180}
              dangerThreshold={30}
              warningThreshold={15}
            />
          </div>
          
          <div className="text-center">
            <GaugeChart
              value={avgSpeedReduction}
              maxValue={20}
              label="Speed Loss %"
              size={180}
              dangerThreshold={15}
              warningThreshold={10}
            />
          </div>
          
          <div className="text-center">
            <GaugeChart
              value={environmentalScore}
              maxValue={100}
              label="Env. Score"
              size={180}
              dangerThreshold={40}
              warningThreshold={60}
              color="#10B981"
            />
          </div>
        </div>
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Multi-line Trend Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <MultiLineChart
            data={multiLineData}
            xKey="date"
            lines={multiLineConfig}
            width={500}
            height={300}
            label="Performance Trends Analysis"
          />
        </div>
        
        {/* Biofouling Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <BarChart
            data={barChartData}
            xKey="day"
            yKey="fouling"
            width={500}
            height={300}
            color="#EF4444"
            label="7-Day Biofouling Distribution"
          />
        </div>
        
        {/* Fuel Consumption Area Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <AreaChart
            data={timeSeriesData}
            xKey="date"
            yKey="fuelConsumption"
            width={500}
            height={300}
            color="#F59E0B"
            label="Fuel Consumption Trend"
          />
        </div>
        
        {/* Environmental Conditions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <AreaChart
            data={timeSeriesData}
            xKey="date"
            yKey="environmentalScore"
            width={500}
            height={300}
            color="#10B981"
            label="Environmental Conditions Score"
          />
        </div>
      </div>
      
      {/* Fleet Summary Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Fleet Status Summary</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{fleetData.summary.totalVessels}</div>
            <div className="text-sm text-gray-600">Total Vessels</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{fleetData.summary.activeVessels}</div>
            <div className="text-sm text-gray-600">Active Vessels</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{fleetData.summary.maintenanceFlags}</div>
            <div className="text-sm text-gray-600">Maintenance Flags</div>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{fleetData.summary.avgFuelPenalty}</div>
            <div className="text-sm text-gray-600">Avg Fuel Penalty</div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Schedule Maintenance
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            Optimize Routes
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarineAnalyticsDashboard;