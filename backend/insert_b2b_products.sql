-- ============================================
-- Insert Sample B2B (MedBiz) Products
-- Purpose: Add products with large stock quantities suitable for B2B bulk orders
-- Rule: quantity >= threshold_quantity * 3 (to be marked as B2B)
-- ============================================

-- Disable safe update mode (MySQL only)
SET SQL_SAFE_UPDATES = 0;

-- Note: These products have large quantities and high threshold_quantity
-- After insertion, they will be marked as B2B based on: quantity >= (threshold_quantity * 3)

-- ============================================
-- B2B MEDICATIONS - Large Bulk Quantities
-- ============================================

INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern, persona_type) VALUES
-- Warehouse 001 - Medications (B2B Bulk)
('B2B-MED-001', '001', 'Paracetamol 500mg - Bulk Pack', 'Pfizer', 'MEDICATIONS', 'Bulk packaging for wholesale distribution - 10000 unit packs', 'AMBIENT', 50000, 8.50, 5.00, false, 'TABLET', 10000, '500mg', 'FEVER', 'BOTH'),
('B2B-MED-002', '001', 'Amoxicillin 500mg - Bulk Pack', 'Johnson&Johnson', 'MEDICATIONS', 'Wholesale antibiotic bulk packaging - 15000 unit packs', 'AMBIENT', 75000, 12.75, 5.00, true, 'TABLET', 15000, '500mg', 'INFECTION', 'BOTH'),
('B2B-MED-003', '001', 'Ibuprofen 400mg - Bulk Pack', 'Merck&Co.Inc', 'MEDICATIONS', 'Bulk NSAID for wholesale - 20000 unit packs', 'AMBIENT', 100000, 9.99, 5.00, false, 'TABLET', 20000, '400mg', 'PAIN', 'BOTH'),
('B2B-MED-004', '001', 'Metformin 500mg - Bulk Pack', 'Pfizer', 'MEDICATIONS', 'Wholesale diabetes medication - 12000 unit packs', 'AMBIENT', 60000, 11.50, 5.00, true, 'TABLET', 12000, '500mg', 'FEVER', 'BOTH'),

-- Warehouse 002 - Medications (B2B Bulk)
('B2B-MED-005', '002', 'Azithromycin 250mg - Bulk Pack', 'Johnson&Johnson', 'MEDICATIONS', 'Wholesale antibiotic bulk - 18000 unit packs', 'AMBIENT', 90000, 15.25, 5.00, true, 'CAPSULE', 18000, '250mg', 'INFECTION', 'BOTH'),
('B2B-MED-006', '002', 'Atorvastatin 20mg - Bulk Pack', 'Merck&Co.Inc', 'MEDICATIONS', 'Wholesale cholesterol medication - 16000 unit packs', 'AMBIENT', 80000, 22.75, 5.00, true, 'TABLET', 16000, '20mg', 'FEVER', 'BOTH'),
('B2B-MED-007', '002', 'Omeprazole 20mg - Bulk Pack', 'Pfizer', 'MEDICATIONS', 'Bulk antacid for wholesale - 25000 unit packs', 'AMBIENT', 125000, 14.99, 5.00, false, 'CAPSULE', 25000, '20mg', 'PAIN', 'BOTH'),

-- Warehouse 003 - Medications (B2B Bulk)
('B2B-MED-008', '003', 'Lisinopril 10mg - Bulk Pack', 'Merck&Co.Inc', 'MEDICATIONS', 'Wholesale blood pressure medication - 14000 unit packs', 'AMBIENT', 70000, 19.50, 5.00, true, 'TABLET', 14000, '10mg', 'FEVER', 'BOTH'),
('B2B-MED-009', '003', 'Cetirizine 10mg - Bulk Pack', 'Johnson&Johnson', 'MEDICATIONS', 'Bulk antihistamine for wholesale - 30000 unit packs', 'AMBIENT', 150000, 7.75, 5.00, false, 'TABLET', 30000, '10mg', 'FEVER', 'BOTH');

-- ============================================
-- B2B SUPPLEMENTS - Large Bulk Quantities
-- ============================================

INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern, persona_type) VALUES
('B2B-SUP-001', '001', 'Multivitamin Tablets - Bulk Pack', 'Pfizer', 'SUPPLEMENTS', 'Wholesale multivitamin bulk - 35000 unit packs', 'AMBIENT', 175000, 12.99, 5.00, false, 'TABLET', 35000, 'Standard', 'FEVER', 'BOTH'),
('B2B-SUP-002', '001', 'Calcium + Vitamin D - Bulk Pack', 'Johnson&Johnson', 'SUPPLEMENTS', 'Bulk calcium supplement for wholesale - 40000 unit packs', 'AMBIENT', 200000, 15.50, 5.00, false, 'TABLET', 40000, '1000mg', 'FEVER', 'BOTH'),
('B2B-SUP-003', '002', 'Omega-3 Capsules - Bulk Pack', 'Merck&Co.Inc', 'SUPPLEMENTS', 'Wholesale omega-3 bulk - 28000 unit packs', 'AMBIENT', 140000, 18.75, 5.00, false, 'CAPSULE', 28000, '1000mg', 'FEVER', 'BOTH'),
('B2B-SUP-004', '002', 'Vitamin C Tablets - Bulk Pack', 'Pfizer', 'SUPPLEMENTS', 'Bulk vitamin C for wholesale - 45000 unit packs', 'AMBIENT', 225000, 9.99, 5.00, false, 'TABLET', 45000, '1000mg', 'FEVER', 'BOTH');

