import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <RouterProvider router={router} />
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            classNames: {
              success: 'bg-green-50 border-green-200 text-green-900',
            },
          }}
        />
      </HelmetProvider>
    </ErrorBoundary>
  );
}