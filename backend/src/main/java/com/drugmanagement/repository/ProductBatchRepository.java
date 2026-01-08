package com.drugmanagement.repository;

import com.drugmanagement.entity.ProductBatch;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class ProductBatchRepository implements PanacheRepository<ProductBatch> {
    
    public Optional<ProductBatch> findByBatchIdAndWarehouseId(String batchId, String warehouseId) {
        return find("batchId = ?1 AND warehouseId = ?2", batchId, warehouseId).firstResultOptional();
    }
    
    public List<ProductBatch> findBySkuIdAndWarehouseId(String skuId, String warehouseId) {
        return find("skuId = ?1 AND warehouseId = ?2 ORDER BY expiry ASC", skuId, warehouseId).list();
    }
    
    public List<ProductBatch> findByWarehouseId(String warehouseId) {
        return find("warehouseId", warehouseId).list();
    }
    
    public List<ProductBatch> findExpiringSoon(String warehouseId, LocalDate expiryDate) {
        return find("warehouseId = ?1 AND expiry <= ?2 AND expiry >= CURRENT_DATE ORDER BY expiry ASC", 
                   warehouseId, expiryDate).list();
    }
    
    public List<ProductBatch> findLowStockBatches(String warehouseId, String skuId, Long threshold) {
        return find("warehouseId = ?1 AND skuId = ?2 AND quantity <= ?3 ORDER BY expiry ASC", 
                   warehouseId, skuId, threshold).list();
    }
}
