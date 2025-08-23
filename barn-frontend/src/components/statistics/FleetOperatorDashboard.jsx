import React, { useState, useEffect } from 'react';
import { FaShip, FaIndustry, FaExclamationTriangle, FaClock, FaChartLine, FaDownload, FaFilter, FaSort, FaEye, FaTachometerAlt, FaAnchor, FaRoute, FaWrench } from 'react-icons/fa';
import { DESIGN_TOKENS } from '../../constants/designTokens';
import { processFleetData, getFoulingStyles } from '../../utils/dataProcessing';
import { REAL_BIOFOULING_DATA } from '../../utils/csvDataLoader'; // Added import for real data
import { MetricCard, StatusBadge, DataTable, Alert, SimpleLineChart } from '../shared/Charts';

/**
 * Enhanced Fleet Operator Dashboard Component
 * Implements Jakob Nielsen's 10 Usability Heuristics:
 * 1. Visibility of system status - Real-time fleet overview
 * 2. Match between system and real world - Maritime fleet management terminology
 * 3. User control and freedom - Filtering, sorting, and export options
 * 4. Consistency and standards - Consistent data presentation
 * 5. Error prevention - Clear status indicators and alerts
 * 6. Recognition rather than recall - Visual indicators and intuitive layout
 * 7. Flexibility and efficiency - Quick actions and batch operations
 * 8. Aesthetic and minimalist design - Clean, organized dashboard
 * 9. Help users recognize and recover from errors - Alert system
 * 10. Help and documentation - Contextual tooltips and legends
 */

