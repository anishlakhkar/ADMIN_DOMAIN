-- ============================================
-- SQL Queries to Create LOW STOCK Products for Warehouse 002
-- ============================================
-- These queries will create products with quantity BELOW threshold_quantity
-- to trigger low stock alerts when calling:
-- GET http://localhost:8080/api/monitoring/low-stock-alerts?warehouseId=002
-- ============================================

-- ============================================
-- OPTION 1: INSERT NEW PRODUCTS WITH LOW STOCK (Warehouse 002)
-- ============================================

-- ANTIBIOTICS - Low Stock Products
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('ANT-LOW-001', '002', 'Amoxicillin 250mg', 'Pfizer', 'ANTIBIOTICS', 'Low stock antibiotic - needs restocking', 'AMBIENT', 45, 10.99, 5.00, true, 'TABLET', 100, '250mg', 'INFECTION'),
('ANT-LOW-002', '002', 'Cephalexin 250mg', 'Johnson&Johnson', 'ANTIBIOTICS', 'Critical low stock - urgent restock needed', 'AMBIENT', 25, 12.50, 5.00, true, 'CAPSULE', 150, '250mg', 'INFECTION'),
('ANT-LOW-003', '002', 'Erythromycin 500mg', 'Merck&Co.Inc', 'ANTIBIOTICS', 'Below minimum threshold', 'AMBIENT', 80, 15.75, 5.00, true, 'TABLET', 200, '500mg', 'INFECTION');

-- VACCINES - Low Stock Products
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('VAC-LOW-001', '002', 'Tetanus Vaccine', 'Pfizer', 'VACCINE', 'Low stock vaccine - critical', 'REFRIGERATED', 120, 28.99, 5.00, true, 'SYRUP', 300, '0.5ml', 'INFECTION'),
('VAC-LOW-002', '002', 'Hepatitis A Vaccine', 'Johnson&Johnson', 'VACCINE', 'Below threshold - needs restocking', 'REFRIGERATED', 180, 32.50, 5.00, true, 'SYRUP', 400, '1ml', 'INFECTION');

-- DIABETES - Low Stock Products
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('DIA-LOW-001', '002', 'Glipizide 5mg', 'Pfizer', 'DIABETES', 'Low stock diabetes medication', 'AMBIENT', 95, 14.99, 5.00, true, 'TABLET', 200, '5mg', 'FEVER'),
('DIA-LOW-002', '002', 'Insulin Aspart', 'Johnson&Johnson', 'DIABETES', 'Critical low stock insulin', 'REFRIGERATED', 140, 48.75, 5.00, true, 'SYRUP', 250, '100 units/ml', 'FEVER'),
('DIA-LOW-003', '002', 'Pioglitazone 15mg', 'Merck&Co.Inc', 'DIABETES', 'Below minimum threshold', 'AMBIENT', 60, 19.50, 5.00, true, 'TABLET', 150, '15mg', 'FEVER');

-- PAIN RELIEF - Low Stock Products
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('PNR-LOW-001', '002', 'Morphine 10mg', 'Pfizer', 'PAIN_RELIEF', 'Critical low stock - controlled substance', 'AMBIENT', 35, 22.99, 5.00, true, 'TABLET', 100, '10mg', 'PAIN'),
('PNR-LOW-002', '002', 'Codeine 30mg', 'Johnson&Johnson', 'PAIN_RELIEF', 'Below threshold - urgent restock', 'AMBIENT', 55, 18.50, 5.00, true, 'TABLET', 120, '30mg', 'PAIN'),
('PNR-LOW-003', '002', 'Diclofenac 50mg', 'Merck&Co.Inc', 'PAIN_RELIEF', 'Low stock pain medication', 'AMBIENT', 75, 9.99, 5.00, false, 'TABLET', 150, '50mg', 'PAIN');

