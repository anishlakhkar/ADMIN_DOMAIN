import { useState } from 'react';
import { Filter, Download } from 'lucide-react';

export default function StockLevels() {
  const [filters, setFilters] = useState({
    warehouse: 'all',
    category: 'all',
    status: 'all'
  });

  const stockData = [
    { id: 1, name: 'Amoxicillin 500mg', sku: 'MED-001', category: 'Medications', stock: 450, min: 100, max: 1000, warehouse: 'Warehouse A', status: 'Optimal' },
    { id: 2, name: 'Ibuprofen 200mg', sku: 'MED-002', category: 'Medications', stock: 120, min: 200, max: 800, warehouse: 'Warehouse B', status: 'Below Min' },
    { id: 3, name: 'Paracetamol 500mg', sku: 'MED-003', category: 'Medications', stock: 890, min: 150, max: 1000, warehouse: 'Warehouse A', status: 'Optimal' },
    { id: 4, name: 'Aspirin 75mg', sku: 'MED-004', category: 'Medications', stock: 45, min: 100, max: 500, warehouse: 'Warehouse C', status: 'Critical' },
    { id: 5, name: 'Metformin 850mg', sku: 'MED-005', category: 'Medications', stock: 320, min: 200, max: 800, warehouse: 'Warehouse B', status: 'Optimal' },
    { id: 6, name: 'Vitamin C 1000mg', sku: 'SUP-001', category: 'Supplements', stock: 580, min: 150, max: 750, warehouse: 'Warehouse A', status: 'Optimal' },
    { id: 7, name: 'Vitamin D3 1000IU', sku: 'SUP-012', category: 'Supplements', stock: 78, min: 150, max: 600, warehouse: 'Warehouse A', status: 'Below Min' },
    { id: 8, name: 'Blood Pressure Monitor', sku: 'EQ-003', category: 'Equipment', stock: 25, min: 20, max: 50, warehouse: 'Warehouse C', status: 'Optimal' }
  ];

  const filteredData = stockData.filter(item => {
    if (filters.warehouse !== 'all' && item.warehouse !== filters.warehouse) return false;
    if (filters.category !== 'all' && item.category !== filters.category) return false;
    if (filters.status !== 'all' && item.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1>View Stock Levels</h1>
        <p className="text-neutral-600 mt-1">Monitor current stock levels across all warehouses</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="text-2xl mb-1">{stockData.length}</div>
          <div className="text-sm text-neutral-600">Total SKUs</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="text-2xl mb-1 text-green-600">{stockData.filter(s => s.status === 'Optimal').length}</div>
          <div className="text-sm text-neutral-600">Optimal Stock</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="text-2xl mb-1 text-orange-600">{stockData.filter(s => s.status === 'Below Min').length}</div>
          <div className="text-sm text-neutral-600">Below Minimum</div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="text-2xl mb-1 text-red-600">{stockData.filter(s => s.status === 'Critical').length}</div>
          <div className="text-sm text-neutral-600">Critical</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-neutral-600" />
              <h2>Filters</h2>
            </div>
            <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <select
              value={filters.warehouse}
              onChange={(e) => setFilters({ ...filters, warehouse: e.target.value })}
              className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Warehouses</option>
              <option value="Warehouse A">Warehouse A</option>
              <option value="Warehouse B">Warehouse B</option>
              <option value="Warehouse C">Warehouse C</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Medications">Medications</option>
              <option value="Supplements">Supplements</option>
              <option value="Equipment">Equipment</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Optimal">Optimal</option>
              <option value="Below Min">Below Min</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Stock Levels Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 sticky top-0">
              <tr>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Product Name</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">SKU</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Category</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Current Stock</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Min / Max</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Warehouse</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4 text-neutral-600">{item.sku}</td>
                  <td className="px-6 py-4 text-neutral-600">{item.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span>{item.stock}</span>
                      <div className="flex-1 max-w-[100px] h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            item.status === 'Critical' ? 'bg-red-500' :
                            item.status === 'Below Min' ? 'bg-orange-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((item.stock / item.max) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{item.min} / {item.max}</td>
                  <td className="px-6 py-4 text-neutral-600">{item.warehouse}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Optimal' ? 'bg-green-100 text-green-700' :
                      item.status === 'Below Min' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-neutral-200 flex items-center justify-between">
          <div className="text-sm text-neutral-600">Showing {filteredData.length} of {stockData.length} items</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
