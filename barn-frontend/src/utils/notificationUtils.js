import { enqueueSnackbar, closeSnackbar } from 'notistack';

/**
 * Maritime-specific notification utility functions
 * Provides consistent notification patterns for marine operations
 */

// Notification types for maritime operations
export const MARITIME_NOTIFICATION_TYPES = {
  VESSEL_UPDATE: 'vessel_update',
  MAINTENANCE: 'maintenance',
  BIOFOULING: 'biofouling',
  ROUTE_OPTIMIZATION: 'route_optimization',
  WEATHER_ALERT: 'weather_alert',
  FLEET_OPERATION: 'fleet_operation',
  ESG_UPDATE: 'esg_update',
  DATA_SYNC: 'data_sync',
  USER_ACTION: 'user_action',
  SYSTEM: 'system'
};

// Maritime notification templates
const MARITIME_TEMPLATES = {
  [MARITIME_NOTIFICATION_TYPES.VESSEL_UPDATE]: {
    icon: '🚢',
    variant: 'info',
    autoHideDuration: 4000
  },
  [MARITIME_NOTIFICATION_TYPES.MAINTENANCE]: {
    icon: '🔧',
    variant: 'warning',
    autoHideDuration: 6000
  },
  [MARITIME_NOTIFICATION_TYPES.BIOFOULING]: {
    icon: '🦠',
    variant: 'warning',
    autoHideDuration: 5000
  },
  [MARITIME_NOTIFICATION_TYPES.ROUTE_OPTIMIZATION]: {
    icon: '🗺️',
    variant: 'success',
    autoHideDuration: 4000
  },
  [MARITIME_NOTIFICATION_TYPES.WEATHER_ALERT]: {
    icon: '🌊',
    variant: 'error',
    autoHideDuration: 8000,
    persist: true
  },
  [MARITIME_NOTIFICATION_TYPES.FLEET_OPERATION]: {
    icon: '⚓',
    variant: 'info',
    autoHideDuration: 4000
  },
  [MARITIME_NOTIFICATION_TYPES.ESG_UPDATE]: {
    icon: '🌱',
    variant: 'success',
    autoHideDuration: 4000
  },
  [MARITIME_NOTIFICATION_TYPES.DATA_SYNC]: {
    icon: '🔄',
    variant: 'info',
    autoHideDuration: 3000
  },
  [MARITIME_NOTIFICATION_TYPES.USER_ACTION]: {
    icon: '✅',
    variant: 'success',
    autoHideDuration: 3000
  },
  [MARITIME_NOTIFICATION_TYPES.SYSTEM]: {
    icon: '⚙️',
    variant: 'info',
    autoHideDuration: 4000
  }
};

/**
 * Enhanced notification function with maritime-specific options
 * @param {string} message - The notification message
 * @param {Object} options - Notification options
 * @returns {string} - Notification key for management
 */
export const showMaritimeNotification = (message, options = {}) => {
  const {
    type = MARITIME_NOTIFICATION_TYPES.SYSTEM,
    variant,
    autoHideDuration,
    persist = false,
    action,
    vesselId,
    priority = 'normal',
    ...otherOptions
  } = options;

  const template = MARITIME_TEMPLATES[type] || MARITIME_TEMPLATES[MARITIME_NOTIFICATION_TYPES.SYSTEM];
  
  // Build enhanced message with vessel context if provided
  const enhancedMessage = vesselId 
    ? `${template.icon} ${message} (Vessel: ${vesselId})`
    : `${template.icon} ${message}`;

  const notificationOptions = {
    variant: variant || template.variant,
    autoHideDuration: persist ? null : (autoHideDuration || template.autoHideDuration),
    persist: persist || template.persist || false,
    preventDuplicate: true,
    anchorOrigin: priority === 'high' 
      ? { vertical: 'top', horizontal: 'center' }
      : { vertical: 'top', horizontal: 'right' },
    action,
    ...otherOptions
  };

  return enqueueSnackbar(enhancedMessage, notificationOptions);
};

/**
 * Predefined maritime notification functions
 */
export const maritimeNotifications = {
  // Vessel operations
  vesselStatusUpdated: (vesselName, status) => 
    showMaritimeNotification(`${vesselName} status updated to ${status}`, {
      type: MARITIME_NOTIFICATION_TYPES.VESSEL_UPDATE
    }),

  vesselMaintenanceScheduled: (vesselName, date) =>
    showMaritimeNotification(`Maintenance scheduled for ${vesselName} on ${date}`, {
      type: MARITIME_NOTIFICATION_TYPES.MAINTENANCE
    }),

  // Biofouling alerts
  biofoulingDetected: (vesselName, level) =>
    showMaritimeNotification(`High biofouling detected on ${vesselName} (${level}%)`, {
      type: MARITIME_NOTIFICATION_TYPES.BIOFOULING,
      priority: level > 80 ? 'high' : 'normal'
    }),

  // Route optimization
  routeOptimized: (vesselName, savings) =>
    showMaritimeNotification(`Route optimized for ${vesselName}. Estimated fuel savings: ${savings}%`, {
      type: MARITIME_NOTIFICATION_TYPES.ROUTE_OPTIMIZATION
    }),

  // Weather and environmental
  weatherAlert: (message, severity = 'medium') =>
    showMaritimeNotification(message, {
      type: MARITIME_NOTIFICATION_TYPES.WEATHER_ALERT,
      priority: severity === 'high' ? 'high' : 'normal',
      persist: severity === 'high'
    }),

  // Fleet operations
  fleetDataSynced: (count) =>
    showMaritimeNotification(`Fleet data synchronized. ${count} vessels updated`, {
      type: MARITIME_NOTIFICATION_TYPES.DATA_SYNC
    }),

  // ESG updates
  esgTargetAchieved: (metric, value) =>
    showMaritimeNotification(`ESG target achieved: ${metric} - ${value}`, {
      type: MARITIME_NOTIFICATION_TYPES.ESG_UPDATE
    }),

  // User actions
  reportGenerated: (reportType) =>
    showMaritimeNotification(`${reportType} report generated successfully`, {
      type: MARITIME_NOTIFICATION_TYPES.USER_ACTION
    }),

  dataExported: (format) =>
    showMaritimeNotification(`Data exported to ${format} format`, {
      type: MARITIME_NOTIFICATION_TYPES.USER_ACTION
    }),

  // System notifications
  connectionRestored: () =>
    showMaritimeNotification('Connection to marine data services restored', {
      type: MARITIME_NOTIFICATION_TYPES.SYSTEM,
      variant: 'success'
    }),

  connectionLost: () =>
    showMaritimeNotification('Connection to marine data services lost', {
      type: MARITIME_NOTIFICATION_TYPES.SYSTEM,
      variant: 'error',
      persist: true
    })
};

/**
 * Notification management utilities
 */
export const notificationManager = {
  dismiss: (key) => closeSnackbar(key),
  dismissAll: () => closeSnackbar(),
  
  // Critical alert with custom action
  showCriticalAlert: (message, onAcknowledge) => {
    return showMaritimeNotification(message, {
      variant: 'error',
      persist: true,
      priority: 'high',
      action: (key) => {
        // Create button element without JSX
        const button = document.createElement('button');
        button.textContent = 'Acknowledge';
        button.style.cssText = `
          color: white;
          background-color: rgba(255,255,255,0.2);
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        `;
        button.onclick = () => {
          onAcknowledge && onAcknowledge();
          closeSnackbar(key);
        };
        return button;
      }
    });
  }
};

export default maritimeNotifications;