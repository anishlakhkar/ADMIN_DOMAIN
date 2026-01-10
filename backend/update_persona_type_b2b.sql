-- ============================================
-- Update Products to B2B Only
-- Purpose: Mark products as B2B (MedBiz) based on large stock quantities
-- ============================================

-- Disable safe update mode (MySQL only)
SET SQL_SAFE_UPDATES = 0;

-- Option 1: Mark products with VERY LARGE stock as B2B only
-- Rule: quantity >= threshold_quantity * 3 (triple the threshold)
-- This ensures B2B always has large stock as per business requirement
UPDATE product 
SET persona_type = 'B2B'
WHERE quantity >= (threshold_quantity * 3);

-- Option 2: Mark specific quantity threshold as B2B only
-- Uncomment and adjust the threshold value as needed
-- UPDATE product 
-- SET persona_type = 'B2B'
-- WHERE quantity >= 5000;  -- Adjust this value based on your needs

-- Option 3: Mark specific products by SKU as B2B only
-- Uncomment and add your product SKUs
-- UPDATE product 
-- SET persona_type = 'B2B'
-- WHERE sku_id IN ('SKU-001', 'SKU-002', 'SKU-003');

-- Option 4: Mark products by warehouse as B2B only (if specific warehouse is B2B only)
-- Uncomment and adjust warehouse_id
-- UPDATE product 
-- SET persona_type = 'B2B'
-- WHERE warehouse_id = '001';  -- Replace with your warehouse ID

-- Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

-- ============================================
-- VERIFICATION
-- ============================================

-- Count B2B products
SELECT COUNT(*) as b2b_product_count
FROM product
WHERE persona_type = 'B2B';

-- View all B2B products with details
SELECT 
    sku_id,
    warehouse_id,
    product_name,
    category,
    quantity,
    threshold_quantity,
    (quantity / threshold_quantity) as threshold_multiple,
    persona_type
FROM product
WHERE persona_type = 'B2B'
ORDER BY quantity DESC;

-- Summary: B2B products by warehouse
SELECT 
    warehouse_id,
    COUNT(*) as b2b_count,
    SUM(quantity) as total_stock,
    AVG(quantity) as avg_stock,
    MIN(quantity) as min_stock,
    MAX(quantity) as max_stock
FROM product
WHERE persona_type = 'B2B'
GROUP BY warehouse_id;
