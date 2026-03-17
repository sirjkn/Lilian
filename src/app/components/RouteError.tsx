import { useRouteError, Link } from 'react-router';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

export function RouteError() {
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 mb-4">
            <AlertTriangle className="h-10 w-10 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Navigation Error
          </h1>
          <p className="text-gray-600 mb-6">
            We encountered an error while loading this page. This usually resolves 
            itself by refreshing or going back home.
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left max-w-full overflow-auto">
              <p className="text-xs font-semibold text-gray-800 mb-1">Error Details:</p>
              <p className="text-xs text-gray-700 font-mono break-all">
                {error.toString()}
              </p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-xs font-semibold text-gray-800 cursor-pointer">Stack Trace</summary>
                  <pre className="text-xs text-gray-600 mt-1 whitespace-pre-wrap break-all">{error.stack}</pre>
                </details>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2"
            style={{ backgroundColor: '#6B7C3C' }}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Page
          </Button>
          <Link to="/">
            <Button
              variant="outline"
              className="inline-flex items-center gap-2 w-full"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}