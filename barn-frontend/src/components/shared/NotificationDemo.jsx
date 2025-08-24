import React from 'react';
import { useMaritimeNotifications } from '../../hooks/useMaritimeNotifications';
import { FaBell, FaShip, FaWrench, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

/**
 * Demo component to showcase maritime notifications
 * This can be added to any page for testing notifications
 */
const NotificationDemo = () => {
  const notifications = useMaritimeNotifications();

  const demoNotifications = [
    {
      label: 'Vessel Status Update',
      icon: <FaShip className="text-blue-400" />,
      action: () => notifications.vessel.statusUpdated('MV Pacific Star', 'In Transit'),
    },
    {
      label: 'Maintenance Scheduled',
      icon: <FaWrench className="text-orange-400" />,
      action: () => notifications.vessel.maintenanceScheduled('MV Atlantic Dawn', '2024-03-15'),
    },
    {
      label: 'Biofouling Alert',
      icon: <FaExclamationTriangle className="text-red-400" />,
      action: () => notifications.biofouling.detected('MV Indian Ocean', 85),
    },
    {
      label: 'Fleet Data Synced',
      icon: <FaCheckCircle className="text-green-400" />,
      action: () => notifications.fleet.dataSynced(12),
    },
    {
      label: 'Connection Status',
      icon: <FaBell className="text-cyan-400" />,
      action: () => notifications.system.connectionStatus(true, 'AIS tracking system'),
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <FaBell className="text-cyan-400" />
        Maritime Notifications Demo
      </h3>
      <p className="text-cyan-100 text-sm mb-4">
        Click any button below to test the maritime notification system:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {demoNotifications.map((demo, index) => (
          <button
            key={index}
            onClick={demo.action}
            className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-200 text-left"
          >
            <div className="text-xl">{demo.icon}</div>
            <span className="text-white text-sm font-medium">{demo.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
        <p className="text-blue-200 text-xs">
          💡 These notifications will appear in the top-right corner and integrate with your Redux alert system
        </p>
      </div>
    </div>
  );
};

export default NotificationDemo;