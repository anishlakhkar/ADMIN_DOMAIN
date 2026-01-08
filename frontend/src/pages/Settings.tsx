import { useState } from 'react';
import { Settings as SettingsIcon, Save, Users, Shield, Bell, Database } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'Inventory Pro',
    email: 'admin@inventorypro.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, Suite 100, City, State 12345',
    timezone: 'UTC-5',
    currency: 'USD'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    lowStockEmail: true,
    expiryEmail: true,
    poApprovalEmail: true,
    systemUpdates: false,
    weeklyReports: true
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Michael Chen', email: 'michael@example.com', role: 'Staff', status: 'Active' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Staff', status: 'Inactive' }
  ]);

  const handleSaveGeneral = () => {
    console.log('Saving general settings:', generalSettings);
    alert('General settings saved successfully');
  };

  const handleSaveNotifications = () => {
    console.log('Saving notification settings:', notificationSettings);
    alert('Notification preferences saved successfully');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data & Backup', icon: Database }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Settings</h1>
        <p className="text-neutral-600 mt-1">Configure system preferences and user management</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-neutral-200">
        <div className="border-b border-neutral-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4">Company Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Company Name</label>
                    <input
                      type="text"
                      value={generalSettings.companyName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={generalSettings.email}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      value={generalSettings.phone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Timezone</label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC-6">Central Time (UTC-6)</option>
                      <option value="UTC-7">Mountain Time (UTC-7)</option>
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2">Address</label>
                    <textarea
                      value={generalSettings.address}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Currency</label>
                    <select
                      value={generalSettings.currency}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <button
                  onClick={handleSaveGeneral}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Users & Roles */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2>User Management</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add New User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm text-neutral-600">Name</th>
                      <th className="text-left px-6 py-3 text-sm text-neutral-600">Email</th>
                      <th className="text-left px-6 py-3 text-sm text-neutral-600">Role</th>
                      <th className="text-left px-6 py-3 text-sm text-neutral-600">Status</th>
                      <th className="text-left px-6 py-3 text-sm text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4 text-neutral-600">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                            user.role === 'Manager' ? 'bg-blue-100 text-blue-700' :
                            'bg-neutral-100 text-neutral-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-700'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:underline text-sm mr-3">Edit</button>
                          <button className="text-red-600 hover:underline text-sm">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2>Notification Preferences</h2>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <div className="text-sm">Low Stock Alerts</div>
                    <div className="text-xs text-neutral-600 mt-1">Receive emails when stock falls below threshold</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.lowStockEmail}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, lowStockEmail: e.target.checked })}
                    className="w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <div className="text-sm">Expiry Notifications</div>
                    <div className="text-xs text-neutral-600 mt-1">Get notified about upcoming product expiries</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.expiryEmail}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, expiryEmail: e.target.checked })}
                    className="w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <div className="text-sm">PO Approval Requests</div>
                    <div className="text-xs text-neutral-600 mt-1">Email notifications for pending approvals</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.poApprovalEmail}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, poApprovalEmail: e.target.checked })}
                    className="w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <div className="text-sm">Weekly Reports</div>
                    <div className="text-xs text-neutral-600 mt-1">Receive weekly inventory summary reports</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.weeklyReports}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyReports: e.target.checked })}
                    className="w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <div className="text-sm">System Updates</div>
                    <div className="text-xs text-neutral-600 mt-1">Notifications about system maintenance and updates</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.systemUpdates}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, systemUpdates: e.target.checked })}
                    className="w-4 h-4"
                  />
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <button
                  onClick={handleSaveNotifications}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2>Security Settings</h2>

              <div className="space-y-4">
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="text-sm mb-2">Password Policy</div>
                  <div className="text-xs text-neutral-600 mb-3">Minimum password length: 8 characters</div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Change Password
                  </button>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="text-sm mb-2">Two-Factor Authentication</div>
                  <div className="text-xs text-neutral-600 mb-3">Add an extra layer of security to your account</div>
                  <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-sm">
                    Enable 2FA
                  </button>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="text-sm mb-2">Session Timeout</div>
                  <div className="text-xs text-neutral-600 mb-3">Automatically log out after period of inactivity</div>
                  <select className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Data & Backup */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <h2>Data Management</h2>

              <div className="space-y-4">
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="text-sm mb-2">Database Backup</div>
                  <div className="text-xs text-neutral-600 mb-3">Last backup: December 10, 2024 at 2:00 AM</div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Backup Now
                    </button>
                    <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-sm">
                      Schedule Backups
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="text-sm mb-2">Data Export</div>
                  <div className="text-xs text-neutral-600 mb-3">Export all system data for archival or migration</div>
                  <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-sm">
                    Export All Data
                  </button>
                </div>

                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div className="text-sm mb-2 text-red-900">Danger Zone</div>
                  <div className="text-xs text-red-700 mb-3">Irreversible actions that affect your data</div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                    Delete All Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
