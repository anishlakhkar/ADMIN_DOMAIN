package com.drugmanagement.service;

import com.drugmanagement.dto.PageResponse;
import com.drugmanagement.dto.ProductRequest;
import com.drugmanagement.dto.ProductResponse;
import com.drugmanagement.entity.Product;
import com.drugmanagement.entity.ProductBatch;
import com.drugmanagement.repository.ProductBatchRepository;
import com.drugmanagement.repository.ProductRepository;
import com.drugmanagement.repository.WarehouseRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProductService {
    
    @Inject
    ProductRepository productRepository;
    
    @Inject
    ProductBatchRepository productBatchRepository;
    
    @Inject
    WarehouseRepository warehouseRepository;
    
    public PageResponse<ProductResponse> getAllProducts(String warehouseId, String search, 
                                                       int page, int size, String sortBy, String direction) {
        // Validate warehouse exists
        warehouseRepository.findByWarehouseId(warehouseId)
            .orElseThrow(() -> new NotFoundException("Warehouse not found: " + warehouseId));
        
        List<Product> products;
        if (search != null && !search.trim().isEmpty()) {
            products = productRepository.findByWarehouseIdAndSearch(warehouseId, search);
        } else {
            products = productRepository.findByWarehouseId(warehouseId);
        }
        
        // Apply sorting
        if (sortBy != null && !sortBy.trim().isEmpty()) {
            products = sortProducts(products, sortBy, direction);
        }
        
        // Apply pagination
        int totalElements = products.size();
        int totalPages = (int) Math.ceil((double) totalElements / size);
        int fromIndex = page * size;
        int toIndex = Math.min(fromIndex + size, totalElements);
        
        List<Product> pagedProducts = fromIndex < totalElements 
            ? products.subList(fromIndex, toIndex) 
            : List.of();
        
        List<ProductResponse> content = pagedProducts.stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
        
        return new PageResponse<>(content, totalElements, totalPages, size, page);
    }
    
    public ProductResponse getProductById(String skuId, String warehouseId) {
        Product product = productRepository.findBySkuIdAndWarehouseId(skuId, warehouseId)
            .orElseThrow(() -> new NotFoundException("Product not found with SKU: " + skuId + " in warehouse: " + warehouseId));
        return toResponse(product);
    }
    
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        // Validate warehouse exists
        warehouseRepository.findByWarehouseId(request.getWarehouseId())
            .orElseThrow(() -> new NotFoundException("Warehouse not found: " + request.getWarehouseId()));
        
        // Check if product already exists
        if (productRepository.findBySkuIdAndWarehouseId(request.getSkuId(), request.getWarehouseId()).isPresent()) {
            throw new IllegalArgumentException("Product with SKU " + request.getSkuId() + 
                " already exists in warehouse " + request.getWarehouseId());
        }
        
        Product product = new Product();
        product.setSkuId(request.getSkuId());
        product.setWarehouseId(request.getWarehouseId());
        product.setProductName(request.getProductName());
        product.setManufactureName(request.getManufactureName());
        product.setCategory(request.getCategory());
        product.setDescription(request.getDescription());
        product.setStorageType(request.getStorageType());
        product.setQuantity(0L); // Initial quantity is 0, will be updated when batches are added
        product.setPrice(request.getPrice());
        product.setProfitMargin(request.getProfitMargin() != null ? request.getProfitMargin() : new java.math.BigDecimal("5.00"));
        product.setRequiredPrescription(request.getRequiredPrescription() != null ? request.getRequiredPrescription() : false);
        product.setUrl(request.getUrl());
        product.setDosageForm(request.getDosageForm());
        product.setThresholdQuantity(request.getThresholdQuantity());
        product.setStrength(request.getStrength());
        product.setConcern(request.getConcern());
        
        productRepository.persist(product);
        return toResponse(product);
    }
    
    @Transactional
    public ProductResponse updateProduct(String skuId, String warehouseId, ProductRequest request) {
        Product product = productRepository.findBySkuIdAndWarehouseId(skuId, warehouseId)
            .orElseThrow(() -> new NotFoundException("Product not found with SKU: " + skuId + " in warehouse: " + warehouseId));
        
        // Update fields
        product.setProductName(request.getProductName());
        product.setManufactureName(request.getManufactureName());
        product.setCategory(request.getCategory());
        product.setDescription(request.getDescription());
        product.setStorageType(request.getStorageType());
        product.setPrice(request.getPrice());
        product.setProfitMargin(request.getProfitMargin() != null ? request.getProfitMargin() : product.getProfitMargin());
        product.setRequiredPrescription(request.getRequiredPrescription() != null ? request.getRequiredPrescription() : product.getRequiredPrescription());
        product.setUrl(request.getUrl());
        product.setDosageForm(request.getDosageForm());
        product.setThresholdQuantity(request.getThresholdQuantity());
        product.setStrength(request.getStrength());
        product.setConcern(request.getConcern());
        
        productRepository.persist(product);
        return toResponse(product);
    }
    
    @Transactional
    public void deleteProduct(String skuId, String warehouseId) {
        Product product = productRepository.findBySkuIdAndWarehouseId(skuId, warehouseId)
            .orElseThrow(() -> new NotFoundException("Product not found with SKU: " + skuId + " in warehouse: " + warehouseId));
        
        // Check if product has batches
        List<ProductBatch> batches = productBatchRepository.findBySkuIdAndWarehouseId(skuId, warehouseId);
        if (!batches.isEmpty()) {
            throw new IllegalStateException("Cannot delete product with existing batches. Please remove all batches first.");
        }
        
        productRepository.delete(product);
    }
    
    @Transactional
    public void updateProductQuantity(String skuId, String warehouseId) {
        Product product = productRepository.findBySkuIdAndWarehouseId(skuId, warehouseId)
            .orElseThrow(() -> new NotFoundException("Product not found with SKU: " + skuId + " in warehouse: " + warehouseId));
        
        // Calculate total quantity from all batches
        List<ProductBatch> batches = productBatchRepository.findBySkuIdAndWarehouseId(skuId, warehouseId);
        long totalQuantity = batches.stream()
            .mapToLong(ProductBatch::getQuantity)
            .sum();
        
        product.setQuantity(totalQuantity);
        productRepository.persist(product);
    }
    
    private ProductResponse toResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setSkuId(product.getSkuId());
        response.setWarehouseId(product.getWarehouseId());
        response.setProductName(product.getProductName());
        response.setManufactureName(product.getManufactureName());
        response.setCategory(product.getCategory());
        response.setDescription(product.getDescription());
        response.setStorageType(product.getStorageType());
        response.setQuantity(product.getQuantity());
        response.setPrice(product.getPrice());
        response.setProfitMargin(product.getProfitMargin());
        response.setRequiredPrescription(product.getRequiredPrescription());
        response.setUrl(product.getUrl());
        response.setDosageForm(product.getDosageForm());
        response.setThresholdQuantity(product.getThresholdQuantity());
        response.setStrength(product.getStrength());
        response.setConcern(product.getConcern());
        return response;
    }
    
    private List<Product> sortProducts(List<Product> products, String sortBy, String direction) {
        boolean ascending = direction == null || direction.equalsIgnoreCase("ASC");
        
        return products.stream()
            .sorted((p1, p2) -> {
                int comparison = 0;
                switch (sortBy.toLowerCase()) {
                    case "name":
                    case "productname":
                        comparison = p1.getProductName().compareToIgnoreCase(p2.getProductName());
                        break;
                    case "sku":
                    case "skuid":
                        comparison = p1.getSkuId().compareToIgnoreCase(p2.getSkuId());
                        break;
                    case "quantity":
                        comparison = Long.compare(p1.getQuantity(), p2.getQuantity());
                        break;
                    case "price":
                        comparison = p1.getPrice().compareTo(p2.getPrice());
                        break;
                    default:
                        comparison = p1.getSkuId().compareToIgnoreCase(p2.getSkuId());
                }
                return ascending ? comparison : -comparison;
            })
            .collect(Collectors.toList());
    }
}
