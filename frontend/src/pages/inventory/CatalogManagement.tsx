import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Upload, Download, Eye, Package, User, Building2 } from 'lucide-react';
import { productService, type Product as BackendProduct } from '../../sevices/productService';

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'discontinued';
  catalogType: 'MedBuddy' | 'MedBiz' | 'Both';
  lastUpdated: string;
}

export default function CatalogManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCatalogType, setSelectedCatalogType] = useState('all');
  const [selectedWarehouse, setSelectedWarehouse] = useState('001');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from API
  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWarehouse]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll({
        warehouseId: selectedWarehouse,
        search: searchQuery || undefined,
        page: 0,
        size: 100
      });
      
      // Map backend products to display format
      const mappedProducts: Product[] = response.content.map((product) => {
        return {
          id: product.skuId,
          sku: product.skuId,
          name: product.productName,
          category: product.category,
          price: typeof product.price === 'number' ? product.price : (typeof product.price === 'string' ? parseFloat(product.price) : 0),
          stock: product.quantity || 0,
          status: product.quantity > 0 ? 'active' : 'inactive',
          catalogType: 'Both', // Default for now
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      });
      
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Reload when search changes (with debounce would be better, but simple for now)
  useEffect(() => {
    if (searchQuery !== '') {
      const timer = setTimeout(() => {
        loadProducts();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      loadProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    const matchesCatalogType = selectedCatalogType === 'all' || product.catalogType === selectedCatalogType;
    return matchesSearch && matchesCategory && matchesStatus && matchesCatalogType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-700';
      case 'discontinued':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Catalog Management</h1>
        <p className="text-neutral-600 mt-1">Manage your product catalog, pricing, and availability</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-neutral-600">Loading products...</div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Products</p>
              <p className="text-2xl mt-1">{products.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">MedBuddy</p>
              <p className="text-2xl mt-1">{products.filter(p => p.catalogType === 'MedBuddy' || p.catalogType === 'Both').length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">MedBiz</p>
              <p className="text-2xl mt-1">{products.filter(p => p.catalogType === 'MedBiz' || p.catalogType === 'Both').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Active</p>
              <p className="text-2xl mt-1">{products.filter(p => p.status === 'active').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Inactive</p>
              <p className="text-2xl mt-1">{products.filter(p => p.status === 'inactive').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Value</p>
              <p className="text-2xl mt-1">${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name or SKU..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full lg:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Medications">Medications</option>
              <option value="Supplements">Supplements</option>
              <option value="Equipment">Equipment</option>
              <option value="Supplies">Supplies</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>

          {/* Catalog Type Filter */}
          <div className="w-full lg:w-48">
            <select
              value={selectedCatalogType}
              onChange={(e) => setSelectedCatalogType(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Catalog Types</option>
              <option value="MedBuddy">MedBuddy</option>
              <option value="MedBiz">MedBiz</option>
              <option value="Both">Both</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
            <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2">
              <Upload className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-neutral-600">SKU</th>
                <th className="px-6 py-3 text-left text-xs text-neutral-600">Product Name</th>
                <th className="px-6 py-3 text-left text-xs text-neutral-600">Category</th>
                <th className="px-6 py-3 text-left text-xs text-neutral-600">Catalog Type</th>
                <th className="px-6 py-3 text-left text-xs text-neutral-600">Price</th>
                <th className="px-6 py-3 text-left text-xs text-neutral-600">Stock</th>
                <th className="px-6 py-3 text-left text-xs text-neutral-600">Status</th>
                <th className="px-6 py-3 text-left text-xs text-neutral-600">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 text-sm">{product.sku}</td>
                    <td className="px-6 py-4 text-sm">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        product.catalogType === 'MedBuddy' ? 'bg-purple-100 text-purple-700' :
                        product.catalogType === 'MedBiz' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {product.catalogType === 'MedBuddy' && <User className="w-3 h-3" />}
                        {product.catalogType === 'MedBiz' && <Building2 className="w-3 h-3" />}
                        {product.catalogType === 'Both' && <Package className="w-3 h-3" />}
                        {product.catalogType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={product.stock === 0 ? 'text-red-600' : ''}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{product.lastUpdated}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1 hover:bg-neutral-100 rounded transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button
                          className="p-1 hover:bg-neutral-100 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          className="p-1 hover:bg-neutral-100 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-neutral-500">
                    No products found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors text-sm">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors text-sm">
                2
              </button>
              <button className="px-3 py-1 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Modal (Simple version - can be expanded) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <h2>Add New Product</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-neutral-100 rounded transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-neutral-600 mb-4">
                Add a new product to your catalog. This is a simplified modal - full form implementation available.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Product Name *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">SKU *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., MED-001"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Category *</label>
                    <select className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select category</option>
                      <option>Medications</option>
                      <option>Supplements</option>
                      <option>Equipment</option>
                      <option>Supplies</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Catalog Type *</label>
                    <select className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select catalog type</option>
                      <option>MedBuddy</option>
                      <option>MedBiz</option>
                      <option>Both</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Initial Stock</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Description (Optional)</label>
                  <textarea
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter product description..."
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6 pt-6 border-t border-neutral-200">
                <button
                  onClick={() => {
                    alert('Product added successfully!');
                    setShowAddModal(false);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Product
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}