// components/ui/Alert.tsx

'use client';

import { FC } from 'react';
import { X } from 'react-feather';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

interface AlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
}

const Alert: FC<AlertProps> = ({ type, message, onClose }) => {
  const alertStyles = classNames(
    'fixed top-0 left-0 right-0 z-50 w-full',
    'flex items-center p-4 text-sm rounded-lg shadow-md',
    {
      'bg-green-100 text-green-700': type === 'success',
      'bg-red-100 text-red-700': type === 'error',
      'bg-blue-100 text-blue-700': type === 'info',
      'bg-yellow-100 text-yellow-700': type === 'warning',
    }
  );


  const iconStyles = classNames('mr-3');

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg
            className={iconStyles}
            fill="currentColor"
            viewBox="0 0 20 20"
            width="20"
            height="20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            className={iconStyles}
            fill="currentColor"
            viewBox="0 0 20 20"
            width="20"
            height="20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.243-11.757a1 1 0 00-1.414-1.414L10 8.586 7.172 5.757a1 1 0 10-1.414 1.414L8.586 10l-3.829 3.829a1 1 0 001.414 1.414L10 11.414l2.828 2.829a1 1 0 001.414-1.414L11.414 10l3.829-3.829z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'info':
        return (
          <svg
            className={iconStyles}
            fill="currentColor"
            viewBox="0 0 20 20"
            width="20"
            height="20"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-9-3a1 1 0 112 0v4a1 1 0 11-2 0V7zm1 7a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            className={iconStyles}
            fill="currentColor"
            viewBox="0 0 20 20"
            width="20"
            height="20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l6.518 11.594c.75 1.332-.213 2.981-1.742 2.981H3.48c-1.53 0-2.492-1.649-1.742-2.981L8.257 3.1zM11 14a1 1 0 11-2 0 1 1 0 012 0zm-1-4a1 1 0 00-.993.883L9 11v2a1 1 0 001.993.117L11 13V9z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={alertStyles}
        role="alert"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {getIcon()}
        <span className="flex-1">{message}</span>
        {onClose && (
          <button onClick={onClose} className="ml-3">
            <X size={20} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
