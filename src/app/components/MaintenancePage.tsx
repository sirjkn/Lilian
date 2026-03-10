import { Wrench, Clock, AlertCircle } from 'lucide-react';

interface MaintenancePageProps {
  message?: string;
  estimatedTime?: string;
}

export function MaintenancePage({ 
  message = "We're currently performing scheduled maintenance to improve your experience.",
  estimatedTime = "We'll be back soon"
}: MaintenancePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated wrench icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#6B7C3C]/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-white rounded-full p-8 shadow-2xl">
              <Wrench className="w-20 h-20 text-[#6B7C3C] animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Under Maintenance
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {message}
        </p>

        {/* Info cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <Clock className="w-8 h-8 text-[#6B7C3C] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Estimated Time</h3>
            <p className="text-sm text-gray-600">{estimatedTime}</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <AlertCircle className="w-8 h-8 text-[#6B7C3C] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600">Contact support if urgent</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500">
          <p>Thank you for your patience.</p>
          <p className="mt-2">— The Skyway Suites Team</p>
        </div>

        {/* Auto refresh notice */}
        <div className="mt-8 text-xs text-gray-400">
          This page will automatically refresh when maintenance is complete
        </div>
      </div>
    </div>
  );
}
