import { enqueueSnackbar } from 'notistack';
import { MARITIME_NOTIFICATION_TYPES } from '../../utils/notificationUtils';

/**
 * Redux middleware to automatically trigger toast notifications
 * for critical alerts and important system events
 */
export const notificationMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Get current state after action
  const state = store.getState();
  const alertSettings = state.alerts?.settings;
  
  // Only proceed if notifications are enabled
  if (!alertSettings?.enableNotifications) {
    return result;
  }

  // Handle different action types
  switch (action.type) {
    case 'alerts/addAlert': {
      const alert = action.payload;
      
      // Auto-toast critical and high severity alerts
      if (alert.severity === 'high' || alert.severity === 'critical') {
        const icon = getAlertIcon(alert.category);
        const message = `${icon} ${alert.title}: ${alert.message}`;
        
        enqueueSnackbar(message, {
          variant: alert.type === 'error' ? 'error' : 'warning',
          autoHideDuration: alert.severity === 'critical' ? null : 6000,
          persist: alert.severity === 'critical',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          action: alert.severity === 'critical' ? (key) => {
            // Create a simple button element without JSX
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
              // Mark as acknowledged in Redux
              store.dispatch({ type: 'alerts/markAsRead', payload: alert.id });
              // Close notification
              import('notistack').then(({ closeSnackbar }) => closeSnackbar(key));
            };
            return button;
          } : undefined
        });
      }
      break;
    }

    case 'marineData/fetchAISData/fulfilled':
    case 'marineData/fetchWeatherData/fulfilled':
    case 'marineData/fetchOceanCurrentsData/fulfilled': {
      // Success notifications for data updates
      const dataType = action.type.includes('AIS') ? 'AIS' : 
                      action.type.includes('Weather') ? 'Weather' : 'Ocean currents';
      
      enqueueSnackbar(`🔄 ${dataType} data updated successfully`, {
        variant: 'info',
        autoHideDuration: 2000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
      });
      break;
    }

    case 'fleet/scheduleMaintenanceAsync/fulfilled': {
      const { vesselName, date } = action.meta.arg;
      enqueueSnackbar(`🔧 Maintenance scheduled for ${vesselName} on ${date}`, {
        variant: 'success',
        autoHideDuration: 4000
      });
      break;
    }

    case 'predictions/generatePredictions/fulfilled': {
      enqueueSnackbar('🧠 Biofouling predictions updated', {
        variant: 'success',
        autoHideDuration: 3000
      });
      break;
    }

    case 'esg/updateESGTargets/fulfilled': {
      enqueueSnackbar('🌱 ESG targets updated successfully', {
        variant: 'success',
        autoHideDuration: 3000
      });
      break;
    }

    // Error handling
    case 'marineData/fetchAISData/rejected':
    case 'marineData/fetchWeatherData/rejected':
    case 'fleet/fetchFleetData/rejected': {
      enqueueSnackbar('⚠️ Failed to sync marine data', {
        variant: 'error',
        autoHideDuration: 5000,
        persist: false
      });
      break;
    }

    default:
      break;
  }

  return result;
};

/**
 * Get appropriate icon for alert category
 */
function getAlertIcon(category) {
  const icons = {
    biofouling: '🦠',
    maintenance: '🔧',
    fuel: '⛽',
    weather: '🌊',
    system: '⚙️',
    fleet: '⚓',
    environmental: '🌱'
  };
  
  return icons[category] || '📢';
}

export default notificationMiddleware;