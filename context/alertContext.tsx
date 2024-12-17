// context/alertContext.tsx
'use client';

import { createContext, useContext, useState, FC, ReactNode, useCallback, useEffect } from 'react';
import Alert from '@/components/ui/alert';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertContextProps {
  showAlert: (type: AlertType, message: string) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert debe ser usado dentro de AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);

  const showAlert = useCallback((type: AlertType, message: string) => {
    console.log('showAlert called with:', { type, message });
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  }, []);

  const handleClose = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alert && (
        <Alert type={alert.type} message={alert.message} onClose={handleClose} />
      )}
      {children}
    </AlertContext.Provider>
  );
};