const FleetOperatorDashboard = () => {
  const [fleetData, setFleetData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  // Removed unused sortConfig state
  const [selectedVessels, setSelectedVessels] = useState([]);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Load and process fleet data
  useEffect(() => {
    const loadFleetData = () => {
      // Updated to use real data
      const processed = processFleetData(REAL_BIOFOULING_DATA);
      setFleetData(processed);
    };
    
    loadFleetData();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      setRefreshing(true);
      setTimeout(() => {
        loadFleetData();
        setRefreshing(false);
      }, 1500);
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Filter vessels based on selected criteria
  const filteredVessels = fleetData?.vessels.filter(vessel => {
    switch (selectedFilter) {
      case 'active':
        return vessel.status === 'En Route';
      case 'maintenance':
        return vessel.foulingClass === 'high' || vessel.status === 'Maintenance';
      case 'idle':
        return vessel.status === 'Idle';
      case 'clean':
        return vessel.foulingClass === 'clean';
      default:
        return true;
    }
  }) || [];
  
  // Handle vessel selection for batch operations
  const handleVesselSelection = (vesselId) => {
    setSelectedVessels(prev => 
      prev.includes(vesselId)
        ? prev.filter(id => id !== vesselId)
        : [...prev, vesselId]
    );
  };
  
  const handleSelectAll = () => {
    setSelectedVessels(
      selectedVessels.length === filteredVessels.length
        ? []
        : filteredVessels.map(v => v.id)
    );
  };
  
  // Generate alerts for fleet management
  const generateFleetAlerts = () => {
    if (!fleetData) return [];
    
    const alerts = [];
    
    const criticalVessels = fleetData.vessels.filter(v => v.foulingClass === 'high').length;
    if (criticalVessels > 0) {
      alerts.push({
        type: 'error',
        title: `${criticalVessels} Vessel${criticalVessels > 1 ? 's' : ''} Need Immediate Attention`,
        message: 'Hull cleaning required to prevent further fuel penalties and operational delays.'
      });
    }
    
    const avgFuelPenalty = parseFloat(fleetData.summary.avgFuelPenalty.slice(1, -2));
    if (avgFuelPenalty > 2.0) {
      alerts.push({
        type: 'warning',
        title: 'Fleet Fuel Efficiency Alert',
        message: `Average fuel penalty (${fleetData.summary.avgFuelPenalty}) is above recommended threshold.`
      });
    }
    
    return alerts;
  };
  
  // Export functionality placeholder
  const handleExport = () => {
    // In a real app, this would trigger file download
    setShowExportOptions(false);
  };
  
  if (!fleetData) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <FaIndustry className="text-4xl text-blue-500 animate-pulse mx-auto" />
          <p className="text-gray-500">Loading fleet data...</p>
        </div>
      </div>
    );
  }
  
  const tableColumns = [
    {
      key: 'select',
      label: (
        <input
          type="checkbox"
          checked={selectedVessels.length === filteredVessels.length && filteredVessels.length > 0}
          onChange={handleSelectAll}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      ),
      render: (_, vessel) => (
        <input
          type="checkbox"
          checked={selectedVessels.includes(vessel.id)}
          onChange={() => handleVesselSelection(vessel.id)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      )
    },
    {
      key: 'name',
      label: 'Vessel Name',
      render: (value) => (
        <div className="flex items-center gap-2">
          <FaShip className="text-blue-500" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const statusMap = {
          'En Route': 'clean',
          'Maintenance': 'high',
          'Docked': 'medium',
          'Idle': 'low'
        };
        return <StatusBadge status={statusMap[value] || 'low'} size="small" />;
      }
    },
    {
      key: 'foulingPercent',
      label: 'Fouling Level',
      render: (value, vessel) => (
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getFoulingStyles(vessel.foulingClass).bgColor.replace('bg-', 'bg-')}`}></div>
          <span className="font-semibold">{value.toFixed(1)}%</span>
        </div>
      )
    },
    {
      key: 'fuelPenalty',
      label: 'Fuel Penalty',
      render: (value) => (
        <span className="font-semibold text-red-600">{value}</span>
      )
    },
    {
      key: 'destination',
      label: 'Destination',
      render: (value) => (
        <span className="text-gray-700">{value}</span>
      )
    },
    {
      key: 'daysSinceClean',
      label: 'Days Since Clean',
      render: (value) => (
        <div className="flex items-center gap-1">
          <FaClock className="text-gray-400 text-sm" />
          <span className={value > 60 ? 'text-red-600 font-semibold' : 'text-gray-700'}>
            {value}
          </span>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, vessel) => (
        <div className="flex items-center gap-2">
          <button
            className="text-blue-600 hover:text-blue-800 text-sm"
            title="View Details"
          >
            <FaEye />
          </button>
          {vessel.foulingClass === 'high' && (
            <button
              className="text-orange-600 hover:text-orange-800 text-sm"
              title="Schedule Maintenance"
            >
              <FaWrench />
            </button>
          )}
        </div>
      )
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center justify-center gap-2">
          <FaIndustry className="text-cyan-400" />
          Fleet Operator Dashboard
          {refreshing && <span className="text-sm font-normal text-cyan-200">(Updating...)</span>}
        </h2>
      </div>
      
      {/* Fleet Alerts */}
      {generateFleetAlerts().map((alert, index) => (
        <Alert
          key={index}
          type={alert.type}
          title={alert.title}
          message={alert.message}
        />
      ))}
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <MetricCard
          title="Total Vessels"
          value={fleetData.summary.totalVessels}
          color="blue"
          icon={<FaShip />}
        />
        <MetricCard
          title="Active Vessels"
          value={fleetData.summary.activeVessels}
          color="green"
          icon={<FaRoute />}
          trend={2.3}
        />
        <MetricCard
          title="Idle Vessels"
          value={fleetData.summary.idleVessels}
          color="orange"
          icon={<FaAnchor />}
        />
        <MetricCard
          title="Avg Fuel Penalty"
          value={fleetData.summary.avgFuelPenalty}
          color="purple"
          icon={<FaTachometerAlt />}
          trend={-1.2}
        />
        <MetricCard
          title="Maintenance Flags"
          value={fleetData.summary.maintenanceFlags}
          color="red"
          icon={<FaExclamationTriangle />}
        />
      </div>
      
      {/* Fleet Performance Chart */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FaChartLine className="text-blue-600" />
            Fleet Performance Trends
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Fouling Level</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Fuel Impact</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SimpleLineChart
            data={fleetData.vessels.map((v, i) => ({ x: i, fouling: v.foulingPercent }))}
            xKey="x"
            yKey="fouling"
            width={400}
            height={200}
            color="#3B82F6"
            label="Fouling Levels"
          />
          <SimpleLineChart
            data={fleetData.vessels.map((v, i) => ({ x: i, fuel: parseFloat(v.fuelPenalty.slice(1, -2)) }))}
            xKey="x"
            yKey="fuel"
            width={400}
            height={200}
            color="#EF4444"
            label="Fuel Penalties"
          />
        </div>
      </div>
      
      {/* Controls and Filters */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="all">All ({fleetData.vessels.length})</option>
                <option value="active">Active ({fleetData.vessels.filter(v => v.status === 'En Route').length})</option>
                <option value="maintenance">Maintenance ({fleetData.vessels.filter(v => v.foulingClass === 'high').length})</option>
                <option value="idle">Idle ({fleetData.vessels.filter(v => v.status === 'Idle').length})</option>
                <option value="clean">Clean ({fleetData.vessels.filter(v => v.foulingClass === 'clean').length})</option>
              </select>
            </div>
            
            {selectedVessels.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedVessels.length} vessel{selectedVessels.length > 1 ? 's' : ''} selected
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Bulk Actions
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowExportOptions(!showExportOptions)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                <FaDownload />
                Export
              </button>
              {showExportOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  <button
                    onClick={() => handleExport()}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    CSV
                  </button>
                  <button
                    onClick={() => handleExport()}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Excel
                  </button>
                  <button
                    onClick={() => handleExport()}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    PDF Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Vessel Table */}
      <DataTable
        columns={tableColumns}
        data={filteredVessels}
        sortable={true}
        className="shadow-sm"
      />
      
      {filteredVessels.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <FaShip className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No vessels match the current filter criteria.</p>
          <button
            onClick={() => setSelectedFilter('all')}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Show All Vessels
          </button>
        </div>
      )}
    </div>
  );
};

export default FleetOperatorDashboard;