-- ============================================
-- B2B EQUIPMENTS - Large Bulk Quantities
-- ============================================

INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern, persona_type) VALUES
('B2B-EQP-001', '001', 'Digital Thermometer - Bulk Pack', 'Johnson&Johnson', 'EQUIPMENTS', 'Wholesale medical thermometer bulk - 5000 units', 'AMBIENT', 25000, 45.99, 5.00, false, 'TABLET', 5000, 'Standard', 'FEVER', 'BOTH'),
('B2B-EQP-002', '002', 'Blood Pressure Monitor - Bulk Pack', 'Merck&Co.Inc', 'EQUIPMENTS', 'Bulk BP monitor for wholesale - 3500 units', 'AMBIENT', 18000, 125.50, 5.00, false, 'TABLET', 3500, 'Standard', 'FEVER', 'BOTH'),
('B2B-EQP-003', '003', 'Stethoscope - Bulk Pack', 'Pfizer', 'EQUIPMENTS', 'Wholesale stethoscope bulk - 4000 units', 'AMBIENT', 20000, 85.75, 5.00, false, 'TABLET', 4000, 'Standard', 'INFECTION', 'BOTH'),
('B2B-EQP-004', '001', 'Pulse Oximeter - Bulk Pack', 'Johnson&Johnson', 'EQUIPMENTS', 'Bulk pulse oximeter for wholesale - 6000 units', 'AMBIENT', 30000, 65.99, 5.00, false, 'TABLET', 6000, 'Standard', 'FEVER', 'BOTH');

-- ============================================
-- B2B SUPPLIES - Large Bulk Quantities
-- ============================================

INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern, persona_type) VALUES
('B2B-SPL-001', '001', 'Surgical Masks - Bulk Pack (1000 units)', 'Pfizer', 'SUPPLIES', 'Wholesale surgical masks bulk - 50000 units', 'AMBIENT', 500000, 2.50, 5.00, false, 'TABLET', 50000, 'Standard', 'INFECTION', 'BOTH'),
('B2B-SPL-002', '002', 'Disposable Gloves - Bulk Pack (1000 units)', 'Johnson&Johnson', 'SUPPLIES', 'Bulk disposable gloves for wholesale - 80000 units', 'AMBIENT', 800000, 3.75, 5.00, false, 'TABLET', 80000, 'Standard', 'INFECTION', 'BOTH'),
('B2B-SPL-003', '002', 'Syringes 5ml - Bulk Pack (1000 units)', 'Merck&Co.Inc', 'SUPPLIES', 'Wholesale syringes bulk - 60000 units', 'AMBIENT', 600000, 1.99, 5.00, false, 'SYRUP', 60000, '5ml', 'INFECTION', 'BOTH'),
('B2B-SPL-004', '003', 'Bandages - Bulk Pack (500 units)', 'Pfizer', 'SUPPLIES', 'Bulk bandages for wholesale - 100000 units', 'AMBIENT', 500000, 0.99, 5.00, false, 'TABLET', 100000, 'Standard', 'PAIN', 'BOTH'),
('B2B-SPL-005', '001', 'Gauze Pads - Bulk Pack (1000 units)', 'Johnson&Johnson', 'SUPPLIES', 'Wholesale gauze pads bulk - 75000 units', 'AMBIENT', 750000, 2.25, 5.00, false, 'TABLET', 75000, 'Standard', 'INFECTION', 'BOTH');

-- ============================================
-- B2B REFRIGERATED - Large Bulk Quantities
-- ============================================

INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern, persona_type) VALUES
('B2B-REF-001', '001', 'Insulin Glargine - Bulk Pack', 'Johnson&Johnson', 'MEDICATIONS', 'Wholesale insulin bulk - 15000 units', 'REFRIGERATED', 75000, 42.50, 5.00, true, 'SYRUP', 15000, '100 units/ml', 'FEVER', 'BOTH'),
('B2B-REF-002', '002', 'COVID-19 Vaccine - Bulk Pack', 'Pfizer', 'MEDICATIONS', 'Wholesale vaccine bulk - 20000 units', 'REFRIGERATED', 100000, 25.75, 5.00, true, 'SYRUP', 20000, '0.3ml', 'INFECTION', 'BOTH'),
('B2B-REF-003', '003', 'Hepatitis B Vaccine - Bulk Pack', 'Merck&Co.Inc', 'MEDICATIONS', 'Bulk vaccine for wholesale - 18000 units', 'REFRIGERATED', 90000, 32.99, 5.00, true, 'SYRUP', 18000, '1ml', 'INFECTION', 'BOTH');

-- Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

-- ============================================
-- UPDATE PERSONA TYPE TO B2B
-- ============================================
-- After inserting, update products to B2B only based on large stock quantities

SET SQL_SAFE_UPDATES = 0;

-- Mark products with VERY LARGE stock (>= threshold * 3) as B2B only
UPDATE product 
SET persona_type = 'B2B'
WHERE quantity >= (threshold_quantity * 3);

SET SQL_SAFE_UPDATES = 1;

-- ============================================
-- VERIFICATION
-- ============================================

-- Count products by persona type
SELECT persona_type, COUNT(*) as count
FROM product 
GROUP BY persona_type;

-- View all B2B products
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

-- Summary: B2B products by category and warehouse
SELECT 
    category,
    warehouse_id,
    COUNT(*) as b2b_count,
    SUM(quantity) as total_stock,
    AVG(quantity) as avg_stock
FROM product
WHERE persona_type = 'B2B'
GROUP BY category, warehouse_id
ORDER BY category, warehouse_id;
