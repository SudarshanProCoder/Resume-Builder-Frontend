import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import { SnackbarOrigin } from '@mui/material/Snackbar';

interface SnackbarMessage {
  message: string;
  severity?: AlertColor;
  duration?: number;
  position?: SnackbarOrigin;
}

interface SnackbarContextType {
  showSnackbar: (options: SnackbarMessage) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

const SnackbarContext = React.createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = React.useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
};

interface SnackbarProviderProps {
  children: React.ReactNode;
  defaultDuration?: number;
  defaultPosition?: SnackbarOrigin;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  defaultDuration = 3000,
  defaultPosition = { vertical: 'top', horizontal: 'center' }
}) => {
  const [open, setOpen] = React.useState(false);
  const [snackbarData, setSnackbarData] = React.useState<SnackbarMessage>({
    message: '',
    severity: 'info',
    duration: defaultDuration,
    position: defaultPosition
  });

  const showSnackbar = React.useCallback(
    (options: SnackbarMessage) => {
      setSnackbarData({
        ...options,
        duration: options.duration || defaultDuration,
        position: options.position || defaultPosition
      });
      setOpen(true);
    },
    [defaultDuration, defaultPosition]
  );

  const showSuccess = React.useCallback(
    (message: string) => {
      showSnackbar({ message, severity: 'success' });
    },
    [showSnackbar]
  );

  const showError = React.useCallback(
    (message: string) => {
      showSnackbar({ message, severity: 'error' });
    },
    [showSnackbar]
  );

  const showWarning = React.useCallback(
    (message: string) => {
      showSnackbar({ message, severity: 'warning' });
    },
    [showSnackbar]
  );

  const showInfo = React.useCallback(
    (message: string) => {
      showSnackbar({ message, severity: 'info' });
    },
    [showSnackbar]
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const value = React.useMemo(
    () => ({
      showSnackbar,
      showSuccess,
      showError,
      showWarning,
      showInfo
    }),
    [showSnackbar, showSuccess, showError, showWarning, showInfo]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={snackbarData.duration}
        onClose={handleClose}
        anchorOrigin={snackbarData.position}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarData.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
