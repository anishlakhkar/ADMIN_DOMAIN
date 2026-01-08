import { AlertTriangle, Package, TrendingDown } from 'lucide-react';

export default function LowStockAlerts() {
  const alerts = [
    { id: 1, product: 'Aspirin 75mg', sku: 'MED-004', current: 45, threshold: 100, warehouse: 'Warehouse C', daysUntilOut: 3, priority: 'Critical' },
    { id: 2, product: 'Ibuprofen 200mg', sku: 'MED-002', current: 120, threshold: 200, warehouse: 'Warehouse B', daysUntilOut: 8, priority: 'High' },
    { id: 3, product: 'Vitamin D3 1000IU', sku: 'SUP-012', current: 78, threshold: 150, warehouse: 'Warehouse A', daysUntilOut: 12, priority: 'Medium' },
    { id: 4, product: 'Band-Aids 100ct', sku: 'SUP-045', current: 92, threshold: 180, warehouse: 'Warehouse B', daysUntilOut: 15, priority: 'Medium' },
    { id: 5, product: 'Thermometer Digital', sku: 'EQ-012', current: 8, threshold: 25, warehouse: 'Warehouse C', daysUntilOut: 5, priority: 'Critical' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Low Stock Alerts</h1>
        <p className="text-neutral-600 mt-1">Items requiring immediate attention</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-2xl">{alerts.filter(a => a.priority === 'Critical').length}</div>
          </div>
          <div className="text-sm text-neutral-600">Critical Alerts</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-2xl">{alerts.filter(a => a.priority === 'High').length}</div>
          </div>
          <div className="text-sm text-neutral-600">High Priority</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl">{alerts.length}</div>
          </div>
          <div className="text-sm text-neutral-600">Total Alerts</div>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={`bg-white rounded-lg border-2 p-6 ${getPriorityColor(alert.priority)}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  alert.priority === 'Critical' ? 'bg-red-200' :
                  alert.priority === 'High' ? 'bg-orange-200' :
                  'bg-yellow-200'
                }`}>
                  <AlertTriangle className={`w-6 h-6 ${
                    alert.priority === 'Critical' ? 'text-red-700' :
                    alert.priority === 'High' ? 'text-orange-700' :
                    'text-yellow-700'
                  }`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg">{alert.product}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      alert.priority === 'Critical' ? 'bg-red-600 text-white' :
                      alert.priority === 'High' ? 'bg-orange-600 text-white' :
                      'bg-yellow-600 text-white'
                    }`}>
                      {alert.priority}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-neutral-600">SKU</div>
                      <div>{alert.sku}</div>
                    </div>
                    <div>
                      <div className="text-neutral-600">Current Stock</div>
                      <div>{alert.current} units</div>
                    </div>
                    <div>
                      <div className="text-neutral-600">Threshold</div>
                      <div>{alert.threshold} units</div>
                    </div>
                    <div>
                      <div className="text-neutral-600">Warehouse</div>
                      <div>{alert.warehouse}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <TrendingDown className="w-4 h-4" />
                    <span>Estimated {alert.daysUntilOut} days until out of stock</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-neutral-600 mb-1">
                      <span>Stock Level</span>
                      <span>{Math.round((alert.current / alert.threshold) * 100)}% of threshold</span>
                    </div>
                    <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          alert.priority === 'Critical' ? 'bg-red-600' :
                          alert.priority === 'High' ? 'bg-orange-600' :
                          'bg-yellow-600'
                        }`}
                        style={{ width: `${Math.min((alert.current / alert.threshold) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Generate PO
                </button>
                <button className="px-4 py-2 border border-neutral-300 bg-white rounded-lg hover:bg-neutral-50 transition-colors whitespace-nowrap">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="mb-4">Bulk Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate PO for All Critical
          </button>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Generate PO for All High Priority
          </button>
          <button className="px-6 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
            Export Alert Report
          </button>
        </div>
      </div>
    </div>
  );
}
