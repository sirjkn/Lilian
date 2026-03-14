import { useState } from 'react';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../lib/api';

export default function EmailTester() {
  const [testEmail, setTestEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const sendTestBookingEmail = async () => {
    if (!testEmail) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      setLoading(true);
      
      // This will create a test booking and trigger the email
      const response = await fetch(`${API_BASE_URL}?endpoint=bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: '1', // You'll need to use a real property ID
          customerId: '1', // You'll need to use a real customer ID
          checkIn: new Date().toISOString().split('T')[0],
          checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          guests: 2,
          totalPrice: 5000
        })
      });

      const data = await response.json();
      
      if (data.emailStatus?.sent) {
        toast.success('Test booking email sent successfully!');
      } else {
        toast.error(`Email not sent: ${data.emailStatus?.error || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('Failed to send test email');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📧 Email Tester</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-sm text-gray-600 mb-4">
          This is a manual email testing tool. Use the Email Diagnostics page for automatic system checks.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Email Address
            </label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B7C3C] focus:border-transparent"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Note:</strong> To properly test booking emails, you need to:
            </p>
            <ul className="text-sm text-yellow-800 mt-2 ml-5 list-disc">
              <li>Have at least one property in the system</li>
              <li>Have at least one customer with a valid email</li>
              <li>Use the Email Diagnostics page for better testing</li>
            </ul>
          </div>

          <button
            onClick={sendTestBookingEmail}
            disabled={loading}
            className="w-full px-4 py-2 bg-[#6B7C3C] text-white rounded-lg hover:bg-[#5a6832] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Test Booking Email'}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Better Testing Options:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Use <strong>Email Diagnostics</strong> to check system status</li>
            <li>• Create real bookings/payments through the admin panel</li>
            <li>• Check Settings → Notifications → Send Test Email</li>
          </ul>
        </div>
      </div>
    </div>
  );
}