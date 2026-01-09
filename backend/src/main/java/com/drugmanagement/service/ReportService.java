package com.drugmanagement.service;

import com.drugmanagement.dto.InventoryValuationReportResponse;
import com.drugmanagement.dto.LowStockReportResponse;
import com.drugmanagement.dto.RecentReportResponse;
import com.drugmanagement.entity.Product;
import com.drugmanagement.entity.ProductBatch;
import com.drugmanagement.repository.ProductBatchRepository;
import com.drugmanagement.repository.ProductRepository;
import com.drugmanagement.repository.WarehouseRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class ReportService {
    
    @Inject
    ProductRepository productRepository;
    
    @Inject
    ProductBatchRepository productBatchRepository;
    
    @Inject
    WarehouseRepository warehouseRepository;
    
    /**
     * Generate Inventory Valuation Report
     * Date range filters products that have batches expiring within the date range
     */
    public InventoryValuationReportResponse generateInventoryValuationReport(
            LocalDate startDate, LocalDate endDate, String format) {
        
        InventoryValuationReportResponse response = new InventoryValuationReportResponse();
        
        // Get all products from all warehouses
        List<Product> allProducts = productRepository.listAll();
        
        // Filter by date range: Only include products that have batches expiring within the date range
        if (startDate != null && endDate != null) {
            final Set<String> productSkuIdsInDateRange = productBatchRepository.listAll().stream()
                .filter(batch -> !batch.getExpiry().isBefore(startDate) && !batch.getExpiry().isAfter(endDate))
                .map(ProductBatch::getSkuId)
                .collect(Collectors.toSet());
            
            // Filter products to only those with batches in date range
            allProducts = allProducts.stream()
                .filter(p -> productSkuIdsInDateRange.contains(p.getSkuId()))
                .collect(Collectors.toList());
        }
        
        // Calculate total valuation
        BigDecimal totalValuation = allProducts.stream()
            .map(p -> p.getPrice().multiply(new BigDecimal(p.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        // Group by warehouse
        Map<String, List<Product>> productsByWarehouse = allProducts.stream()
            .collect(Collectors.groupingBy(Product::getWarehouseId));
        
        List<InventoryValuationReportResponse.WarehouseValuation> warehouseValuations = new ArrayList<>();
        
        for (Map.Entry<String, List<Product>> entry : productsByWarehouse.entrySet()) {
            String warehouseId = entry.getKey();
            List<Product> products = entry.getValue();
            
            String warehouseName = "Warehouse " + warehouseId;
            
            Long totalProducts = (long) products.size();
            Long totalQuantity = products.stream()
                .mapToLong(Product::getQuantity)
                .sum();
            
            BigDecimal warehouseValue = products.stream()
                .map(p -> p.getPrice().multiply(new BigDecimal(p.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            warehouseValuations.add(new InventoryValuationReportResponse.WarehouseValuation(
                warehouseId, warehouseName, totalProducts, totalQuantity, warehouseValue
            ));
        }
        
        // Create product valuations list
        List<InventoryValuationReportResponse.ProductValuation> productValuations = allProducts.stream()
            .map(p -> new InventoryValuationReportResponse.ProductValuation(
                p.getSkuId(),
                p.getProductName(),
                p.getCategory().name(),
                p.getWarehouseId(),
                p.getQuantity(),
                p.getPrice(),
                p.getPrice().multiply(new BigDecimal(p.getQuantity()))
            ))
            .collect(Collectors.toList());
        
        // Set response data
        response.setReportName("Inventory Valuation Report - " + 
            startDate.format(DateTimeFormatter.ofPattern("MMM yyyy")));
        response.setGeneratedDate(LocalDate.now().toString());
        response.setStartDate(startDate);
        response.setEndDate(endDate);
        response.setFormat(format.toUpperCase());
        response.setTotalValuation(totalValuation);
        response.setWarehouseValuations(warehouseValuations);
        response.setProductValuations(productValuations);
        
        return response;
    }
    
    /**
     * Generate Low Stock Report
     * Date range filters products that have batches expiring within the date range
     */
    public LowStockReportResponse generateLowStockReport(
            LocalDate startDate, LocalDate endDate, String format) {
        
        LowStockReportResponse response = new LowStockReportResponse();
        
        // Get all products
        List<Product> allProducts = productRepository.listAll();
        
        // Filter by date range: Only include products that have batches expiring within the date range
        if (startDate != null && endDate != null) {
            final Set<String> productSkuIdsInDateRange = productBatchRepository.listAll().stream()
                .filter(batch -> !batch.getExpiry().isBefore(startDate) && !batch.getExpiry().isAfter(endDate))
                .map(ProductBatch::getSkuId)
                .collect(Collectors.toSet());
            
            // Filter products to only those with batches in date range
            allProducts = allProducts.stream()
                .filter(p -> productSkuIdsInDateRange.contains(p.getSkuId()))
                .collect(Collectors.toList());
        }
        
        // Filter low stock items (quantity < threshold)
        List<LowStockReportResponse.LowStockItem> lowStockItems = allProducts.stream()
            .filter(p -> p.getQuantity() < p.getThresholdQuantity())
            .map(p -> {
                String warehouseName = "Warehouse " + p.getWarehouseId();
                
                Long shortage = p.getThresholdQuantity() - p.getQuantity();
                
                // Calculate days until out (simple estimation)
                Long daysUntilOut = calculateDaysUntilOut(p);
                
                // Calculate priority
                String priority = calculatePriority(p, daysUntilOut);
                
                return new LowStockReportResponse.LowStockItem(
                    p.getSkuId(),
                    p.getProductName(),
                    p.getCategory().name(),
                    p.getWarehouseId(),
                    warehouseName,
                    p.getQuantity(),
                    p.getThresholdQuantity(),
                    shortage,
                    daysUntilOut,
                    priority
                );
            })
            .collect(Collectors.toList());
        
        // Set response data
        response.setReportName("Low Stock Report - " + 
            startDate.format(DateTimeFormatter.ofPattern("MMM yyyy")));
        response.setGeneratedDate(LocalDate.now().toString());
        response.setStartDate(startDate);
        response.setEndDate(endDate);
        response.setFormat(format.toUpperCase());
        response.setTotalLowStockItems((long) lowStockItems.size());
        response.setLowStockItems(lowStockItems);
        
        return response;
    }
    
    /**
     * Get recent reports
     * Currently returns empty list as reports are generated on-demand and not stored
     * In future, this can be enhanced to store report history in database
     */
    public List<RecentReportResponse> getRecentReports() {
        // Reports are generated on-demand from current inventory data
        // No historical report storage exists yet
        // Return empty list - only show reports that have actually been generated
        return new ArrayList<>();
    }
    
    /**
     * Calculate estimated days until stock runs out
     */
    private Long calculateDaysUntilOut(Product product) {
        Long quantity = product.getQuantity();
        Long threshold = product.getThresholdQuantity();
        
        if (quantity == 0) {
            return 0L;
        }
        
        // Simple estimation: if stock is 50% of threshold, assume it will last 15 days
        double ratio = (double) quantity / threshold;
        return Math.max(1L, (long) (ratio * 30));
    }
    
    /**
     * Calculate priority based on stock level and days until out
     */
    private String calculatePriority(Product product, Long daysUntilOut) {
        Long quantity = product.getQuantity();
        Long threshold = product.getThresholdQuantity();
        double percentage = (double) quantity / threshold;
        
        if (percentage < 0.3 || daysUntilOut <= 7) {
            return "Critical";
        } else if (percentage < 0.6 || daysUntilOut <= 14) {
            return "High";
        } else {
            return "Medium";
        }
    }
}
