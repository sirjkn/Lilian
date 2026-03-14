import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 mb-6">
                We encountered an unexpected error. Don't worry, this happens sometimes. 
                Try refreshing the page or going back home.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
                  <p className="text-xs text-gray-700 font-mono break-all">
                    {this.state.error.toString()}
                  </p>
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
                  onClick={this.handleReset}
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

    return this.props.children;
  }
}
