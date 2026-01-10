-- ============================================
-- Insert Sample Batches with Persona Type
-- Purpose: Add batches for B2B (bulk) and B2C (retail) personas
-- Rule: B2B batches = large quantities (bulk), B2C batches = small quantities (retail)
-- ============================================
-- ⚠️  IMPORTANT: Run this file FIRST before inserting data:
--     migrate_add_persona_type_to_batch.sql (or add_persona_type_to_batch_quick.sql)
--     This adds the persona_type column to product_batch table
-- ============================================
-- If you get error "Unknown column 'persona_type'", STOP and run the migration first!
-- ============================================

-- Disable safe update mode (MySQL only)
SET SQL_SAFE_UPDATES = 0;

-- Check if column exists (uncomment to verify)
-- DESCRIBE product_batch;

-- Prerequisites checklist:
-- ✅ 1. Run migrate_add_persona_type.sql (adds persona_type to product table)
-- ✅ 2. Run insert_b2b_products.sql (adds B2B products)
-- ✅ 3. Run migrate_add_persona_type_to_batch.sql OR add_persona_type_to_batch_quick.sql (adds persona_type to product_batch) ← REQUIRED!
-- ✅ 4. Then run this file to insert batch data

-- ============================================
-- B2B BATCHES - Large Bulk Quantities
-- ============================================
-- These batches have large quantities suitable for B2B wholesale orders
-- Batch persona_type will be set to 'B2B' or 'BOTH' depending on product persona_type

-- B2B Medications - Large Bulk Batches
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity, persona_type) VALUES
-- For B2B-MED-001 (Paracetamol 500mg - B2B product)
('BATCH-B2B-MED-001-A', '001', 'B2B-MED-001', '2026-12-31', 15000, 'B2B'),
('BATCH-B2B-MED-001-B', '001', 'B2B-MED-001', '2027-06-30', 20000, 'B2B'),
('BATCH-B2B-MED-001-C', '001', 'B2B-MED-001', '2027-12-31', 15000, 'B2B'),

-- For B2B-MED-002 (Amoxicillin 500mg - B2B product)
('BATCH-B2B-MED-002-A', '001', 'B2B-MED-002', '2026-09-30', 25000, 'B2B'),
('BATCH-B2B-MED-002-B', '001', 'B2B-MED-002', '2027-03-31', 30000, 'B2B'),
('BATCH-B2B-MED-002-C', '001', 'B2B-MED-002', '2027-09-30', 20000, 'B2B'),

-- For B2B-MED-003 (Ibuprofen 400mg - B2B product)
('BATCH-B2B-MED-003-A', '001', 'B2B-MED-003', '2026-11-30', 35000, 'B2B'),
('BATCH-B2B-MED-003-B', '001', 'B2B-MED-003', '2027-05-31', 40000, 'B2B'),
('BATCH-B2B-MED-003-C', '001', 'B2B-MED-003', '2027-11-30', 25000, 'B2B'),

-- For B2B-SUP-001 (Multivitamin - B2B product)
('BATCH-B2B-SUP-001-A', '001', 'B2B-SUP-001', '2027-12-31', 60000, 'B2B'),
('BATCH-B2B-SUP-001-B', '001', 'B2B-SUP-001', '2028-06-30', 65000, 'B2B'),
('BATCH-B2B-SUP-001-C', '001', 'B2B-SUP-001', '2028-12-31', 50000, 'B2B'),

-- For B2B-SPL-001 (Surgical Masks - B2B product)
('BATCH-B2B-SPL-001-A', '001', 'B2B-SPL-001', '2028-12-31', 200000, 'B2B'),
('BATCH-B2B-SPL-001-B', '001', 'B2B-SPL-001', '2029-06-30', 150000, 'B2B'),
('BATCH-B2B-SPL-001-C', '001', 'B2B-SPL-001', '2029-12-31', 150000, 'B2B');

-- ============================================
-- B2C BATCHES - Small Retail Quantities
-- ============================================
-- These batches have small quantities suitable for B2C retail orders
-- Batch persona_type will be set to 'B2C' or 'BOTH' depending on product persona_type

-- Note: You need to have products with persona_type 'B2C' or 'BOTH'
-- For demonstration, assuming we have existing products or creating small batches for BOTH products

-- Example: If you have products with sku_id starting with 'ANT-', 'PNR-', etc. (from queries.sql)
-- These can be used for B2C batches with small quantities

-- B2C Medications - Small Retail Batches (assuming these products exist and are B2C or BOTH)
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity, persona_type) VALUES
-- Small batches for retail (B2C)
('BATCH-B2C-MED-001-A', '001', 'ANT-001', '2026-06-30', 500, 'B2C'),
('BATCH-B2C-MED-001-B', '001', 'ANT-001', '2026-12-31', 400, 'B2C'),
('BATCH-B2C-MED-002-A', '001', 'ANT-002', '2026-08-31', 300, 'B2C'),
('BATCH-B2C-MED-002-B', '001', 'ANT-002', '2027-02-28', 350, 'B2C'),

