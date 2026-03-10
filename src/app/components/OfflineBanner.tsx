import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function OfflineBanner() {
  return (
    <Alert className="mb-6 border-red-200 bg-red-50">
      <AlertCircle className="h-5 w-5 text-red-600" />
      <AlertTitle className="text-red-900 font-semibold">Neon Database Offline</AlertTitle>
      <AlertDescription className="text-red-800">
        The Neon database is currently unavailable. The application is running in offline mode with empty data. 
        All data operations will be unavailable until the database connection is restored.
      </AlertDescription>
    </Alert>
  );
}
