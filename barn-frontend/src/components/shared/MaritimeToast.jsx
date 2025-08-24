import React, { createContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext();

export { ToastContext };

export const MaritimeToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, options = {}) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      message,
      type: options.type || 'info',
      duration: options.duration || 4000,
      icon: options.icon || getDefaultIcon(options.type || 'info'),
      subtitle: options.subtitle,
      vesselId: options.vesselId,
      priority: options.priority || 'normal',
      persist: options.persist || false,
      ...options
    };

    setToasts(prev => [...prev, toast]);

    if (toast.duration > 0 && !toast.persist) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, toast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, removeAllToasts }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const getDefaultIcon = (type) => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: '⚙️',
    vessel: '🚢',
    maintenance: '🔧',
    biofouling: '🦠',
    route: '🗺️',
    weather: '🌊',
    fleet: '⚓',
    esg: '🌱',
    sync: '🔄'
  };
  return icons[type] || icons.info;
};

const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>,
    document.body
  );
};

const ToastItem = ({ toast, onRemove }) => {
  const getToastStyles = (type, priority) => {
    const baseStyles = "flex items-start p-4 rounded-xl shadow-lg backdrop-blur-sm border transform transition-all duration-300 ease-out animate-slide-in hover:scale-105 cursor-pointer";
    const priorityStyles = priority === 'high' ? 'ring-2 ring-opacity-50' : '';
    
    switch (type) {
      case 'success':
        return `${baseStyles} ${priorityStyles} bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 text-emerald-800 ring-emerald-300`;
      case 'error':
        return `${baseStyles} ${priorityStyles} bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800 ring-red-300`;
      case 'warning':
        return `${baseStyles} ${priorityStyles} bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 text-amber-800 ring-amber-300`;
      case 'vessel':
        return `${baseStyles} ${priorityStyles} bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-800 ring-blue-300`;
      case 'maintenance':
        return `${baseStyles} ${priorityStyles} bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 text-orange-800 ring-orange-300`;
      case 'biofouling':
        return `${baseStyles} ${priorityStyles} bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-800 ring-purple-300`;
      case 'route':
        return `${baseStyles} ${priorityStyles} bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 text-teal-800 ring-teal-300`;
      case 'weather':
        return `${baseStyles} ${priorityStyles} bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200 text-slate-800 ring-slate-300`;
      case 'fleet':
        return `${baseStyles} ${priorityStyles} bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 text-indigo-800 ring-indigo-300`;
      case 'esg':
        return `${baseStyles} ${priorityStyles} bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800 ring-green-300`;
      case 'sync':
        return `${baseStyles} ${priorityStyles} bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 text-cyan-800 ring-cyan-300`;
      default:
        return `${baseStyles} ${priorityStyles} bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200 text-slate-800 ring-slate-300`;
    }
  };

  const formatMessage = () => {
    if (toast.vesselId) {
      return `${toast.message} (Vessel: ${toast.vesselId})`;
    }
    return toast.message;
  };

  return (
    <div 
      className={getToastStyles(toast.type, toast.priority)}
      onClick={() => !toast.persist && onRemove(toast.id)}
    >
      <div className="flex-shrink-0">
        <span className="text-2xl mr-3 block">{toast.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm leading-tight">
          {formatMessage()}
        </p>
        {toast.subtitle && (
          <p className="text-xs opacity-75 mt-1 leading-tight">
            {toast.subtitle}
          </p>
        )}
        {toast.priority === 'high' && (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-bold bg-white bg-opacity-50 rounded-full">
            HIGH PRIORITY
          </span>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(toast.id);
        }}
        className="ml-3 text-lg opacity-60 hover:opacity-100 transition-opacity flex-shrink-0 p-1 hover:bg-white hover:bg-opacity-30 rounded-full"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
};