-- HEART HEALTH - Low Stock Products
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('HRT-LOW-001', '002', 'Carvedilol 25mg', 'Pfizer', 'HEART_HEALTH', 'Low stock heart medication', 'AMBIENT', 90, 21.99, 5.00, true, 'TABLET', 200, '25mg', 'FEVER'),
('HRT-LOW-002', '002', 'Digoxin 0.25mg', 'Merck&Co.Inc', 'HEART_HEALTH', 'Critical low stock', 'AMBIENT', 40, 16.75, 5.00, true, 'TABLET', 100, '0.25mg', 'FEVER'),
('HRT-LOW-003', '002', 'Furosemide 40mg', 'Johnson&Johnson', 'HEART_HEALTH', 'Below minimum threshold', 'AMBIENT', 110, 8.99, 5.00, true, 'TABLET', 180, '40mg', 'FEVER');

-- SKIN CARE - Low Stock Products
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('SKN-LOW-001', '002', 'Betamethasone Cream', 'Pfizer', 'SKIN_CARE', 'Low stock skin cream', 'AMBIENT', 65, 11.99, 5.00, true, 'OINTMENT', 150, '0.1%', 'PAIN'),
('SKN-LOW-002', '002', 'Neomycin Ointment', 'Johnson&Johnson', 'SKIN_CARE', 'Below threshold', 'AMBIENT', 85, 9.50, 5.00, false, 'OINTMENT', 200, '0.5%', 'INFECTION');

-- EYE CARE - Low Stock Products
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('EYE-LOW-001', '002', 'Brinzolamide Eye Drops', 'Pfizer', 'EYE_CARE', 'Low stock eye medication', 'REFRIGERATED', 70, 28.99, 5.00, true, 'SYRUP', 150, '1%', 'PAIN'),
('EYE-LOW-002', '002', 'Latanoprost Eye Drops', 'Merck&Co.Inc', 'EYE_CARE', 'Critical low stock', 'REFRIGERATED', 50, 35.50, 5.00, true, 'SYRUP', 120, '0.005%', 'PAIN');

-- ONCOLOGY - Low Stock Products (High Value)
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('ONC-LOW-001', '002', 'Carboplatin Injection', 'Pfizer', 'ONCOLOGY', 'Critical low stock chemotherapy', 'REFRIGERATED', 15, 850.00, 5.00, true, 'SYRUP', 30, '150mg/15ml', 'PAIN'),
('ONC-LOW-002', '002', 'Methotrexate Injection', 'Merck&Co.Inc', 'ONCOLOGY', 'Low stock oncology medication', 'REFRIGERATED', 20, 720.50, 5.00, true, 'SYRUP', 40, '50mg/2ml', 'PAIN');

-- ============================================
-- OPTION 2: UPDATE EXISTING PRODUCTS TO LOW STOCK (Warehouse 002)
-- ============================================
-- If you already have products in warehouse 002, you can update them to low stock:

-- Update existing antibiotics to low stock
UPDATE product 
SET quantity = 45, threshold_quantity = 100 
WHERE warehouse_id = '002' AND sku_id = 'ANT-003';

UPDATE product 
SET quantity = 80, threshold_quantity = 200 
WHERE warehouse_id = '002' AND sku_id = 'ANT-004';

-- Update existing diabetes products to low stock
UPDATE product 
SET quantity = 120, threshold_quantity = 300 
WHERE warehouse_id = '002' AND sku_id = 'DIA-003';

-- Update existing pain relief to low stock
UPDATE product 
SET quantity = 150, threshold_quantity = 400 
WHERE warehouse_id = '002' AND sku_id = 'PNR-003';

-- Update existing heart health to low stock
UPDATE product 
SET quantity = 180, threshold_quantity = 400 
WHERE warehouse_id = '002' AND sku_id = 'HRT-002';

-- Update existing skin care to low stock
UPDATE product 
SET quantity = 100, threshold_quantity = 250 
WHERE warehouse_id = '002' AND sku_id = 'SKN-002';

-- Update existing eye care to low stock
UPDATE product 
SET quantity = 90, threshold_quantity = 200 
WHERE warehouse_id = '002' AND sku_id = 'EYE-002';

-- ============================================
-- OPTION 3: QUICK INSERT - Multiple Low Stock Products at Once
-- ============================================
-- This creates 10 products with various low stock levels

INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
-- Critical Low Stock (quantity < 30% of threshold)
('LOW-001', '002', 'Critical Product A', 'Pfizer', 'ANTIBIOTICS', 'Critical low stock item', 'AMBIENT', 25, 12.99, 5.00, true, 'TABLET', 100, '500mg', 'INFECTION'),
('LOW-002', '002', 'Critical Product B', 'Johnson&Johnson', 'PAIN_RELIEF', 'Urgent restock needed', 'AMBIENT', 30, 8.50, 5.00, false, 'TABLET', 120, '200mg', 'PAIN'),
('LOW-003', '002', 'Critical Product C', 'Merck&Co.Inc', 'DIABETES', 'Below critical threshold', 'AMBIENT', 40, 15.75, 5.00, true, 'TABLET', 150, '850mg', 'FEVER'),

-- High Priority Low Stock (quantity 30-60% of threshold)
('LOW-004', '002', 'High Priority Product A', 'Pfizer', 'HEART_HEALTH', 'High priority restock', 'AMBIENT', 60, 20.99, 5.00, true, 'TABLET', 150, '10mg', 'FEVER'),
('LOW-005', '002', 'High Priority Product B', 'Johnson&Johnson', 'SKIN_CARE', 'Needs restocking soon', 'AMBIENT', 70, 10.50, 5.00, false, 'OINTMENT', 150, '1%', 'INFECTION'),
('LOW-006', '002', 'High Priority Product C', 'Merck&Co.Inc', 'EYE_CARE', 'Monitor closely', 'REFRIGERATED', 80, 25.99, 5.00, true, 'SYRUP', 150, '0.3%', 'INFECTION'),

-- Medium Priority Low Stock (quantity 60-90% of threshold)
('LOW-007', '002', 'Medium Priority Product A', 'Pfizer', 'VACCINE', 'Approaching threshold', 'REFRIGERATED', 180, 30.50, 5.00, true, 'SYRUP', 250, '0.5ml', 'INFECTION'),
('LOW-008', '002', 'Medium Priority Product B', 'Johnson&Johnson', 'ANTIBIOTICS', 'Monitor stock levels', 'AMBIENT', 200, 14.99, 5.00, true, 'CAPSULE', 250, '250mg', 'INFECTION'),
('LOW-009', '002', 'Medium Priority Product C', 'Merck&Co.Inc', 'PAIN_RELIEF', 'Below optimal level', 'AMBIENT', 220, 9.75, 5.00, false, 'TABLET', 300, '400mg', 'PAIN'),
('LOW-010', '002', 'Medium Priority Product D', 'Pfizer', 'ONCOLOGY', 'Low stock oncology item', 'REFRIGERATED', 12, 950.00, 5.00, true, 'SYRUP', 20, '100mg/10ml', 'PAIN');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify low stock products were created:

-- Count low stock products in warehouse 002
SELECT COUNT(*) as low_stock_count
FROM product
WHERE warehouse_id = '002' 
  AND quantity < threshold_quantity;

-- List all low stock products in warehouse 002
SELECT 
    sku_id,
    product_name,
    category,
    quantity,
    threshold_quantity,
    (threshold_quantity - quantity) as shortage,
    ROUND((quantity * 100.0 / threshold_quantity), 2) as stock_percentage
FROM product
WHERE warehouse_id = '002' 
  AND quantity < threshold_quantity
ORDER BY (quantity * 100.0 / threshold_quantity) ASC;

-- ============================================
-- NOTES:
-- ============================================
-- 1. After running these queries, test the API:
--    GET http://localhost:8080/api/monitoring/low-stock-alerts?warehouseId=002
--
-- 2. You should see products with:
--    - quantity < threshold_quantity
--    - Priority: Critical (if quantity < 30% of threshold or daysUntilOut <= 7)
--    - Priority: High (if quantity 30-60% of threshold or daysUntilOut <= 14)
--    - Priority: Medium (if quantity 60-90% of threshold)
--
-- 3. The backend automatically calculates:
--    - daysUntilOut (estimated days until stock runs out)
--    - priority (Critical, High, Medium)
--
-- 4. If you want to test with specific categories:
--    GET http://localhost:8080/api/monitoring/low-stock-alerts?warehouseId=002&category=ANTIBIOTICS
