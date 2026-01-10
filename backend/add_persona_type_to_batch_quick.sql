-- ============================================
-- QUICK FIX: Add persona_type to product_batch
-- Run this FIRST before inserting batch data
-- ============================================

SET SQL_SAFE_UPDATES = 0;

-- Add persona_type column
ALTER TABLE product_batch 
ADD COLUMN persona_type ENUM('B2B', 'B2C', 'BOTH') NOT NULL DEFAULT 'BOTH';

-- Update existing batches based on product persona_type
UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = p.persona_type;

-- For products with persona_type = 'BOTH', set batch persona based on quantity
UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'B2B'
WHERE p.persona_type = 'BOTH' AND pb.quantity >= 5000;

UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'B2C'
WHERE p.persona_type = 'BOTH' AND pb.quantity < 1000;

UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'BOTH'
WHERE p.persona_type = 'BOTH' AND pb.quantity >= 1000 AND pb.quantity < 5000;

SET SQL_SAFE_UPDATES = 1;

-- Verify column was added
DESCRIBE product_batch;

-- Check existing batches
SELECT persona_type, COUNT(*) as count FROM product_batch GROUP BY persona_type;
