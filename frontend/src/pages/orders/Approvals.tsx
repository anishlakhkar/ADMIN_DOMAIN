import { useState } from 'react';
import { Check, X, Eye, AlertCircle } from 'lucide-react';

export default function Approvals() {
  const [orders, setOrders] = useState([
    { id: 1, poNumber: 'PO-2024-1001', supplier: 'MedSupply Inc.', amount: 15750.00, items: 5, requestedBy: 'John Smith', date: '2024-12-10', status: 'Pending' },
    { id: 2, poNumber: 'PO-2024-1002', supplier: 'PharmaCorp', amount: 28900.00, items: 8, requestedBy: 'Sarah Johnson', date: '2024-12-10', status: 'Pending' },
    { id: 3, poNumber: 'PO-2024-1003', supplier: 'HealthDist Ltd.', amount: 12340.00, items: 3, requestedBy: 'Michael Chen', date: '2024-12-09', status: 'Pending' },
    { id: 4, poNumber: 'PO-2024-1004', supplier: 'BioHealth Co.', amount: 45200.00, items: 12, requestedBy: 'Emily Davis', date: '2024-12-09', status: 'Approved' },
    { id: 5, poNumber: 'PO-2024-1005', supplier: 'MedSupply Inc.', amount: 8900.00, items: 4, requestedBy: 'Robert Wilson', date: '2024-12-08', status: 'Rejected' }
  ]);

  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectId, setRejectId] = useState<number | 'bulk' | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = (id: number) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'Approved' } : o));
    alert('Purchase Order approved successfully');
  };

  const handleReject = (id: number) => {
    setRejectId(id);
    setShowRejectModal(true);
  };

  const handleBulkApprove = () => {
    if (selectedOrders.length === 0) {
      alert('Please select orders to approve');
      return;
    }
    setOrders(orders.map(o => selectedOrders.includes(o.id) ? { ...o, status: 'Approved' } : o));
    setSelectedOrders([]);
    alert(`${selectedOrders.length} purchase order(s) approved`);
  };

  const handleBulkReject = () => {
    if (selectedOrders.length === 0) {
      alert('Please select orders to reject');
      return;
    }
    setRejectId('bulk');
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    if (rejectId === 'bulk') {
      setOrders(orders.map(o => selectedOrders.includes(o.id) ? { ...o, status: 'Rejected' } : o));
      setSelectedOrders([]);
      alert(`${selectedOrders.length} purchase order(s) rejected`);
    } else if (rejectId !== null) {
      setOrders(orders.map(o => o.id === rejectId ? { ...o, status: 'Rejected' } : o));
      alert('Purchase Order rejected');
    }

    setShowRejectModal(false);
    setRejectReason('');
    setRejectId(null);
  };

  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const totalPendingAmount = pendingOrders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1>Purchase Order Approvals</h1>
        <p className="text-neutral-600 mt-1">Review and approve pending purchase orders</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-2xl">{pendingOrders.length}</div>
          </div>
          <div className="text-sm text-neutral-600">Pending Approval</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl">${totalPendingAmount.toLocaleString()}</div>
          </div>
          <div className="text-sm text-neutral-600">Total Pending Value</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl">{orders.filter(o => o.status === 'Approved').length}</div>
          </div>
          <div className="text-sm text-neutral-600">Approved Today</div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-600">
            {selectedOrders.length} order(s) selected
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleBulkApprove}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Approve Selected
            </button>
            <button
              onClick={handleBulkReject}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Reject Selected
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <h2>Approval Queue</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrders(pendingOrders.map(o => o.id));
                      } else {
                        setSelectedOrders([]);
                      }
                    }}
                    checked={selectedOrders.length === pendingOrders.length && pendingOrders.length > 0}
                    className="w-4 h-4"
                  />
                </th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">PO Number</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Supplier</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Amount</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Items</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Requested By</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Date</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Status</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    {order.status === 'Pending' && (
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOrders([...selectedOrders, order.id]);
                          } else {
                            setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                          }
                        }}
                        className="w-4 h-4"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">{order.poNumber}</td>
                  <td className="px-6 py-4">{order.supplier}</td>
                  <td className="px-6 py-4">${order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">{order.items}</td>
                  <td className="px-6 py-4 text-neutral-600">{order.requestedBy}</td>
                  <td className="px-6 py-4 text-neutral-600">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      order.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      {order.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(order.id)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(order.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-neutral-200 flex items-center justify-between">
          <div className="text-sm text-neutral-600">Showing {orders.length} orders</div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg">Reject Purchase Order</h3>
                <p className="text-sm text-neutral-600">Please provide a reason</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Rejection Reason *</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="e.g., Budget exceeded, unauthorized request, duplicate order..."
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                  setRejectId(null);
                }}
                className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
