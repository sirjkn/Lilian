import { useEffect, useState, ReactNode } from 'react';
import { getMaintenanceSettings } from '../lib/api';
import { MaintenancePage } from './MaintenancePage';
import { useAuth } from '../context/AuthContext';

interface MaintenanceWrapperProps {
  children: ReactNode;
}

export function MaintenanceWrapper({ children }: MaintenanceWrapperProps) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    checkMaintenanceMode();
    
    // Check every minute for maintenance mode changes
    const interval = setInterval(checkMaintenanceMode, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkMaintenanceMode = async () => {
    try {
      const settings = await getMaintenanceSettings();
      if (settings) {
        setIsMaintenanceMode(settings.enabled === 'true');
        setMaintenanceMessage(settings.message || "We're currently performing scheduled maintenance to improve your experience.");
        setEstimatedTime(settings.estimated_time || "We'll be back soon");
      }
    } catch (error) {
      console.error('Failed to check maintenance mode', error);
      // If we can't check, assume not in maintenance mode
      setIsMaintenanceMode(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // If in maintenance mode and not an admin, show maintenance page
  if (isMaintenanceMode && !isAdmin) {
    return <MaintenancePage message={maintenanceMessage} estimatedTime={estimatedTime} />;
  }

  // Otherwise, render the app normally
  return <>{children}</>;
}
