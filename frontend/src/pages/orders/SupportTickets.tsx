import { Building2, CheckCircle, Clock, Eye, Filter, MessageSquare, Send, User, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function SupportTickets() {
  const [tickets, setTickets] = useState([
    { id: 1, ticketNumber: 'TKT-2024-1001', type: 'MedBuddy', customerName: 'John Smith', subject: 'Prescription Validation Issue', priority: 'High', status: 'Open', created: '2024-12-18 10:30', lastUpdate: '2024-12-18 14:20', assignedTo: 'Sarah Johnson' },
    { id: 2, ticketNumber: 'TKT-2024-1002', type: 'MedBiz', customerName: 'HealthCare Corp', subject: 'Bulk Order Delivery Delay', priority: 'Critical', status: 'Open', created: '2024-12-18 09:15', lastUpdate: '2024-12-18 15:45', assignedTo: 'Michael Chen' },
    { id: 3, ticketNumber: 'TKT-2024-1003', type: 'MedBuddy', customerName: 'Emily Davis', subject: 'Product Return Request', priority: 'Medium', status: 'In Progress', created: '2024-12-17 16:45', lastUpdate: '2024-12-18 11:30', assignedTo: 'Sarah Johnson' },
    { id: 4, ticketNumber: 'TKT-2024-1004', type: 'MedBiz', customerName: 'MediCare Pharmacy Chain', subject: 'Payment Terms Clarification', priority: 'Low', status: 'In Progress', created: '2024-12-17 14:20', lastUpdate: '2024-12-18 09:10', assignedTo: 'Robert Wilson' },
    { id: 5, ticketNumber: 'TKT-2024-1005', type: 'MedBuddy', customerName: 'David Brown', subject: 'Wrong Product Delivered', priority: 'High', status: 'Open', created: '2024-12-18 08:00', lastUpdate: '2024-12-18 12:15', assignedTo: 'Emily Davis' },
    { id: 6, ticketNumber: 'TKT-2024-1006', type: 'MedBiz', customerName: 'PharmaDist Ltd', subject: 'Regulatory Document Update', priority: 'Medium', status: 'Resolved', created: '2024-12-16 11:30', lastUpdate: '2024-12-17 16:00', assignedTo: 'Michael Chen' },
    { id: 7, ticketNumber: 'TKT-2024-1007', type: 'MedBuddy', customerName: 'Lisa Anderson', subject: 'Refund Request', priority: 'Medium', status: 'Resolved', created: '2024-12-16 13:45', lastUpdate: '2024-12-17 10:20', assignedTo: 'Sarah Johnson' },
    { id: 8, ticketNumber: 'TKT-2024-1008', type: 'MedBiz', customerName: 'BioHealth Distributors', subject: 'Contract Renewal Discussion', priority: 'Low', status: 'Closed', created: '2024-12-15 10:00', lastUpdate: '2024-12-16 14:30', assignedTo: 'Robert Wilson' }
  ]);

  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleResolve = (id: number) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));
    alert('Ticket marked as resolved');
  };

  const handleClose = (id: number) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'Closed' } : t));
    alert('Ticket closed');
  };

  const handleSendResponse = () => {
    if (!responseMessage.trim()) {
      alert('Please enter a response message');
      return;
    }
    alert('Response sent to customer');
    setResponseMessage('');
    setShowTicketModal(false);
  };

  const filteredTickets = tickets.filter(ticket => {
    if (typeFilter !== 'all' && ticket.type !== typeFilter) return false;
    if (statusFilter !== 'all' && ticket.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && ticket.priority !== priorityFilter) return false;
    return true;
  });

  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;
  const criticalTickets = tickets.filter(t => t.priority === 'Critical').length;
  const medBuddyTickets = tickets.filter(t => t.type === 'MedBuddy' && t.status !== 'Closed').length;
  const medBizTickets = tickets.filter(t => t.type === 'MedBiz' && t.status !== 'Closed').length;

  return (
    <div className="space-y-6">
      <div>
        <h1>Support Tickets</h1>
        <p className="text-neutral-600 mt-1">Manage customer support tickets for MedBuddy and MedBiz</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-2xl">{openTickets}</div>
          </div>
          <div className="text-sm text-neutral-600">Open Tickets</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl">{inProgressTickets}</div>
          </div>
          <div className="text-sm text-neutral-600">In Progress</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-2xl">{criticalTickets}</div>
          </div>
          <div className="text-sm text-neutral-600">Critical Priority</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl">{medBuddyTickets}</div>
          </div>
          <div className="text-sm text-neutral-600">MedBuddy (B2C)</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl">{medBizTickets}</div>
          </div>
          <div className="text-sm text-neutral-600">MedBiz (B2B)</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-neutral-600" />
          <h2>Filters</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="MedBuddy">MedBuddy (B2C)</option>
            <option value="MedBiz">MedBiz (B2B)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {(typeFilter !== 'all' || statusFilter !== 'all' || priorityFilter !== 'all') && (
            <button
              onClick={() => {
                setTypeFilter('all');
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
              className="px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <h2>Support Tickets ({filteredTickets.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 sticky top-0">
              <tr>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Ticket #</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Type</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Customer</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Subject</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Priority</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Status</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Assigned To</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Created</th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                  <td className="px-6 py-4">{ticket.ticketNumber}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                      ticket.type === 'MedBuddy' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {ticket.type === 'MedBuddy' ? <User className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                      {ticket.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">{ticket.customerName}</td>
                  <td className="px-6 py-4">{ticket.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      ticket.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      ticket.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      ticket.status === 'Open' ? 'bg-orange-100 text-orange-700' :
                      ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                      'bg-neutral-100 text-neutral-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{ticket.assignedTo}</td>
                  <td className="px-6 py-4 text-neutral-600">{ticket.created}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewTicket(ticket)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {ticket.status !== 'Resolved' && ticket.status !== 'Closed' && (
                        <button
                          onClick={() => handleResolve(ticket.id)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Mark as Resolved"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {ticket.status === 'Resolved' && (
                        <button
                          onClick={() => handleClose(ticket.id)}
                          className="p-1 text-neutral-600 hover:bg-neutral-50 rounded transition-colors"
                          title="Close Ticket"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-neutral-200 flex items-center justify-between">
          <div className="text-sm text-neutral-600">
            Showing {filteredTickets.length} of {tickets.length} tickets
          </div>
        </div>
      </div>

      {/* Ticket Detail Modal */}
      {showTicketModal && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2>{selectedTicket.ticketNumber}</h2>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedTicket.type === 'MedBuddy' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {selectedTicket.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedTicket.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    selectedTicket.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    selectedTicket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedTicket.priority}
                  </span>
                </div>
                <p className="text-neutral-600">{selectedTicket.subject}</p>
              </div>
              <button
                onClick={() => setShowTicketModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Ticket Details */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-neutral-600 mb-1">Customer</div>
                  <div>{selectedTicket.customerName}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-600 mb-1">Status</div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedTicket.status === 'Open' ? 'bg-orange-100 text-orange-700' :
                    selectedTicket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    selectedTicket.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                    'bg-neutral-100 text-neutral-700'
                  }`}>
                    {selectedTicket.status}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-neutral-600 mb-1">Assigned To</div>
                  <div>{selectedTicket.assignedTo}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-600 mb-1">Created</div>
                  <div>{selectedTicket.created}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-600 mb-1">Last Updated</div>
                  <div>{selectedTicket.lastUpdate}</div>
                </div>
              </div>

              {/* Ticket Description/History */}
              <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
                <div className="text-sm mb-2">
                  <strong>Customer Message:</strong>
                </div>
                <p className="text-neutral-700">
                  {selectedTicket.type === 'MedBuddy' 
                    ? "I have been trying to upload my prescription for the past 2 hours but the system keeps giving me an error. I need this medication urgently. Can you please help?"
                    : "We placed a bulk order for 5000 units last week (PO-2024-0987) and the expected delivery date was today. However, we haven't received any update on the shipment status. This is causing major disruptions to our pharmacy operations."}
                </p>
              </div>
            </div>

            {/* Response Section */}
            <div className="border-t border-neutral-200 pt-6">
              <label className="block text-sm mb-2">Send Response</label>
              <textarea
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                rows={4}
                placeholder="Type your response to the customer..."
              />

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowTicketModal(false);
                    setResponseMessage('');
                  }}
                  className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                {selectedTicket.status !== 'Resolved' && selectedTicket.status !== 'Closed' && (
                  <button
                    onClick={() => handleResolve(selectedTicket.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark as Resolved
                  </button>
                )}
                <button
                  onClick={handleSendResponse}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
