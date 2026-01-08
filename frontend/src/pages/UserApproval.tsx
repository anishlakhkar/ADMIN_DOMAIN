import { useState } from 'react';
import { UserCheck, Mail, Save, Send, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';

interface UserRegistration {
  id: number;
  name: string;
  email: string;
  phone: string;
  platform: 'MedBuddy' | 'MedBiz';
  businessName?: string;
  licenseNumber?: string;
  registrationDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export default function UserApproval() {
  const [activeTab, setActiveTab] = useState<'settings' | 'pending'>('settings');
  const [filterPlatform, setFilterPlatform] = useState<'All' | 'MedBuddy' | 'MedBiz'>('All');

  // Auto-approval settings
  const [autoApprovalSettings, setAutoApprovalSettings] = useState({
    medBuddyAutoApproval: true,
    medBizAutoApproval: false,
    medBizRequireManualReview: true,
    notifyAdminOnNewRegistration: true,
    sendWelcomeEmail: true
  });

  // Email template settings
  const [emailTemplates, setEmailTemplates] = useState({
    welcomeSubject: 'Welcome to BlueWal Drugs!',
    welcomeBody: 'Dear {{name}},\n\nWelcome to BlueWal Drugs! Your registration for {{platform}} has been approved.\n\nYour login credentials:\nEmail: {{email}}\n\nPlease log in to get started.\n\nBest regards,\nBlueWal Drugs Team',
    rejectionSubject: 'Registration Update',
    rejectionBody: 'Dear {{name}},\n\nThank you for your interest in BlueWal Drugs. Unfortunately, we are unable to approve your {{platform}} registration at this time.\n\nReason: {{reason}}\n\nIf you have any questions, please contact our support team.\n\nBest regards,\nBlueWal Drugs Team',
    pendingReviewSubject: 'Registration Under Review',
    pendingReviewBody: 'Dear {{name}},\n\nThank you for registering with BlueWal Drugs {{platform}}.\n\nYour application is currently under review. We will notify you once the review is complete, typically within 1-2 business days.\n\nBest regards,\nBlueWal Drugs Team'
  });

  // Mock pending registrations
  const [registrations, setRegistrations] = useState<UserRegistration[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      platform: 'MedBuddy',
      registrationDate: '2024-12-23 09:30 AM',
      status: 'Pending'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@healthclinic.com',
      phone: '+1 (555) 234-5678',
      platform: 'MedBiz',
      businessName: 'Health First Clinic',
      licenseNumber: 'MED-2024-5678',
      registrationDate: '2024-12-23 10:15 AM',
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@gmail.com',
      phone: '+1 (555) 345-6789',
      platform: 'MedBuddy',
      registrationDate: '2024-12-23 11:00 AM',
      status: 'Pending'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@citypharmacy.com',
      phone: '+1 (555) 456-7890',
      platform: 'MedBiz',
      businessName: 'City Pharmacy',
      licenseNumber: 'MED-2024-9012',
      registrationDate: '2024-12-22 03:45 PM',
      status: 'Approved'
    },
    {
      id: 5,
      name: 'Robert Wilson',
      email: 'robert.w@example.com',
      phone: '+1 (555) 567-8901',
      platform: 'MedBuddy',
      registrationDate: '2024-12-22 02:30 PM',
      status: 'Rejected'
    }
  ]);

  const handleSaveSettings = () => {
    console.log('Saving auto-approval settings:', autoApprovalSettings);
    alert('Auto-approval settings saved successfully!');
  };

  const handleSaveEmailTemplates = () => {
    console.log('Saving email templates:', emailTemplates);
    alert('Email templates saved successfully!');
  };

  const handleApproveUser = (id: number) => {
    const user = registrations.find(r => r.id === id);
    if (user) {
      setRegistrations(prev => prev.map(r => 
        r.id === id ? { ...r, status: 'Approved' } : r
      ));
      alert(`Sending welcome email to ${user.email}...`);
      console.log(`User ${user.name} approved and welcome email sent`);
    }
  };

  const handleRejectUser = (id: number) => {
    const user = registrations.find(r => r.id === id);
    if (user) {
      const reason = prompt('Please provide a reason for rejection:');
      if (reason) {
        setRegistrations(prev => prev.map(r => 
          r.id === id ? { ...r, status: 'Rejected' } : r
        ));
        alert(`Sending rejection email to ${user.email}...`);
        console.log(`User ${user.name} rejected. Reason: ${reason}`);
      }
    }
  };

  const handleSendTestEmail = (templateType: string) => {
    alert(`Test email sent for: ${templateType}`);
    console.log(`Test email sent for template: ${templateType}`);
  };

  const filteredRegistrations = registrations.filter(reg => 
    filterPlatform === 'All' || reg.platform === filterPlatform
  );

  const pendingCount = registrations.filter(r => r.status === 'Pending').length;
  const approvedCount = registrations.filter(r => r.status === 'Approved').length;
  const rejectedCount = registrations.filter(r => r.status === 'Rejected').length;

  const tabs = [
    { id: 'settings', label: 'Auto-Approval Settings', icon: UserCheck },
    { id: 'pending', label: `Pending Registrations (${pendingCount})`, icon: Clock }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>User Registration & Approval</h1>
        <p className="text-neutral-600 mt-1">
          Manage user registration approvals and email notifications for MedBuddy (B2C) and MedBiz (B2B)
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700">Pending Approval</p>
              <p className="text-2xl mt-1 text-yellow-900">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700">Approved</p>
              <p className="text-2xl mt-1 text-green-900">{approvedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700">Rejected</p>
              <p className="text-2xl mt-1 text-red-900">{rejectedCount}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
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
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#461E96] text-[#461E96]'
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
          {/* Auto-Approval Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Platform-specific Settings */}
              <div>
                <h2 className="mb-4">Platform Auto-Approval Settings</h2>
                
                <div className="space-y-4">
                  {/* MedBuddy Settings */}
                  <div className="p-4 border border-neutral-200 rounded-lg bg-blue-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm">MedBuddy (B2C) - Auto-Approval</div>
                        <div className="text-xs text-neutral-600 mt-1">
                          Automatically approve individual customer registrations
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoApprovalSettings.medBuddyAutoApproval}
                          onChange={(e) => setAutoApprovalSettings({ 
                            ...autoApprovalSettings, 
                            medBuddyAutoApproval: e.target.checked 
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    {autoApprovalSettings.medBuddyAutoApproval && (
                      <div className="text-xs text-blue-700 bg-blue-100 p-2 rounded">
                        ✓ New MedBuddy registrations will be approved automatically and users will receive welcome emails
                      </div>
                    )}
                  </div>

                  {/* MedBiz Settings */}
                  <div className="p-4 border border-neutral-200 rounded-lg bg-purple-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm">MedBiz (B2B) - Auto-Approval</div>
                        <div className="text-xs text-neutral-600 mt-1">
                          Automatically approve business registrations (requires valid license)
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoApprovalSettings.medBizAutoApproval}
                          onChange={(e) => setAutoApprovalSettings({ 
                            ...autoApprovalSettings, 
                            medBizAutoApproval: e.target.checked,
                            medBizRequireManualReview: !e.target.checked
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    {!autoApprovalSettings.medBizAutoApproval && (
                      <div className="text-xs text-purple-700 bg-purple-100 p-2 rounded">
                        ⚠ Manual review required - Admin approval needed for all MedBiz registrations
                      </div>
                    )}
                  </div>

                  {/* Admin Notification */}
                  <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div>
                      <div className="text-sm">Admin Notifications</div>
                      <div className="text-xs text-neutral-600 mt-1">
                        Notify administrators of all new registrations
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoApprovalSettings.notifyAdminOnNewRegistration}
                      onChange={(e) => setAutoApprovalSettings({ 
                        ...autoApprovalSettings, 
                        notifyAdminOnNewRegistration: e.target.checked 
                      })}
                      className="w-4 h-4"
                    />
                  </label>

                  {/* Welcome Email */}
                  <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div>
                      <div className="text-sm">Send Welcome Emails</div>
                      <div className="text-xs text-neutral-600 mt-1">
                        Automatically send welcome emails to approved users
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoApprovalSettings.sendWelcomeEmail}
                      onChange={(e) => setAutoApprovalSettings({ 
                        ...autoApprovalSettings, 
                        sendWelcomeEmail: e.target.checked 
                      })}
                      className="w-4 h-4"
                    />
                  </label>
                </div>

                <div className="pt-4 border-t border-neutral-200 mt-6">
                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Settings
                  </button>
                </div>
              </div>

              {/* Email Templates */}
              <div className="pt-6 border-t border-neutral-200">
                <h2 className="mb-4">Email Templates</h2>

                <div className="space-y-6">
                  {/* Welcome Email Template */}
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm">Welcome Email Template</div>
                        <div className="text-xs text-neutral-600 mt-1">
                          Sent to users when their registration is approved
                        </div>
                      </div>
                      <button
                        onClick={() => handleSendTestEmail('Welcome Email')}
                        className="px-3 py-1 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        Test Email
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs mb-1">Subject Line</label>
                        <input
                          type="text"
                          value={emailTemplates.welcomeSubject}
                          onChange={(e) => setEmailTemplates({ 
                            ...emailTemplates, 
                            welcomeSubject: e.target.value 
                          })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-1">Email Body</label>
                        <textarea
                          value={emailTemplates.welcomeBody}
                          onChange={(e) => setEmailTemplates({ 
                            ...emailTemplates, 
                            welcomeBody: e.target.value 
                          })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                          rows={6}
                        />
                        <div className="text-xs text-neutral-500 mt-1">
                          Available variables: {'{{'} name {'}}'}, {'{{'} email {'}}'}, {'{{'} platform {'}}'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pending Review Email Template */}
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm">Pending Review Email Template</div>
                        <div className="text-xs text-neutral-600 mt-1">
                          Sent to users when their registration requires manual review
                        </div>
                      </div>
                      <button
                        onClick={() => handleSendTestEmail('Pending Review Email')}
                        className="px-3 py-1 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        Test Email
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs mb-1">Subject Line</label>
                        <input
                          type="text"
                          value={emailTemplates.pendingReviewSubject}
                          onChange={(e) => setEmailTemplates({ 
                            ...emailTemplates, 
                            pendingReviewSubject: e.target.value 
                          })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-1">Email Body</label>
                        <textarea
                          value={emailTemplates.pendingReviewBody}
                          onChange={(e) => setEmailTemplates({ 
                            ...emailTemplates, 
                            pendingReviewBody: e.target.value 
                          })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                          rows={6}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rejection Email Template */}
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm">Rejection Email Template</div>
                        <div className="text-xs text-neutral-600 mt-1">
                          Sent to users when their registration is rejected
                        </div>
                      </div>
                      <button
                        onClick={() => handleSendTestEmail('Rejection Email')}
                        className="px-3 py-1 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        Test Email
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs mb-1">Subject Line</label>
                        <input
                          type="text"
                          value={emailTemplates.rejectionSubject}
                          onChange={(e) => setEmailTemplates({ 
                            ...emailTemplates, 
                            rejectionSubject: e.target.value 
                          })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-1">Email Body</label>
                        <textarea
                          value={emailTemplates.rejectionBody}
                          onChange={(e) => setEmailTemplates({ 
                            ...emailTemplates, 
                            rejectionBody: e.target.value 
                          })}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                          rows={6}
                        />
                        <div className="text-xs text-neutral-500 mt-1">
                          Available variables: {'{{'} name {'}}'}, {'{{'} email {'}}'}, {'{{'} platform {'}}'}, {'{{'} reason {'}}'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 mt-6">
                  <button
                    onClick={handleSaveEmailTemplates}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Email Templates
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pending Registrations Tab */}
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {/* Filter */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Filter className="w-4 h-4 text-neutral-600" />
                  <select
                    value={filterPlatform}
                    onChange={(e) => setFilterPlatform(e.target.value as any)}
                    className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Platforms</option>
                    <option value="MedBuddy">MedBuddy (B2C)</option>
                    <option value="MedBiz">MedBiz (B2B)</option>
                  </select>
                </div>
              </div>

              {/* Registrations List */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm text-neutral-600">Name</th>
                      <th className="text-left px-4 py-3 text-sm text-neutral-600">Email</th>
                      <th className="text-left px-4 py-3 text-sm text-neutral-600">Phone</th>
                      <th className="text-left px-4 py-3 text-sm text-neutral-600">Platform</th>
                      <th className="text-left px-4 py-3 text-sm text-neutral-600">Business Info</th>
                      <th className="text-left px-4 py-3 text-sm text-neutral-600">Registration Date</th>
                      <th className="text-left px-4 py-3 text-sm text-neutral-600">Status</th>
                      <th className="text-left px-4 py-3 text-sm text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map((reg) => (
                      <tr key={reg.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                        <td className="px-4 py-4">{reg.name}</td>
                        <td className="px-4 py-4 text-neutral-600 text-sm">{reg.email}</td>
                        <td className="px-4 py-4 text-neutral-600 text-sm">{reg.phone}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            reg.platform === 'MedBuddy' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {reg.platform}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {reg.businessName ? (
                            <div>
                              <div className="text-neutral-900">{reg.businessName}</div>
                              <div className="text-xs text-neutral-500">License: {reg.licenseNumber}</div>
                            </div>
                          ) : (
                            <span className="text-neutral-400">Individual</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-neutral-600 text-sm">{reg.registrationDate}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            reg.status === 'Approved' ? 'bg-green-100 text-green-700' :
                            reg.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {reg.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {reg.status === 'Pending' ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApproveUser(reg.id)}
                                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-1"
                              >
                                <CheckCircle className="w-3 h-3" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectUser(reg.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center gap-1"
                              >
                                <XCircle className="w-3 h-3" />
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-neutral-400 text-sm">No action</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredRegistrations.length === 0 && (
                <div className="text-center py-12 text-neutral-500">
                  <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No registrations found for the selected filter</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
