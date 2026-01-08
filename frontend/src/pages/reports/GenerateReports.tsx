import { useState } from 'react';
import { FileBarChart, Download, Calendar } from 'lucide-react';

export default function GenerateReports() {
  const [reportConfig, setReportConfig] = useState({
    type: '',
    startDate: '',
    endDate: '',
    warehouse: 'all',
    category: 'all',
    format: 'pdf'
  });

  const reportTypes = [
    { value: 'inventory-valuation', label: 'Inventory Valuation Report', description: 'Current stock value by warehouse' },
    { value: 'stock-movement', label: 'Stock Movement Report', description: 'Track incoming and outgoing inventory' },
    { value: 'low-stock', label: 'Low Stock Report', description: 'Items below minimum threshold' },
    { value: 'expiry', label: 'Expiry Report', description: 'Upcoming expiring batches' },
    { value: 'supplier-performance', label: 'Supplier Performance', description: 'Delivery times and quality metrics' },
    { value: 'purchase-order', label: 'Purchase Order Summary', description: 'PO history and status' },
    { value: 'sales-analysis', label: 'Sales Analysis', description: 'Product sales trends' },
    { value: 'compliance', label: 'Compliance Report', description: 'Regulatory documentation status' }
  ];

  const recentReports = [
    { id: 1, name: 'Monthly Inventory Valuation - November 2024', type: 'Inventory Valuation', date: '2024-12-01', size: '2.4 MB', format: 'PDF' },
    { id: 2, name: 'Low Stock Alert Report - Week 49', type: 'Low Stock Report', date: '2024-11-28', size: '1.1 MB', format: 'XLSX' },
    { id: 3, name: 'Supplier Performance Q4 2024', type: 'Supplier Performance', date: '2024-11-25', size: '3.2 MB', format: 'PDF' },
    { id: 4, name: 'Expiry Tracking - December 2024', type: 'Expiry Report', date: '2024-11-20', size: '1.8 MB', format: 'CSV' }
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportConfig.type) {
      alert('Please select a report type');
      return;
    }
    console.log('Generating report:', reportConfig);
    alert('Report generation started. You will be notified when ready for download.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Generate Reports</h1>
        <p className="text-neutral-600 mt-1">Create custom reports for inventory analysis</p>
      </div>

      {/* Report Generator */}
      <div className="bg-white rounded-lg border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <FileBarChart className="w-5 h-5" />
            <h2>Report Configuration</h2>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="p-6">
          <div className="space-y-6">
            {/* Report Type Selection */}
            <div>
              <label className="block text-sm mb-3">Select Report Type *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reportTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      reportConfig.type === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-neutral-300 hover:border-blue-300 hover:bg-neutral-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportType"
                      value={type.value}
                      checked={reportConfig.type === type.value}
                      onChange={(e) => setReportConfig({ ...reportConfig, type: e.target.value })}
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

            {/* Date Range */}
            <div>
              <label className="block text-sm mb-3">Date Range *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-600 mb-2">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="date"
                      value={reportConfig.startDate}
                      onChange={(e) => setReportConfig({ ...reportConfig, startDate: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-2">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="date"
                      value={reportConfig.endDate}
                      onChange={(e) => setReportConfig({ ...reportConfig, endDate: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div>
              <label className="block text-sm mb-3">Filters (Optional)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-600 mb-2">Warehouse</label>
                  <select
                    value={reportConfig.warehouse}
                    onChange={(e) => setReportConfig({ ...reportConfig, warehouse: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Warehouses</option>
                    <option value="warehouse-a">Warehouse A</option>
                    <option value="warehouse-b">Warehouse B</option>
                    <option value="warehouse-c">Warehouse C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-600 mb-2">Category</label>
                  <select
                    value={reportConfig.category}
                    onChange={(e) => setReportConfig({ ...reportConfig, category: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="medications">Medications</option>
                    <option value="supplements">Supplements</option>
                    <option value="equipment">Equipment</option>
                    <option value="supplies">Supplies</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Output Format */}
            <div>
              <label className="block text-sm mb-3">Output Format *</label>
              <div className="flex flex-wrap gap-3">
                <label className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                  reportConfig.format === 'pdf' ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 hover:bg-neutral-50'
                }`}>
                  <input
                    type="radio"
                    name="format"
                    value="pdf"
                    checked={reportConfig.format === 'pdf'}
                    onChange={(e) => setReportConfig({ ...reportConfig, format: e.target.value })}
                  />
                  <span className="text-sm">PDF</span>
                </label>

                <label className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                  reportConfig.format === 'xlsx' ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 hover:bg-neutral-50'
                }`}>
                  <input
                    type="radio"
                    name="format"
                    value="xlsx"
                    checked={reportConfig.format === 'xlsx'}
                    onChange={(e) => setReportConfig({ ...reportConfig, format: e.target.value })}
                  />
                  <span className="text-sm">Excel (XLSX)</span>
                </label>

                <label className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                  reportConfig.format === 'csv' ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 hover:bg-neutral-50'
                }`}>
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={reportConfig.format === 'csv'}
                    onChange={(e) => setReportConfig({ ...reportConfig, format: e.target.value })}
                  />
                  <span className="text-sm">CSV</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-neutral-200">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FileBarChart className="w-4 h-4" />
                Generate Report
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

      {/* Recent Reports */}
      <div className="bg-white rounded-lg border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <h2>Recent Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Report Name</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Type</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Generated On</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Format</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Size</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                  <td className="px-6 py-4">{report.name}</td>
                  <td className="px-6 py-4 text-neutral-600">{report.type}</td>
                  <td className="px-6 py-4 text-neutral-600">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs">
                      {report.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{report.size}</td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
