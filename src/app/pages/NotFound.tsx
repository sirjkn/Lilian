import { Link } from 'react-router';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#3a3a3a' }}>
      <div className="text-center max-w-2xl">
        {/* Large 404 */}
        <h1 className="text-9xl font-bold mb-4" style={{ color: '#6B7C3C' }}>
          404
        </h1>
        
        {/* Message */}
        <h2 className="text-3xl font-semibold mb-4" style={{ color: '#C9B99B' }}>
          Page Not Found
        </h2>
        
        <p className="text-lg mb-8 text-gray-300">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button 
              size="lg"
              className="w-full sm:w-auto"
              style={{ 
                backgroundColor: '#6B7C3C',
                color: 'white'
              }}
            >
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>
          
          <Link to="/properties">
            <Button 
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2"
              style={{ 
                borderColor: '#C9B99B',
                color: '#C9B99B',
                backgroundColor: 'transparent'
              }}
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Properties
            </Button>
          </Link>
        </div>
        
        {/* Back link */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 text-gray-400 hover:text-gray-200 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back to previous page
        </button>
        
        {/* Brand name at bottom */}
        <div className="mt-16">
          <p className="text-sm" style={{ color: '#C9B99B' }}>
            Skyway Suites
          </p>
        </div>
      </div>
    </div>
  );
}
