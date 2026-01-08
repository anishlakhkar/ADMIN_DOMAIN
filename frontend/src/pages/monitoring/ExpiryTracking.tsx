import { useState } from "react";
import { Calendar, AlertTriangle, Filter } from "lucide-react";

export default function ExpiryTracking() {
  const [timeFilter, setTimeFilter] = useState("all");

  const expiryData = [
    {
      id: 1,
      batch: "BTH-2023-892",
      product: "Cough Syrup",
      sku: "MED-089",
      expiry: "2024-12-20",
      quantity: 30,
      warehouse: "Warehouse A",
      daysLeft: 9,
      status: "Critical",
    },
    {
      id: 2,
      batch: "BTH-2024-001",
      product: "Amoxicillin 500mg",
      sku: "MED-001",
      expiry: "2025-01-15",
      quantity: 200,
      warehouse: "Warehouse A",
      daysLeft: 35,
      status: "Expiring Soon",
    },
    {
      id: 3,
      batch: "BTH-2024-023",
      product: "Eye Drops",
      sku: "MED-056",
      expiry: "2025-01-28",
      quantity: 45,
      warehouse: "Warehouse B",
      daysLeft: 48,
      status: "Expiring Soon",
    },
    {
      id: 4,
      batch: "BTH-2024-045",
      product: "Insulin Glargine",
      sku: "MED-078",
      expiry: "2025-02-28",
      quantity: 50,
      warehouse: "Warehouse C",
      daysLeft: 79,
      status: "Monitor",
    },
    {
      id: 5,
      batch: "BTH-2024-067",
      product: "Antibiotic Cream",
      sku: "MED-034",
      expiry: "2025-03-15",
      quantity: 75,
      warehouse: "Warehouse A",
      daysLeft: 94,
      status: "Monitor",
    },
    {
      id: 6,
      batch: "BTH-2024-089",
      product: "Vitamin B Complex",
      sku: "SUP-023",
      expiry: "2025-04-10",
      quantity: 120,
      warehouse: "Warehouse B",
      daysLeft: 120,
      status: "Good",
    },
  ];

  const filteredData = expiryData.filter((item) => {
    if (timeFilter === "30") return item.daysLeft <= 30;
    if (timeFilter === "60") return item.daysLeft <= 60;
    if (timeFilter === "90") return item.daysLeft <= 90;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "Expiring Soon":
        return "bg-orange-100 text-orange-700";
      case "Monitor":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Expiry Tracking</h1>
        <p className="text-neutral-600 mt-1">
          Monitor batch expiry dates and prevent stock waste
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-2xl">
              {expiryData.filter((e) => e.status === "Critical").length}
            </div>
          </div>
          <div className="text-sm text-neutral-600">Critical (≤15 days)</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-2xl">
              {expiryData.filter((e) => e.status === "Expiring Soon").length}
            </div>
          </div>
          <div className="text-sm text-neutral-600">
            Expiring Soon (≤60 days)
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-2xl">
              {expiryData.filter((e) => e.status === "Monitor").length}
            </div>
          </div>
          <div className="text-sm text-neutral-600">Monitor (≤90 days)</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl">
              {expiryData.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
          </div>
          <div className="text-sm text-neutral-600">Total Units Tracked</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-neutral-600" />
          <h2>Filter by Expiry Window</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setTimeFilter("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeFilter === "all"
                ? "bg-blue-600 text-white"
                : "border border-neutral-300 hover:bg-neutral-50"
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setTimeFilter("30")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeFilter === "30"
                ? "bg-blue-600 text-white"
                : "border border-neutral-300 hover:bg-neutral-50"
            }`}
          >
            Within 30 Days
          </button>
          <button
            onClick={() => setTimeFilter("60")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeFilter === "60"
                ? "bg-blue-600 text-white"
                : "border border-neutral-300 hover:bg-neutral-50"
            }`}
          >
            Within 60 Days
          </button>
          <button
            onClick={() => setTimeFilter("90")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              timeFilter === "90"
                ? "bg-blue-600 text-white"
                : "border border-neutral-300 hover:bg-neutral-50"
            }`}
          >
            Within 90 Days
          </button>
        </div>
      </div>

      {/* Expiry Table */}
      <div className="bg-white rounded-lg border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <h2>Batch Expiry Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 sticky top-0">
              <tr>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">
                  Batch No
                </th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">
                  Product
                </th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">
                  SKU
                </th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">
                  Expiry Date
                </th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">
                  Days Left
                </th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">
                  Quantity
                </th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">
                  Warehouse
                </th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-sm text-neutral-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className={`border-t border-neutral-200 hover:bg-neutral-50 ${
                    item.status === "Critical" ? "bg-red-50/30" : ""
                  }`}
                >
                  <td className="px-6 py-4">{item.batch}</td>
                  <td className="px-6 py-4">{item.product}</td>
                  <td className="px-6 py-4 text-neutral-600">{item.sku}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      {item.expiry}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        item.daysLeft <= 15
                          ? "text-red-600"
                          : item.daysLeft <= 60
                          ? "text-orange-600"
                          : ""
                      }
                    >
                      {item.daysLeft} days
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4 text-neutral-600">
                    {item.warehouse}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.status === "Critical" && (
                      <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                        Mark for Clearance
                      </button>
                    )}
                    {item.status === "Expiring Soon" && (
                      <button className="px-3 py-1 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
                        Prioritize Sale
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-neutral-200 flex items-center justify-between">
          <div className="text-sm text-neutral-600">
            Showing {filteredData.length} of {expiryData.length} batches
          </div>
        </div>
      </div>
    </div>
  );
}
