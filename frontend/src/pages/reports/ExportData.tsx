import { useState } from 'react';
import { Download } from 'lucide-react';
import { reportService, type ExportRequest } from '../../sevices/reportService';

export default function ExportData() {
  const [exportConfig, setExportConfig] = useState<ExportRequest>({
    exportType: 'full-inventory',
    format: 'csv' as 'pdf' | 'xlsx' | 'csv',
    warehouseId: undefined
    // startDate and endDate are optional - backend will export all data if not provided
  });
  const [exporting, setExporting] = useState(false);

  const dataTypes = [
    { value: 'full-inventory', label: 'Full Inventory Data', description: 'All products with stock levels' },
    { value: 'low-stock', label: 'Low Stock Items', description: 'Items below minimum threshold' },
    { value: 'expiry-data', label: 'Expiry Data', description: 'Batch expiry information' },
    { value: 'purchase-orders', label: 'Purchase Orders', description: 'PO history and status (Backend coming soon)' }
  ];

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exportConfig.exportType) {
      alert('Please select data type to export');
      return;
    }

    try {
      setExporting(true);
      
      // Handle Purchase Orders (backend not ready)
      if (exportConfig.exportType === 'purchase-orders') {
        alert('Purchase Orders export will be available when PO backend is implemented.');
        setExporting(false);
        return;
      }

      // Call export API (no date range - backend will export all data)
      const blob = await reportService.exportData(exportConfig);
      
      // Generate filename based on export type
      const exportTypeNames: Record<string, string> = {
        'full-inventory': 'Full_Inventory',
        'low-stock': 'Low_Stock',
        'expiry-data': 'Expiry_Data',
        'purchase-orders': 'Purchase_Orders'
      };
      
      const fileName = `${exportTypeNames[exportConfig.exportType]}_All_Data.${exportConfig.format}`;
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      alert(`Export downloaded successfully!\n\nFile: ${fileName}`);
      
      // Reset form
      setExportConfig({
        exportType: 'full-inventory',
        format: 'csv',
        warehouseId: undefined
      });
    } catch (error: any) {
      console.error('Error exporting data:', error);
      
      // Handle blob error response
      let errorMessage = 'Error exporting data. Please try again.';
      if (error.response?.data) {
        if (error.response.data instanceof Blob) {
          try {
            const text = await error.response.data.text();
            const errorJson = JSON.parse(text);
            errorMessage = errorJson.message || errorMessage;
          } catch {
            errorMessage = error.message || errorMessage;
          }
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setExporting(false);
    }
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                {dataTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      exportConfig.exportType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-neutral-300 hover:border-blue-300 hover:bg-neutral-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportType"
                      value={type.value}
                      checked={exportConfig.exportType === type.value}
                      onChange={(e) => setExportConfig({ ...exportConfig, exportType: e.target.value as any })}
                      className="mt-1"
                    />
                    <div>
                      <div className="text-sm font-medium">{type.label}</div>
                      <div className="text-xs text-neutral-600 mt-1">{type.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Export Format */}
            <div>
              <label className="block text-sm mb-3">Export Format *</label>
              <div className="flex flex-wrap gap-3">
                <label className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                  exportConfig.format === 'pdf' ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 hover:bg-neutral-50'
                }`}>
                  <input
                    type="radio"
                    name="exportFormat"
                    value="pdf"
                    checked={exportConfig.format === 'pdf'}
                    onChange={(e) => setExportConfig({ ...exportConfig, format: e.target.value as any })}
                  />
                  <span className="text-sm">PDF</span>
                </label>

                <label className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                  exportConfig.format === 'xlsx' ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 hover:bg-neutral-50'
                }`}>
                  <input
                    type="radio"
                    name="exportFormat"
                    value="xlsx"
                    checked={exportConfig.format === 'xlsx'}
                    onChange={(e) => setExportConfig({ ...exportConfig, format: e.target.value as any })}
                  />
                  <span className="text-sm">Excel (XLSX)</span>
                </label>

                <label className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                  exportConfig.format === 'csv' ? 'border-blue-500 bg-blue-50' : 'border-neutral-300 hover:bg-neutral-50'
                }`}>
                  <input
                    type="radio"
                    name="exportFormat"
                    value="csv"
                    checked={exportConfig.format === 'csv'}
                    onChange={(e) => setExportConfig({ ...exportConfig, format: e.target.value as any })}
                  />
                  <span className="text-sm">CSV</span>
                </label>
              </div>
            </div>

            {/* Note about all data */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This export will include all available data regardless of date range.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-neutral-200">
              <button
                type="submit"
                disabled={exporting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                {exporting ? 'Exporting...' : 'Export Now'}
              </button>
              <button
                type="button"
                onClick={() => setExportConfig({
                  exportType: 'full-inventory',
                  format: 'csv',
                  warehouseId: undefined
                })}
                className="px-6 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
