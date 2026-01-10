-- ============================================
-- SQL Migration: Add persona_type to product table
-- Purpose: Separate products for B2B (MedBiz) and B2C (MedBuddy) personas
-- Note: Index creation skipped as column already exists
-- ============================================

-- Step 1: Disable safe update mode (MySQL only)
SET SQL_SAFE_UPDATES = 0;

-- Step 2: Add persona_type column (if not already added)
-- If column already exists, skip this step
ALTER TABLE product 
ADD COLUMN persona_type ENUM('B2B', 'B2C', 'BOTH') NOT NULL DEFAULT 'BOTH';

-- Step 3: Update products based on quantity threshold
-- Business Rule:
--   - B2B (MedBiz) should always have large stock quantities
--   - B2C (MedBuddy) can have any stock quantity

-- Update products with LOW stock (< threshold) → B2C only
-- These are not suitable for B2B bulk orders
UPDATE product 
SET persona_type = 'B2C'
WHERE quantity < threshold_quantity;

-- Update products with VERY LARGE stock (>= threshold * 3) → B2B only
-- These have bulk quantities, primarily for B2B
UPDATE product 
SET persona_type = 'B2B'
WHERE quantity >= (threshold_quantity * 3);

-- Update products with LARGE stock (>= threshold * 2 AND < threshold * 3) → BOTH
-- These have good stock, suitable for both B2B and B2C
UPDATE product 
SET persona_type = 'BOTH'
WHERE quantity >= (threshold_quantity * 2) 
  AND quantity < (threshold_quantity * 3);

-- Update products with MODERATE stock (>= threshold AND < threshold * 2) → BOTH
-- These have moderate stock, still suitable for both
UPDATE product 
SET persona_type = 'BOTH'
WHERE quantity >= threshold_quantity 
  AND quantity < (threshold_quantity * 2);

-- Note: Products with quantity < threshold are already set to 'B2C' above

-- Step 4: Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count products by persona type
SELECT persona_type, COUNT(*) as product_count
FROM product 
GROUP BY persona_type
ORDER BY persona_type;

-- View B2B only products (sample)
SELECT sku_id, product_name, quantity, threshold_quantity, persona_type, warehouse_id
FROM product
WHERE persona_type = 'B2B'
LIMIT 20;

-- View B2C only products (sample)
SELECT sku_id, product_name, quantity, threshold_quantity, persona_type, warehouse_id
FROM product
WHERE persona_type = 'B2C'
LIMIT 20;

-- View BOTH products (sample)
SELECT sku_id, product_name, quantity, threshold_quantity, persona_type, warehouse_id
FROM product
WHERE persona_type = 'BOTH'
LIMIT 20;

-- Summary by warehouse and persona type
SELECT 
    warehouse_id,
    persona_type,
    COUNT(*) as count,
    MIN(quantity) as min_quantity,
    MAX(quantity) as max_quantity,
    AVG(quantity) as avg_quantity
FROM product
GROUP BY warehouse_id, persona_type
ORDER BY warehouse_id, persona_type;
