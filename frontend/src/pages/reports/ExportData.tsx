import { useState } from 'react';
import { Download, Calendar, Play, Trash2, Plus } from 'lucide-react';

export default function ExportData() {
  const [exportConfig, setExportConfig] = useState({
    dataType: '',
    format: 'csv',
    includeHeaders: true,
    dateRange: 'all'
  });

  const [schedules, setSchedules] = useState([
    { id: 1, name: 'Weekly Inventory Export', dataType: 'Inventory', frequency: 'Weekly', format: 'XLSX', nextRun: '2024-12-15', status: 'Active' },
    { id: 2, name: 'Monthly Sales Report', dataType: 'Sales', frequency: 'Monthly', format: 'CSV', nextRun: '2025-01-01', status: 'Active' },
    { id: 3, name: 'Daily Low Stock Alert', dataType: 'Low Stock', frequency: 'Daily', format: 'PDF', nextRun: '2024-12-12', status: 'Active' },
    { id: 4, name: 'Quarterly Supplier Data', dataType: 'Suppliers', frequency: 'Quarterly', format: 'XLSX', nextRun: '2025-01-01', status: 'Paused' }
  ]);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    dataType: '',
    frequency: '',
    format: 'csv'
  });

  const dataTypes = [
    { value: 'inventory', label: 'Full Inventory Data', description: 'All products with stock levels' },
    { value: 'transactions', label: 'Stock Transactions', description: 'All incoming and outgoing movements' },
    { value: 'low-stock', label: 'Low Stock Items', description: 'Items below minimum threshold' },
    { value: 'expiry', label: 'Expiry Data', description: 'Batch expiry information' },
    { value: 'suppliers', label: 'Supplier Information', description: 'Supplier details and contacts' },
    { value: 'orders', label: 'Purchase Orders', description: 'PO history and status' },
    { value: 'sales', label: 'Sales Data', description: 'Sales transactions and trends' },
    { value: 'compliance', label: 'Compliance Records', description: 'Regulatory documentation' }
  ];

  const handleExport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exportConfig.dataType) {
      alert('Please select data type to export');
      return;
    }
    console.log('Exporting data:', exportConfig);
    alert('Export started. Your file will download shortly.');
  };

  const handleAddSchedule = () => {
    if (!newSchedule.name || !newSchedule.dataType || !newSchedule.frequency) {
      alert('Please fill in all required fields');
      return;
    }

    const newId = Math.max(...schedules.map(s => s.id), 0) + 1;
    const nextRun = new Date();
    nextRun.setDate(nextRun.getDate() + 1);

    setSchedules([...schedules, {
      id: newId,
      name: newSchedule.name,
      dataType: newSchedule.dataType,
      frequency: newSchedule.frequency,
      format: newSchedule.format.toUpperCase(),
      nextRun: nextRun.toISOString().split('T')[0],
      status: 'Active'
    }]);

    setNewSchedule({ name: '', dataType: '', frequency: '', format: 'csv' });
    setShowScheduleModal(false);
    alert('Export schedule created successfully');
  };

  const handleDeleteSchedule = (id: number) => {
    if (confirm('Are you sure you want to delete this scheduled export?')) {
      setSchedules(schedules.filter(s => s.id !== id));
    }
  };

  const handleToggleSchedule = (id: number) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' } : s
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Export Data</h1>
        <p className="text-neutral-600 mt-1">Export inventory data in various formats</p>
      </div>

      {/* Quick Export */}
      <div className="bg-white rounded-lg border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            <h2>Quick Export</h2>
          </div>
        </div>

        <form onSubmit={handleExport} className="p-6">
          <div className="space-y-6">
            {/* Data Type Selection */}
            <div>
              <label className="block text-sm mb-3">Select Data to Export *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dataTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      exportConfig.dataType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-neutral-300 hover:border-blue-300 hover:bg-neutral-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="dataType"
                      value={type.value}
                      checked={exportConfig.dataType === type.value}
                      onChange={(e) => setExportConfig({ ...exportConfig, dataType: e.target.value })}
                      className="mt-1"
                    />
                    <div>
                      <div className="text-sm">{type.label}</div>
                      <div className="text-xs text-neutral-600 mt-1">{type.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-3">Export Format *</label>
                <div className="space-y-2">
                  {['csv', 'xlsx', 'pdf', 'json'].map((format) => (
                    <label
                      key={format}
                      className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                        exportConfig.format === format ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="format"
                        value={format}
                        checked={exportConfig.format === format}
                        onChange={(e) => setExportConfig({ ...exportConfig, format: e.target.value })}
                      />
                      <span className="text-sm uppercase">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-3">Date Range</label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Time' },
                    { value: 'today', label: 'Today' },
                    { value: 'week', label: 'Last 7 Days' },
                    { value: 'month', label: 'Last 30 Days' },
                    { value: 'custom', label: 'Custom Range' }
                  ].map((range) => (
                    <label
                      key={range.value}
                      className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                        exportConfig.dateRange === range.value ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="dateRange"
                        value={range.value}
                        checked={exportConfig.dateRange === range.value}
                        onChange={(e) => setExportConfig({ ...exportConfig, dateRange: e.target.value })}
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exportConfig.includeHeaders}
                  onChange={(e) => setExportConfig({ ...exportConfig, includeHeaders: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Include column headers</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-neutral-200">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Now
              </button>
              <button
                type="button"
                className="px-6 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Scheduled Exports */}
      <div className="bg-white rounded-lg border border-neutral-200">
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <h2>Scheduled Exports</h2>
          </div>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Schedule
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Schedule Name</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Data Type</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Frequency</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Format</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Next Run</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Status</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                  <td className="px-6 py-4">{schedule.name}</td>
                  <td className="px-6 py-4 text-neutral-600">{schedule.dataType}</td>
                  <td className="px-6 py-4 text-neutral-600">{schedule.frequency}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs">
                      {schedule.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{schedule.nextRun}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      schedule.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleSchedule(schedule.id)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title={schedule.status === 'Active' ? 'Pause' : 'Resume'}
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg">New Export Schedule</h3>
                <p className="text-sm text-neutral-600">Automate regular data exports</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-2">Schedule Name *</label>
                <input
                  type="text"
                  value={newSchedule.name}
                  onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Weekly Inventory Export"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Data Type *</label>
                <select
                  value={newSchedule.dataType}
                  onChange={(e) => setNewSchedule({ ...newSchedule, dataType: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select data type</option>
                  <option value="Inventory">Full Inventory</option>
                  <option value="Transactions">Transactions</option>
                  <option value="Low Stock">Low Stock Items</option>
                  <option value="Sales">Sales Data</option>
                  <option value="Suppliers">Suppliers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Frequency *</label>
                <select
                  value={newSchedule.frequency}
                  onChange={(e) => setNewSchedule({ ...newSchedule, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Format *</label>
                <select
                  value={newSchedule.format}
                  onChange={(e) => setNewSchedule({ ...newSchedule, format: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="csv">CSV</option>
                  <option value="xlsx">Excel (XLSX)</option>
                  <option value="pdf">PDF</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowScheduleModal(false);
                  setNewSchedule({ name: '', dataType: '', frequency: '', format: 'csv' });
                }}
                className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSchedule}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
