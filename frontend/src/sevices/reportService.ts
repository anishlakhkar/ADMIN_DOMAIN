import api from './api';

// Report Request
export interface ReportRequest {
  reportType: 'inventory-valuation' | 'low-stock';
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  format: 'pdf' | 'xlsx' | 'csv';
}

// Inventory Valuation Report Response
export interface InventoryValuationReportResponse {
  reportName: string;
  generatedDate: string;
  startDate: string;
  endDate: string;
  format: string;
  totalValuation: number | string;
  warehouseValuations: WarehouseValuation[];
  productValuations: ProductValuation[];
}

export interface WarehouseValuation {
  warehouseId: string;
  warehouseName: string;
  totalProducts: number;
  totalQuantity: number;
  totalValue: number | string;
}

export interface ProductValuation {
  skuId: string;
  productName: string;
  category: string;
  warehouseId: string;
  quantity: number;
  unitPrice: number | string;
  totalValue: number | string;
}

// Low Stock Report Response
export interface LowStockReportResponse {
  reportName: string;
  generatedDate: string;
  startDate: string;
  endDate: string;
  format: string;
  totalLowStockItems: number;
  lowStockItems: LowStockItem[];
}

export interface LowStockItem {
  skuId: string;
  productName: string;
  category: string;
  warehouseId: string;
  warehouseName: string;
  currentStock: number;
  threshold: number;
  shortage: number;
  daysUntilOut: number;
  priority: string;
}

// Recent Report Response
export interface RecentReportResponse {
  id: number;
  reportName: string;
  reportType: string;
  generatedDate: string;
  format: string;
  size: string;
  downloadUrl: string;
}

export const reportService = {
  /**
   * Generate a report
   */
  generateReport: async (request: ReportRequest): Promise<InventoryValuationReportResponse | LowStockReportResponse> => {
    const response = await api.post<InventoryValuationReportResponse | LowStockReportResponse>(
      '/reports/generate',
      request
    );
    return response.data;
  },

  /**
   * Get recent reports
   */
  getRecentReports: async (): Promise<RecentReportResponse[]> => {
    const response = await api.get<RecentReportResponse[]>('/reports/recent');
    return response.data;
  },
};
