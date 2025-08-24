import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaShip, FaIndustry, FaExclamationTriangle, FaClock, FaChartLine, FaDownload, FaFilter, FaSort, FaEye, FaTachometerAlt, FaAnchor, FaRoute, FaWrench } from 'react-icons/fa';
import { DESIGN_TOKENS } from '../../constants/designTokens';
import { getFoulingStyles } from '../../utils/dataProcessing';
import { MetricCard, StatusBadge, DataTable, Alert, SimpleLineChart } from '../shared/Charts';
import Loading from '../shared/Loading';
import {
  selectFleetVessels,
  selectFleetSummary,
  selectFleetLoading,
  selectFleetError,
  selectSelectedVessels,
  fetchFleetData,
  selectVessel,
  selectAllVessels,
  clearSelection
} from '../../redux/selectors';

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
  const dispatch = useDispatch();
  
  // Redux selectors
  const fleetVessels = useSelector(selectFleetVessels);
  const fleetSummary = useSelector(selectFleetSummary);
  const isLoading = useSelector(selectFleetLoading);
  const error = useSelector(selectFleetError);
  const selectedVessels = useSelector(selectSelectedVessels);
  
  // Local UI state
  const [selectedFilter, setSelectedFilter] = React.useState('all');
  const [showExportOptions, setShowExportOptions] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  
  // Load fleet data on component mount
  useEffect(() => {
    dispatch(fetchFleetData());
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      setRefreshing(true);
      dispatch(fetchFleetData()).finally(() => {
        setRefreshing(false);
      });
    }, 60000);
    
    return () => clearInterval(interval);
  }, [dispatch]);
  
  // Process fleet data from Redux or use fallback
  const fleetData = React.useMemo(() => {
    if (fleetVessels && fleetVessels.length > 0) {
      // Transform Redux data structure to match expected format
      const transformedVessels = fleetVessels.map(vessel => ({
        id: vessel.id,
        name: vessel.name,
        status: vessel.status === 'Active' ? 'En Route' : vessel.status === 'In Port' ? 'Docked' : vessel.status,
        foulingPercent: parseFloat(vessel.performance?.biofoulingLevel || 0),
        foulingClass: vessel.performance?.biofoulingLevel > 70 ? 'high' : 
                     vessel.performance?.biofoulingLevel > 30 ? 'medium' : 
                     vessel.performance?.biofoulingLevel > 10 ? 'low' : 'clean',
        fuelPenalty: `+${vessel.performance?.speedReduction || '0.0'}%`,
        destination: vessel.route?.current || 'Unknown',
        daysSinceClean: Math.floor(Math.random() * 90), // Mock value - replace with real data
        location: { lat: 0, lon: 0 } // Mock location
      }));
      
      return {
        vessels: transformedVessels,
        summary: fleetSummary || {
          totalVessels: transformedVessels.length,
          activeVessels: transformedVessels.filter(v => v.status === 'En Route').length,
          idleVessels: transformedVessels.filter(v => v.status === 'Idle').length,
          maintenanceFlags: transformedVessels.filter(v => v.foulingClass === 'high' || v.status === 'Maintenance').length,
          avgFuelPenalty: `+${fleetSummary?.avgFuelEfficiency || '2.3'}%`
        }
      };
    }
    return null;
  }, [fleetVessels, fleetSummary]);
  
  // Filter vessels based on selected criteria
  const filteredVessels = React.useMemo(() => {
    if (!fleetData?.vessels) return [];
    
    return fleetData.vessels.filter(vessel => {
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
    });
  }, [fleetData, selectedFilter]);
  
  // Handle vessel selection for batch operations using Redux
  const handleVesselSelection = (vesselId) => {
    if (selectedVessels.includes(vesselId)) {
      // Remove vessel from selection (would need removeSelectedVessel action)
      dispatch(selectVessel(vesselId)); // For now, using selectVessel
    } else {
      dispatch(selectVessel(vesselId));
    }
  };
  
  const handleSelectAll = () => {
    if (selectedVessels.length === filteredVessels.length) {
      dispatch(clearSelection());
    } else {
      dispatch(selectAllVessels());
    }
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
    
    const avgFuelPenaltyStr = fleetData?.summary?.avgFuelPenalty;
    if (avgFuelPenaltyStr && typeof avgFuelPenaltyStr === 'string' && avgFuelPenaltyStr.length > 2) {
      const avgFuelPenalty = parseFloat(avgFuelPenaltyStr.slice(1, -2));
      if (avgFuelPenalty > 2.0) {
        alerts.push({
          type: 'warning',
          title: 'Fleet Fuel Efficiency Alert',
          message: `Average fuel penalty (${avgFuelPenaltyStr}) is above recommended threshold.`
        });
      }
    }
    
    return alerts;
  };
  
  // Export functionality placeholder
  const handleExport = () => {
    // In a real app, this would trigger file download
    setShowExportOptions(false);
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="w-full space-y-6">
        <div className="text-center">
          <Loading 
            size="large" 
            text="Loading Fleet data..." 
            variant="maritime"
            color="white"
          />
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <FaExclamationTriangle className="text-4xl text-red-500 mx-auto" />
          <p className="text-red-600">Error loading fleet data: {error}</p>
          <button 
            onClick={() => dispatch(fetchFleetData())}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
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
          <span className="font-semibold">{(value || 0).toFixed(1)}%</span>
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
          value={fleetData?.summary?.totalVessels || 0}
          color="blue"
          icon={<FaShip />}
        />
        <MetricCard
          title="Active Vessels"
          value={fleetData?.summary?.activeVessels || 0}
          color="green"
          icon={<FaRoute />}
          trend={2.3}
        />
        <MetricCard
          title="Idle Vessels"
          value={fleetData?.summary?.idleVessels || 0}
          color="orange"
          icon={<FaAnchor />}
        />
        <MetricCard
          title="Avg Fuel Penalty"
          value={fleetData?.summary?.avgFuelPenalty || '+0.0%'}
          color="purple"
          icon={<FaTachometerAlt />}
          trend={-1.2}
        />
        <MetricCard
          title="Maintenance Flags"
          value={fleetData?.summary?.maintenanceFlags || 0}
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
            data={(fleetData?.vessels || []).map((v, i) => ({ x: i, fouling: v.foulingPercent || 0 }))}
            xKey="x"
            yKey="fouling"
            width={400}
            height={200}
            color="#3B82F6"
            label="Fouling Levels"
          />
          <SimpleLineChart
            data={(fleetData?.vessels || []).map((v, i) => {
              const fuelPenaltyStr = v.fuelPenalty || '+0.0%';
              const fuelValue = fuelPenaltyStr.length > 2 ? parseFloat(fuelPenaltyStr.slice(1, -1)) : 0;
              return { x: i, fuel: fuelValue || 0 };
            })}
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
                <option value="all">All ({fleetData?.vessels?.length || 0})</option>
                <option value="active">Active ({fleetData?.vessels?.filter(v => v.status === 'En Route').length || 0})</option>
                <option value="maintenance">Maintenance ({fleetData?.vessels?.filter(v => v.foulingClass === 'high').length || 0})</option>
                <option value="idle">Idle ({fleetData?.vessels?.filter(v => v.status === 'Idle').length || 0})</option>
                <option value="clean">Clean ({fleetData?.vessels?.filter(v => v.foulingClass === 'clean').length || 0})</option>
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