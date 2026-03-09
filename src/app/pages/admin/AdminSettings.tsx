import { useState, useEffect } from 'react';
import { Save, Bell, Users as UsersIcon, Settings as SettingsIcon, Image } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import * as Tabs from '@radix-ui/react-tabs';
import { toast } from 'sonner';
import { getHeroSettings, updateHeroSettings } from '../../lib/api';

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [heroBackgroundUrl, setHeroBackgroundUrl] = useState('');
  const [isLoadingHero, setIsLoadingHero] = useState(true);

  useEffect(() => {
    loadHeroSettings();
  }, []);

  const loadHeroSettings = async () => {
    try {
      const settings = await getHeroSettings();
      if (settings?.backgroundImage) {
        setHeroBackgroundUrl(settings.backgroundImage);
      }
    } catch (error) {
      console.error('Failed to load hero settings');
    } finally {
      setIsLoadingHero(false);
    }
  };

  const handleSaveHeroBackground = async () => {
    try {
      await updateHeroSettings({ backgroundImage: heroBackgroundUrl });
      toast.success('Hero background updated! Refresh the homepage to see changes.');
    } catch (error) {
      toast.error('Failed to update hero background. Make sure you\'re connected to the database.');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-gray-600">Manage your application settings</p>
      </div>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex gap-4 border-b mb-8">
          <Tabs.Trigger
            value="general"
            className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
              activeTab === 'general'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              General
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="users"
            className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
              activeTab === 'users'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4" />
              Users & Roles
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="notifications"
            className={`px-4 py-2 -mb-px border-b-2 transition-colors ${
              activeTab === 'notifications'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </div>
          </Tabs.Trigger>
        </Tabs.List>

        {/* General Settings */}
        <Tabs.Content value="general">
          <div className="grid gap-6 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Update your business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Company Name</label>
                  <Input defaultValue="Skyway Suites" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <Input type="email" defaultValue="info@skywaysuites.com" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Phone</label>
                  <Input type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Address</label>
                  <Input defaultValue="123 Main St, Suite 100, New York, NY 10001" />
                </div>
                <Button onClick={() => toast.success('Settings saved!')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database Connection</CardTitle>
                <CardDescription>Neon database configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Database URL</label>
                  <Input 
                    type="password" 
                    placeholder="postgresql://username:password@host/database" 
                  />
                </div>
                <div className="p-4 bg-blue-50 rounded-md text-sm">
                  <p className="mb-2"><strong>Connect your Neon database:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Create a Neon account at neon.tech</li>
                    <li>Create a new database project</li>
                    <li>Copy your connection string</li>
                    <li>Paste it above and save</li>
                    <li>Update API endpoints in /src/app/lib/api.ts</li>
                  </ol>
                </div>
                <Button onClick={() => toast.success('Database connection updated!')}>
                  <Save className="h-4 w-4 mr-2" />
                  Update Connection
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booking Settings</CardTitle>
                <CardDescription>Configure booking rules and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Minimum Nights</label>
                  <Input type="number" defaultValue="1" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Maximum Advance Booking (days)</label>
                  <Input type="number" defaultValue="365" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Cancellation Period (hours)</label>
                  <Input type="number" defaultValue="24" />
                </div>
                <Button onClick={() => toast.success('Booking settings saved!')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hero Background</CardTitle>
                <CardDescription>Set the background image for the homepage hero section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Background Image URL</label>
                  <Input
                    type="text"
                    value={heroBackgroundUrl}
                    onChange={(e) => setHeroBackgroundUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="p-4 bg-blue-50 rounded-md text-sm">
                  <p className="mb-2"><strong>Upload an image:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Upload an image to a hosting service (e.g., Imgur, Cloudinary)</li>
                    <li>Copy the image URL</li>
                    <li>Paste it above and save</li>
                  </ol>
                </div>
                <Button onClick={handleSaveHeroBackground} disabled={isLoadingHero}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Background
                </Button>
              </CardContent>
            </Card>
          </div>
        </Tabs.Content>

        {/* Users & Roles */}
        <Tabs.Content value="users">
          <div className="grid gap-6 max-w-3xl">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Admin Users</CardTitle>
                    <CardDescription>Manage admin access and permissions</CardDescription>
                  </div>
                  <Button>
                    <UsersIcon className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Email</th>
                        <th className="text-left p-4">Role</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4">John Admin</td>
                        <td className="p-4">admin@skywaysuites.com</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                            Super Admin
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            Active
                          </span>
                        </td>
                        <td className="p-4">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4">Sarah Manager</td>
                        <td className="p-4">sarah@skywaysuites.com</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            Manager
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            Active
                          </span>
                        </td>
                        <td className="p-4">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>Define what each role can access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold mb-3">Super Admin</div>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Manage Properties
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Manage Bookings
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Manage Customers
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Manage Payments
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Access Settings
                      </label>
                    </div>
                  </div>
                  <Button onClick={() => toast.success('Permissions updated!')}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Permissions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs.Content>

        {/* Notifications */}
        <Tabs.Content value="notifications">
          <div className="grid gap-6 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure email notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <div className="font-semibold">New Booking</div>
                    <div className="text-sm text-gray-600">Get notified when a new booking is made</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <div className="font-semibold">Payment Received</div>
                    <div className="text-sm text-gray-600">Get notified when a payment is completed</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <div className="font-semibold">Customer Messages</div>
                    <div className="text-sm text-gray-600">Get notified when customers send messages</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <div className="font-semibold">Booking Cancellation</div>
                    <div className="text-sm text-gray-600">Get notified when a booking is cancelled</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
                <Button onClick={() => toast.success('Notification settings saved!')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Configure push notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <div className="font-semibold">Enable Push Notifications</div>
                    <div className="text-sm text-gray-600">Receive real-time notifications</div>
                  </div>
                  <input type="checkbox" className="rounded" />
                </label>
                <Button onClick={() => toast.success('Push notification settings saved!')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}