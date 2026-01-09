import { useState, useEffect } from 'react';
import { FileBarChart, Download, Calendar } from 'lucide-react';
import { reportService, type RecentReportResponse } from '../../sevices/reportService';

export default function GenerateReports() {
  const [reportConfig, setReportConfig] = useState({
    type: '',
    startDate: '',
    endDate: '',
    format: 'pdf' as 'pdf' | 'xlsx' | 'csv'
  });
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [recentReports, setRecentReports] = useState<RecentReportResponse[]>([]);
  const [generatedReports, setGeneratedReports] = useState<Map<number, any>>(new Map());
  const [reportIdCounter, setReportIdCounter] = useState(1);

  const reportTypes = [
    { value: 'inventory-valuation', label: 'Inventory Valuation Report', description: 'Current stock value by warehouse' },
    { value: 'low-stock', label: 'Low Stock Report', description: 'Items below minimum threshold' },
    { value: 'purchase-order', label: 'Purchase Order Summary', description: 'PO history and status (Backend coming soon)' }
  ];

  // Load recent reports on mount
  useEffect(() => {
    loadRecentReports();
  }, []);

  const loadRecentReports = async () => {
    try {
      setLoading(true);
      const reports = await reportService.getRecentReports();
      // Only show reports that exist (from backend or locally generated)
      setRecentReports(reports);
    } catch (error) {
      console.error('Error loading recent reports:', error);
      setRecentReports([]);
    } finally {
      setLoading(false);
    }
  };

  const downloadReportFile = async (request: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'}/reports/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error generating report');
      }

      // Get file content
      const blob = await response.blob();
      const fileName = getFileName(request);
      
      // Download file
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Store in recent reports
      const newReport: RecentReportResponse = {
        id: reportIdCounter,
        reportName: `${request.reportType === 'inventory-valuation' ? 'Inventory Valuation' : 'Low Stock'} Report - ${request.startDate} to ${request.endDate}`,
        reportType: request.reportType === 'inventory-valuation' ? 'Inventory Valuation' : 'Low Stock',
        generatedDate: new Date().toISOString().split('T')[0],
        format: request.format.toUpperCase(),
        size: `${(blob.size / (1024 * 1024)).toFixed(1)} MB`,
        downloadUrl: ''
      };

      setRecentReports(prev => [newReport, ...prev].slice(0, 10));
      setReportIdCounter(prev => prev + 1);

      alert(`Report downloaded successfully!\n\nFile: ${fileName}`);
      
      // Reset form
      setReportConfig({ type: '', startDate: '', endDate: '', format: 'pdf' });
    } catch (error: any) {
      console.error('Error downloading report:', error);
      alert(error.message || 'Error downloading report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const getFileName = (request: any): string => {
    const reportType = request.reportType === 'inventory-valuation' ? 'Inventory_Valuation' : 'Low_Stock';
    const extension = request.format.toLowerCase();
    return `${reportType}_${request.startDate}_to_${request.endDate}.${extension}`;
  };

  const storeGeneratedReport = (response: any, reportType: string) => {
    // Store the generated report (for JSON format)
    const reportId = reportIdCounter;
    const newReport: RecentReportResponse = {
      id: reportId,
      reportName: response.reportName,
      reportType: reportType === 'inventory-valuation' ? 'Inventory Valuation' : 'Low Stock',
      generatedDate: new Date().toISOString().split('T')[0],
      format: response.format,
      size: calculateReportSize(response),
      downloadUrl: `/api/reports/download/${reportId}`
    };
    
    // Store report data for download
    setGeneratedReports(prev => {
      const newMap = new Map(prev);
      newMap.set(reportId, { data: response, report: newReport });
      return newMap;
    });
    
    // Add to recent reports
    setRecentReports(prev => [newReport, ...prev].slice(0, 10));
    setReportIdCounter(prev => prev + 1);
    
    // Show success message
    alert(`Report generated successfully!\n\nReport: ${newReport.reportName}\nFormat: ${newReport.format}\n\nYou can download it from Recent Reports.`);
    
    // Reset form
    setReportConfig({ type: '', startDate: '', endDate: '', format: 'pdf' });
  };

  const calculateReportSize = (reportData: any): string => {
    // Estimate file size based on data
    const jsonString = JSON.stringify(reportData);
    const sizeInBytes = new Blob([jsonString]).size;
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(1);
    return `${sizeInMB} MB`;
  };

  const handleDownload = async (reportId: number) => {
    const reportData = generatedReports.get(reportId);
    
    if (!reportData) {
      alert('Report data not found. Please regenerate the report.');
      return;
    }

    const { data, report } = reportData;
    
    // If it's a stored JSON report, download as JSON
    // Otherwise, regenerate and download as the requested format
    const reportType = report.reportType === 'Inventory Valuation' ? 'inventory-valuation' : 'low-stock';
    const format = report.format.toLowerCase();
    
    if (format === 'json' || !['pdf', 'xlsx', 'csv'].includes(format)) {
      // Download as JSON
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${report.reportName.replace(/\s+/g, '_')}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      // Regenerate and download as file
      try {
        const request = {
          reportType: reportType,
          startDate: (data as any).startDate || new Date().toISOString().split('T')[0],
          endDate: (data as any).endDate || new Date().toISOString().split('T')[0],
          format: format
        };
        await downloadReportFile(request);
      } catch (error: any) {
        alert('Error downloading report: ' + error.message);
      }
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportConfig.type) {
      alert('Please select a report type');
      return;
    }
    if (!reportConfig.startDate || !reportConfig.endDate) {
      alert('Please select both start and end dates');
      return;
    }

    try {
      setGenerating(true);
      // Handle Purchase Order Summary (frontend only for now)
      if (reportConfig.type === 'purchase-order') {
        alert('Purchase Order Summary report is coming soon. Backend integration will be added when B2B/B2C data is available.');
        setGenerating(false);
        return;
      }

      const request = {
        reportType: reportConfig.type as 'inventory-valuation' | 'low-stock',
        startDate: reportConfig.startDate,
        endDate: reportConfig.endDate,
        format: reportConfig.format
      };

      // Check if format is file type (PDF/XLSX/CSV) - download directly
      if (['pdf', 'xlsx', 'csv'].includes(reportConfig.format)) {
        await downloadReportFile(request);
      } else {
        // JSON format - get data and store
        const response = await reportService.generateReport(request);
        storeGeneratedReport(response, reportConfig.type);
      }
    } catch (error: any) {
      console.error('Error generating report:', error);
      alert(error.response?.data?.message || 'Error generating report. Please try again.');
    } finally {
      setGenerating(false);
    }
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
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
                disabled={generating}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileBarChart className="w-4 h-4" />
                {generating ? 'Generating...' : 'Generate Report'}
              </button>
              <button
                type="button"
                onClick={() => setReportConfig({ type: '', startDate: '', endDate: '', format: 'pdf' })}
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-neutral-600">
                    Loading recent reports...
                  </td>
                </tr>
              ) : recentReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-neutral-600">
                    No recent reports found
                  </td>
                </tr>
              ) : (
                recentReports.map((report) => (
                <tr key={report.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                    <td className="px-6 py-4">{report.reportName}</td>
                    <td className="px-6 py-4 text-neutral-600">{report.reportType}</td>
                    <td className="px-6 py-4 text-neutral-600">{report.generatedDate}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded text-xs">
                      {report.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{report.size}</td>
                  <td className="px-6 py-4">
                      <button 
                        onClick={() => handleDownload(report.id)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                      >
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