-- Small batches for pain relief products
('BATCH-B2C-PNR-001-A', '001', 'PNR-001', '2026-07-31', 600, 'B2C'),
('BATCH-B2C-PNR-001-B', '001', 'PNR-001', '2027-01-31', 550, 'B2C'),
('BATCH-B2C-PNR-002-A', '001', 'PNR-002', '2026-09-30', 750, 'B2C'),
('BATCH-B2C-PNR-002-B', '001', 'PNR-002', '2027-03-31', 700, 'B2C');

-- ============================================
-- BOTH BATCHES - Medium Quantities (Can serve both B2B and B2C)
-- ============================================
-- These batches have medium quantities that can be used for both B2B and B2C
-- Quantity range: 1000 to 5000 units

INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity, persona_type) VALUES
-- Medium batches for products with persona_type 'BOTH'
('BATCH-BOTH-MED-001-A', '001', 'DIA-001', '2026-10-31', 2500, 'BOTH'),
('BATCH-BOTH-MED-001-B', '001', 'DIA-001', '2027-04-30', 2200, 'BOTH'),
('BATCH-BOTH-MED-002-A', '002', 'HRT-001', '2026-11-30', 3000, 'BOTH'),
('BATCH-BOTH-MED-002-B', '002', 'HRT-001', '2027-05-31', 2800, 'BOTH'),
('BATCH-BOTH-SUP-001-A', '001', 'B2B-SUP-004', '2027-12-31', 4000, 'BOTH'),
('BATCH-BOTH-SUP-001-B', '001', 'B2B-SUP-004', '2028-06-30', 3500, 'BOTH');

-- Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

-- ============================================
-- UPDATE BATCH PERSONA TYPE BASED ON PRODUCT
-- ============================================
-- After insertion, validate and update batch persona_type to match product persona_type

SET SQL_SAFE_UPDATES = 0;

-- Update batches for B2B products to ensure they are B2B
UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'B2B'
WHERE p.persona_type = 'B2B' 
  AND pb.persona_type != 'B2B';

-- Update batches for B2C products to ensure they are B2C
UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'B2C'
WHERE p.persona_type = 'B2C' 
  AND pb.persona_type != 'B2C';

-- For BOTH products, ensure batches match the quantity-based logic:
-- Large batches (>= 5000) → B2B
-- Medium batches (1000-5000) → BOTH
-- Small batches (< 1000) → B2C

UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'B2B'
WHERE p.persona_type = 'BOTH' 
  AND pb.quantity >= 5000
  AND pb.persona_type != 'B2B';

UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'B2C'
WHERE p.persona_type = 'BOTH' 
  AND pb.quantity < 1000
  AND pb.persona_type != 'B2C';

UPDATE product_batch pb
INNER JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
SET pb.persona_type = 'BOTH'
WHERE p.persona_type = 'BOTH' 
  AND pb.quantity >= 1000 
  AND pb.quantity < 5000
  AND pb.persona_type != 'BOTH';

SET SQL_SAFE_UPDATES = 1;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count batches by persona type
SELECT persona_type, COUNT(*) as batch_count, SUM(quantity) as total_quantity
FROM product_batch 
GROUP BY persona_type
ORDER BY persona_type;

-- View B2B batches (large quantities)
SELECT 
    pb.batch_id,
    pb.sku_id,
    p.product_name,
    pb.quantity,
    pb.expiry,
    pb.persona_type,
    'B2B BATCH' as batch_type
FROM product_batch pb
LEFT JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
WHERE pb.persona_type = 'B2B'
ORDER BY pb.quantity DESC
LIMIT 10;

-- View B2C batches (small quantities)
SELECT 
    pb.batch_id,
    pb.sku_id,
    p.product_name,
    pb.quantity,
    pb.expiry,
    pb.persona_type,
    'B2C BATCH' as batch_type
FROM product_batch pb
LEFT JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
WHERE pb.persona_type = 'B2C'
ORDER BY pb.quantity ASC
LIMIT 10;

-- View BOTH batches (medium quantities)
SELECT 
    pb.batch_id,
    pb.sku_id,
    p.product_name,
    pb.quantity,
    pb.expiry,
    pb.persona_type,
    'BOTH BATCH' as batch_type
FROM product_batch pb
LEFT JOIN product p ON pb.sku_id = p.sku_id AND pb.warehouse_id = p.warehouse_id
WHERE pb.persona_type = 'BOTH'
ORDER BY pb.quantity DESC
LIMIT 10;

-- Summary: Batch distribution showing B2B (large) vs B2C (small) vs BOTH (medium)
SELECT 
    persona_type,
    COUNT(*) as batch_count,
    SUM(quantity) as total_quantity,
    AVG(quantity) as avg_quantity,
    MIN(quantity) as min_quantity,
    MAX(quantity) as max_quantity,
    CASE 
        WHEN persona_type = 'B2B' THEN 'LARGE BULK'
        WHEN persona_type = 'B2C' THEN 'SMALL RETAIL'
        WHEN persona_type = 'BOTH' THEN 'MEDIUM'
    END as batch_category
FROM product_batch
GROUP BY persona_type
ORDER BY avg_quantity DESC;
