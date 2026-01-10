-- ============================================
-- SQL Migration: Add persona_type to product_batch table
-- Purpose: Separate batches for B2B (MedBiz) and B2C (MedBuddy) personas
-- Business Rule: B2B batches are bulk/wholesale, B2C batches are retail
-- A bulk B2B batch cannot be broken down for B2C orders
-- ============================================

-- Step 1: Disable safe update mode (MySQL only)
SET SQL_SAFE_UPDATES = 0;

-- Step 2: Add persona_type column to product_batch table
-- Note: Choose ENUM for MySQL (most common) or VARCHAR with CHECK constraint

-- MySQL with ENUM (Recommended)
ALTER TABLE product_batch 
ADD COLUMN persona_type ENUM('B2B', 'B2C', 'BOTH') NOT NULL DEFAULT 'BOTH';

-- Alternative: If ENUM not preferred, use VARCHAR (uncomment below)
-- ALTER TABLE product_batch 
-- ADD COLUMN persona_type VARCHAR(10) NOT NULL DEFAULT 'BOTH';

-- Step 3: Update existing batches based on parent product's persona_type
-- Rule: Batch persona_type should match or be subset of product persona_type

-- Case 1: Products with persona_type = 'B2B' → All batches should be 'B2B'
UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'B2B'
WHERE p.persona_type = 'B2B';

-- Case 2: Products with persona_type = 'B2C' → All batches should be 'B2C'
UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'B2C'
WHERE p.persona_type = 'B2C';

-- Case 3: Products with persona_type = 'BOTH' → Determine batch persona based on quantity
-- Large batches (>= 1000) → B2B (bulk/wholesale)
-- Small batches (< 1000) → B2C (retail)
-- Medium batches (1000-5000) → BOTH (can serve both)

UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'B2B'
WHERE p.persona_type = 'BOTH' 
  AND pb.quantity >= 5000;

UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'B2C'
WHERE p.persona_type = 'BOTH' 
  AND pb.quantity < 1000;

UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'BOTH'
WHERE p.persona_type = 'BOTH' 
  AND pb.quantity >= 1000 
  AND pb.quantity < 5000;

-- Step 4: Add indexes for faster filtering queries
-- Note: If indexes already exist, you'll get "Duplicate key name" error - just skip those

-- Single column index for persona_type filtering
CREATE INDEX idx_product_batch_persona_type ON product_batch(persona_type);

-- Composite index for persona + warehouse filtering (common query pattern)
CREATE INDEX idx_product_batch_persona_warehouse ON product_batch(persona_type, warehouse_id);

-- Composite index for persona + sku filtering (common query pattern)
CREATE INDEX idx_product_batch_persona_sku ON product_batch(persona_type, sku_id);

-- Composite index for persona + expiry filtering (for expiry tracking by persona)
CREATE INDEX idx_product_batch_persona_expiry ON product_batch(persona_type, expiry);

-- Step 5: Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

-- ============================================
-- VALIDATION QUERIES
-- ============================================
-- Run these to verify data integrity

-- Check for invalid combinations (batch persona_type doesn't match product persona_type)
-- This query should return 0 rows if validation is correct
SELECT 
    pb.batch_id,
    pb.sku_id,
    pb.warehouse_id,
    p.persona_type as product_persona,
    pb.persona_type as batch_persona,
    'INVALID' as status
FROM product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
WHERE 
    (p.persona_type = 'B2B' AND pb.persona_type NOT IN ('B2B', 'BOTH'))
    OR (p.persona_type = 'B2C' AND pb.persona_type NOT IN ('B2C', 'BOTH'))
    OR (p.persona_type = 'BOTH' AND pb.persona_type NOT IN ('B2B', 'B2C', 'BOTH'));

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count batches by persona type
SELECT persona_type, COUNT(*) as batch_count
FROM product_batch 
GROUP BY persona_type
ORDER BY persona_type;

-- Count batches by persona type and warehouse
SELECT 
    warehouse_id,
    persona_type,
    COUNT(*) as batch_count,
    SUM(quantity) as total_quantity,
    AVG(quantity) as avg_quantity
FROM product_batch
GROUP BY warehouse_id, persona_type
ORDER BY warehouse_id, persona_type;

-- View B2B batches (sample)
SELECT 
    pb.batch_id,
    pb.sku_id,
    pb.warehouse_id,
    p.product_name,
    pb.quantity,
    pb.expiry,
    pb.persona_type as batch_persona,
    p.persona_type as product_persona
FROM product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
WHERE pb.persona_type = 'B2B'
ORDER BY pb.quantity DESC
LIMIT 20;

-- View B2C batches (sample)
SELECT 
    pb.batch_id,
    pb.sku_id,
    pb.warehouse_id,
    p.product_name,
    pb.quantity,
    pb.expiry,
    pb.persona_type as batch_persona,
    p.persona_type as product_persona
FROM product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
WHERE pb.persona_type = 'B2C'
ORDER BY pb.quantity ASC
LIMIT 20;

-- Summary: Batch distribution by product and batch persona types
SELECT 
    p.persona_type as product_persona,
    pb.persona_type as batch_persona,
    COUNT(*) as batch_count,
    SUM(pb.quantity) as total_quantity,
    AVG(pb.quantity) as avg_batch_quantity,
    MIN(pb.quantity) as min_batch_quantity,
    MAX(pb.quantity) as max_batch_quantity
FROM product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
GROUP BY p.persona_type, pb.persona_type
ORDER BY p.persona_type, pb.persona_type;
