import { useState, useEffect } from 'react';

export function DatabaseStatus() {
  const [isConnected, setIsConnected] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Check connection on mount
    checkConnection();

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  const checkConnection = async () => {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      setIsConnected(data.status === 'ok' && data.database === 'connected');
    } catch (error) {
      console.error('Database health check failed:', error);
      setIsConnected(false);
    }
  };

  return (
    <div 
      className="fixed bottom-6 left-6 z-50"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200">
          {isConnected ? (
            <>
              <div className="font-semibold flex items-center gap-2">
                <span className="text-green-400">✓</span> Connected to Neon DB
              </div>
              <div className="text-xs text-gray-300 mt-1">Database operational</div>
            </>
          ) : (
            <>
              <div className="font-semibold flex items-center gap-2">
                <span className="text-red-400">✗</span> Database Disconnected
              </div>
              <div className="text-xs text-gray-300 mt-1">Attempting to reconnect...</div>
            </>
          )}
          {/* Tooltip arrow */}
          <div className="absolute top-full left-6 -mt-px">
            <div className="border-8 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}

      {/* Status indicator */}
      <div className="relative w-16 h-16 flex items-center justify-center cursor-pointer">
        {isConnected ? (
          <>
            {/* Outermost pulsing ring - slowest */}
            <div 
              className="absolute inset-0 rounded-full bg-green-500/10 animate-pulse"
              style={{ animationDuration: '3s' }}
            ></div>
            
            {/* Second pulsing ring */}
            <div 
              className="absolute inset-1 rounded-full bg-green-500/20 animate-pulse"
              style={{ animationDuration: '2s', animationDelay: '0.5s' }}
            ></div>
            
            {/* Third ring with ping effect */}
            <div className="absolute inset-3 rounded-full bg-green-500/30 animate-ping"></div>
            
            {/* Middle glow ring */}
            <div className="absolute inset-4 rounded-full bg-green-500/40 blur-md"></div>
            
            {/* Inner bright core */}
            <div className="relative w-6 h-6 rounded-full bg-green-500 shadow-2xl shadow-green-500/60 animate-pulse" style={{ animationDuration: '2s' }}></div>
          </>
        ) : (
          <>
            {/* Outer static ring */}
            <div className="absolute inset-0 rounded-full bg-red-500/10"></div>
            
            {/* Second ring */}
            <div className="absolute inset-1 rounded-full bg-red-500/20"></div>
            
            {/* Middle glow ring */}
            <div className="absolute inset-4 rounded-full bg-red-500/40 blur-md"></div>
            
            {/* Inner solid dot - slow pulse to indicate trying to reconnect */}
            <div 
              className="relative w-6 h-6 rounded-full bg-red-500 shadow-2xl shadow-red-500/60 animate-pulse"
              style={{ animationDuration: '3s' }}
            ></div>
          </>
        )}
      </div>
    </div>
  );
}