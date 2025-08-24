import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { maritimeNotifications, showMaritimeNotification, MARITIME_NOTIFICATION_TYPES } from '../utils/notificationUtils';
import { addAlert } from '../redux/Slices/alertsSlice';

/**
 * Custom hook for maritime notifications
 * Integrates notistack with Redux alert system
 */
export const useMaritimeNotifications = () => {
  const dispatch = useDispatch();
  const alertSettings = useSelector(state => state.alerts.settings);
  const notificationsEnabled = alertSettings.enableNotifications;

  const notify = useCallback((message, options = {}) => {
    if (!notificationsEnabled && options.force !== true) {
      return null;
    }

    // Add to Redux store if specified
    if (options.addToRedux) {
      dispatch(addAlert({
        type: options.variant || 'info',
        category: options.category || 'system',
        title: options.title || 'Notification',
        message,
        severity: options.severity || 'medium',
        source: 'toast-notification'
      }));
    }

    return showMaritimeNotification(message, options);
  }, [notificationsEnabled, dispatch]);

  // Vessel notifications
  const vessel = useCallback({
    statusUpdated: (vesselName, status) => 
      notify(`${vesselName} status updated to ${status}`, {
        type: MARITIME_NOTIFICATION_TYPES.VESSEL_UPDATE
      }),
    
    maintenanceScheduled: (vesselName, date) =>
      notify(`Maintenance scheduled for ${vesselName} on ${date}`, {
        type: MARITIME_NOTIFICATION_TYPES.MAINTENANCE,
        addToRedux: true,
        category: 'maintenance'
      })
  }, [notify]);

  // Biofouling notifications
  const biofouling = useCallback({
    detected: (vesselName, level) => {
      const isHigh = level > 75;
      return notify(`${isHigh ? 'High' : 'Moderate'} biofouling detected on ${vesselName} (${level}%)`, {
        type: MARITIME_NOTIFICATION_TYPES.BIOFOULING,
        variant: isHigh ? 'warning' : 'info',
        addToRedux: isHigh,
        category: 'biofouling'
      });
    }
  }, [notify]);

  // Fleet notifications
  const fleet = useCallback({
    dataSynced: (count) =>
      notify(`Fleet data synchronized. ${count} vessels updated`, {
        type: MARITIME_NOTIFICATION_TYPES.DATA_SYNC
      }),
    
    reportGenerated: (reportType) =>
      notify(`${reportType} report generated successfully`, {
        type: MARITIME_NOTIFICATION_TYPES.USER_ACTION
      })
  }, [notify]);

  // System notifications
  const system = useCallback({
    connectionStatus: (isConnected, service = 'marine data services') => {
      const message = isConnected 
        ? `Connection to ${service} restored`
        : `Connection to ${service} lost`;
      
      return notify(message, {
        type: MARITIME_NOTIFICATION_TYPES.SYSTEM,
        variant: isConnected ? 'success' : 'error',
        persist: !isConnected,
        addToRedux: !isConnected
      });
    },
    
    error: (message) =>
      notify(message, {
        type: MARITIME_NOTIFICATION_TYPES.SYSTEM,
        variant: 'error',
        persist: true,
        addToRedux: true
      }),
    
    dataProcessing: (operation, status = 'processing') => {
      const message = status === 'processing' 
        ? `Processing ${operation}...`
        : `${operation} ${status}`;
      
      return notify(message, {
        type: MARITIME_NOTIFICATION_TYPES.SYSTEM,
        variant: 'info'
      });
    }
  }, [notify]);

  // User action notifications
  const user = useCallback({
    actionCompleted: (action) =>
      notify(action, {
        type: MARITIME_NOTIFICATION_TYPES.USER_ACTION,
        variant: 'success'
      }),
    
    actionFailed: (action, error) =>
      notify(`${action} failed: ${error}`, {
        type: MARITIME_NOTIFICATION_TYPES.SYSTEM,
        variant: 'error',
        addToRedux: true
      })
  }, [notify]);

  return {
    notify,
    vessel,
    biofouling,
    fleet,
    system,
    user,
    notificationsEnabled,
    ...maritimeNotifications
  };
};

export default useMaritimeNotifications;