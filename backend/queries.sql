-- ============================================
-- SQL Queries to Populate Drug Management Database
-- ============================================
-- Note: Warehouses (001, 002, 003, 004) are created by StartupService
-- This file contains INSERT statements for Zones, Products, and ProductBatches

-- ============================================
-- 1. ZONES - Create zones for each warehouse
-- ============================================
-- Each warehouse has 3 zones: AMBIENT, FROZEN, REFRIGERATED

-- Warehouse 001 Zones
INSERT INTO zone (warehouse_id, storage_type, total_capacity, current_capacity) VALUES
('001', 'AMBIENT', 10000, 7500),
('001', 'FROZEN', 5000, 3200),
('001', 'REFRIGERATED', 8000, 5800);

-- Warehouse 002 Zones
INSERT INTO zone (warehouse_id, storage_type, total_capacity, current_capacity) VALUES
('002', 'AMBIENT', 12000, 9200),
('002', 'FROZEN', 6000, 4100),
('002', 'REFRIGERATED', 9000, 6700);

-- Warehouse 003 Zones
INSERT INTO zone (warehouse_id, storage_type, total_capacity, current_capacity) VALUES
('003', 'AMBIENT', 11000, 8100),
('003', 'FROZEN', 5500, 3800),
('003', 'REFRIGERATED', 8500, 6200);

-- Warehouse 004 Zones
INSERT INTO zone (warehouse_id, storage_type, total_capacity, current_capacity) VALUES
('004', 'AMBIENT', 13000, 9800),
('004', 'FROZEN', 6500, 4500),
('004', 'REFRIGERATED', 9500, 7200);

-- ============================================
-- 2. PRODUCTS - Diverse product catalog
-- ============================================

-- VACCINES (REFRIGERATED)
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('VAC-001', '001', 'COVID-19 Vaccine', 'Pfizer', 'VACCINE', 'mRNA vaccine for COVID-19 prevention', 'REFRIGERATED', 2500, 25.99, 5.00, true, 'SYRUP', 500, '0.3ml', 'INFECTION'),
('VAC-002', '001', 'Influenza Vaccine', 'Johnson&Johnson', 'VACCINE', 'Seasonal flu vaccine', 'REFRIGERATED', 1800, 18.50, 5.00, true, 'SYRUP', 400, '0.5ml', 'INFECTION'),
('VAC-003', '002', 'Hepatitis B Vaccine', 'Merck&Co.Inc', 'VACCINE', 'Hepatitis B prevention vaccine', 'REFRIGERATED', 1200, 32.75, 5.00, true, 'SYRUP', 300, '1ml', 'INFECTION'),
('VAC-004', '003', 'MMR Vaccine', 'Pfizer', 'VACCINE', 'Measles, Mumps, Rubella vaccine', 'REFRIGERATED', 950, 28.99, 5.00, true, 'SYRUP', 250, '0.5ml', 'INFECTION');

-- ANTIBIOTICS (AMBIENT)
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('ANT-001', '001', 'Amoxicillin 500mg', 'Pfizer', 'ANTIBIOTICS', 'Broad spectrum antibiotic for bacterial infections', 'AMBIENT', 4500, 12.50, 5.00, true, 'TABLET', 500, '500mg', 'INFECTION'),
('ANT-002', '001', 'Azithromycin 250mg', 'Pfizer', 'ANTIBIOTICS', 'Macrolide antibiotic for respiratory infections', 'AMBIENT', 3200, 15.75, 5.00, true, 'CAPSULE', 400, '250mg', 'INFECTION'),
('ANT-003', '002', 'Ciprofloxacin 500mg', 'Johnson&Johnson', 'ANTIBIOTICS', 'Fluoroquinolone antibiotic', 'AMBIENT', 2800, 18.99, 5.00, true, 'TABLET', 350, '500mg', 'INFECTION'),
('ANT-004', '002', 'Doxycycline 100mg', 'Merck&Co.Inc', 'ANTIBIOTICS', 'Tetracycline antibiotic', 'AMBIENT', 2100, 14.25, 5.00, true, 'CAPSULE', 300, '100mg', 'INFECTION'),
('ANT-005', '003', 'Penicillin V 250mg', 'Pfizer', 'ANTIBIOTICS', 'Penicillin antibiotic', 'AMBIENT', 3800, 10.99, 5.00, true, 'TABLET', 450, '250mg', 'INFECTION'),
('ANT-006', '004', 'Cephalexin 500mg', 'Johnson&Johnson', 'ANTIBIOTICS', 'Cephalosporin antibiotic', 'AMBIENT', 2900, 16.50, 5.00, true, 'CAPSULE', 400, '500mg', 'INFECTION');

-- ONCOLOGY (REFRIGERATED)
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('ONC-001', '001', 'Paclitaxel Injection', 'Pfizer', 'ONCOLOGY', 'Chemotherapy medication', 'REFRIGERATED', 150, 1250.00, 5.00, true, 'SYRUP', 50, '30mg/5ml', 'PAIN'),
('ONC-002', '002', 'Cisplatin Injection', 'Merck&Co.Inc', 'ONCOLOGY', 'Platinum-based chemotherapy', 'REFRIGERATED', 120, 980.50, 5.00, true, 'SYRUP', 40, '50mg/10ml', 'PAIN'),
('ONC-003', '003', 'Doxorubicin Injection', 'Johnson&Johnson', 'ONCOLOGY', 'Anthracycline chemotherapy', 'REFRIGERATED', 95, 1150.75, 5.00, true, 'SYRUP', 30, '10mg/5ml', 'PAIN');

-- IRRIGATION SOLUTION (AMBIENT)
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('IRR-001', '001', 'Normal Saline 0.9%', 'Johnson&Johnson', 'IRRIGATION_SOLUTION', 'Sterile saline solution for irrigation', 'AMBIENT', 8000, 8.99, 5.00, false, 'SYRUP', 1000, '500ml', 'INFECTION'),
('IRR-002', '002', 'Lactated Ringers Solution', 'Pfizer', 'IRRIGATION_SOLUTION', 'Balanced electrolyte solution', 'AMBIENT', 6500, 9.50, 5.00, false, 'SYRUP', 800, '1000ml', 'INFECTION'),
('IRR-003', '003', 'Dextrose 5% Solution', 'Merck&Co.Inc', 'IRRIGATION_SOLUTION', 'Dextrose solution for hydration', 'AMBIENT', 7200, 7.75, 5.00, false, 'SYRUP', 900, '500ml', 'INFECTION');

-- DIABETES (AMBIENT)
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('DIA-001', '001', 'Metformin 500mg', 'Pfizer', 'DIABETES', 'Type 2 diabetes medication', 'AMBIENT', 5200, 11.99, 5.00, true, 'TABLET', 600, '500mg', 'FEVER'),
('DIA-002', '001', 'Insulin Glargine', 'Johnson&Johnson', 'DIABETES', 'Long-acting insulin', 'REFRIGERATED', 1800, 45.50, 5.00, true, 'SYRUP', 300, '100 units/ml', 'FEVER'),
('DIA-003', '002', 'Gliclazide 80mg', 'Merck&Co.Inc', 'DIABETES', 'Sulfonylurea for diabetes', 'AMBIENT', 3100, 13.25, 5.00, true, 'TABLET', 400, '80mg', 'FEVER'),
('DIA-004', '003', 'Sitagliptin 100mg', 'Pfizer', 'DIABETES', 'DPP-4 inhibitor', 'AMBIENT', 2400, 28.99, 5.00, true, 'TABLET', 350, '100mg', 'FEVER'),
('DIA-005', '004', 'Insulin Lispro', 'Johnson&Johnson', 'DIABETES', 'Rapid-acting insulin', 'REFRIGERATED', 1600, 42.75, 5.00, true, 'SYRUP', 250, '100 units/ml', 'FEVER');

-- SKIN CARE (AMBIENT)
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('SKN-001', '001', 'Hydrocortisone Cream 1%', 'Pfizer', 'SKIN_CARE', 'Topical corticosteroid for skin inflammation', 'AMBIENT', 4200, 9.99, 5.00, false, 'OINTMENT', 500, '1%', 'PAIN'),
('SKN-002', '002', 'Clotrimazole Cream', 'Johnson&Johnson', 'SKIN_CARE', 'Antifungal cream', 'AMBIENT', 3800, 8.50, 5.00, false, 'OINTMENT', 450, '1%', 'INFECTION'),
('SKN-003', '003', 'Benzoyl Peroxide Gel', 'Merck&Co.Inc', 'SKIN_CARE', 'Acne treatment gel', 'AMBIENT', 3500, 7.75, 5.00, false, 'OINTMENT', 400, '5%', 'INFECTION'),
('SKN-004', '004', 'Mupirocin Ointment', 'Pfizer', 'SKIN_CARE', 'Antibacterial ointment', 'AMBIENT', 2900, 12.99, 5.00, true, 'OINTMENT', 350, '2%', 'INFECTION');

-- PAIN RELIEF (AMBIENT)
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('PNR-001', '001', 'Ibuprofen 400mg', 'Pfizer', 'PAIN_RELIEF', 'NSAID for pain and inflammation', 'AMBIENT', 6800, 6.99, 5.00, false, 'TABLET', 800, '400mg', 'PAIN'),
('PNR-002', '001', 'Acetaminophen 500mg', 'Johnson&Johnson', 'PAIN_RELIEF', 'Pain reliever and fever reducer', 'AMBIENT', 7500, 5.50, 5.00, false, 'TABLET', 900, '500mg', 'FEVER'),
('PNR-003', '002', 'Naproxen 500mg', 'Merck&Co.Inc', 'PAIN_RELIEF', 'NSAID for pain relief', 'AMBIENT', 5200, 8.25, 5.00, false, 'TABLET', 600, '500mg', 'PAIN'),
('PNR-004', '003', 'Tramadol 50mg', 'Pfizer', 'PAIN_RELIEF', 'Opioid pain medication', 'AMBIENT', 1800, 15.99, 5.00, true, 'CAPSULE', 250, '50mg', 'PAIN'),
('PNR-005', '004', 'Aspirin 81mg', 'Johnson&Johnson', 'PAIN_RELIEF', 'Low-dose aspirin for heart health', 'AMBIENT', 9200, 4.99, 5.00, false, 'TABLET', 1000, '81mg', 'PAIN');

-- HEART HEALTH (AMBIENT)
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('HRT-001', '001', 'Atorvastatin 20mg', 'Pfizer', 'HEART_HEALTH', 'Cholesterol-lowering medication', 'AMBIENT', 4800, 22.50, 5.00, true, 'TABLET', 600, '20mg', 'FEVER'),
('HRT-002', '002', 'Lisinopril 10mg', 'Merck&Co.Inc', 'HEART_HEALTH', 'ACE inhibitor for blood pressure', 'AMBIENT', 4100, 18.99, 5.00, true, 'TABLET', 500, '10mg', 'FEVER'),
('HRT-003', '003', 'Metoprolol 50mg', 'Johnson&Johnson', 'HEART_HEALTH', 'Beta-blocker for heart conditions', 'AMBIENT', 3600, 16.75, 5.00, true, 'TABLET', 450, '50mg', 'FEVER'),
('HRT-004', '004', 'Amlodipine 5mg', 'Pfizer', 'HEART_HEALTH', 'Calcium channel blocker', 'AMBIENT', 3900, 19.50, 5.00, true, 'TABLET', 500, '5mg', 'FEVER'),
('HRT-005', '001', 'Warfarin 5mg', 'Merck&Co.Inc', 'HEART_HEALTH', 'Blood thinner medication', 'AMBIENT', 2200, 14.99, 5.00, true, 'TABLET', 300, '5mg', 'FEVER');

-- EYE CARE (AMBIENT)
INSERT INTO product (sku_id, warehouse_id, product_name, manufacture_name, category, description, storage_type, quantity, price, profit_margin, required_prescription, dosage_form, threshold_quantity, strength, concern) VALUES
('EYE-001', '001', 'Artificial Tears', 'Johnson&Johnson', 'EYE_CARE', 'Lubricating eye drops', 'AMBIENT', 5600, 7.99, 5.00, false, 'SYRUP', 700, '15ml', 'PAIN'),
('EYE-002', '002', 'Tobramycin Eye Drops', 'Pfizer', 'EYE_CARE', 'Antibiotic eye drops', 'REFRIGERATED', 2100, 18.50, 5.00, true, 'SYRUP', 300, '0.3%', 'INFECTION'),
('EYE-003', '003', 'Timolol Eye Drops', 'Merck&Co.Inc', 'EYE_CARE', 'Glaucoma medication', 'AMBIENT', 1800, 24.99, 5.00, true, 'SYRUP', 250, '0.5%', 'PAIN'),
('EYE-004', '004', 'Cyclosporine Eye Drops', 'Johnson&Johnson', 'EYE_CARE', 'Dry eye treatment', 'REFRIGERATED', 1500, 35.75, 5.00, true, 'SYRUP', 200, '0.05%', 'PAIN');

-- ============================================
-- 3. PRODUCT BATCHES - With various expiry dates
-- ============================================
-- Mix of batches: some expiring soon (for alerts), some far out, some expired

-- VACCINES - Warehouse 001
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('VAC-001-B001', '001', 'VAC-001', DATE_ADD(CURDATE(), INTERVAL 2 MONTH), 800),
('VAC-001-B002', '001', 'VAC-001', DATE_ADD(CURDATE(), INTERVAL 8 MONTH), 1000),
('VAC-001-B003', '001', 'VAC-001', DATE_ADD(CURDATE(), INTERVAL 10 MONTH), 700),
('VAC-002-B001', '001', 'VAC-002', DATE_ADD(CURDATE(), INTERVAL 3 MONTH), 600),
('VAC-002-B002', '001', 'VAC-002', DATE_ADD(CURDATE(), INTERVAL 9 MONTH), 1200);

-- ANTIBIOTICS - Warehouse 001 (Mix of stock levels)
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('ANT-001-B001', '001', 'ANT-001', DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 1500),
('ANT-001-B002', '001', 'ANT-001', DATE_ADD(CURDATE(), INTERVAL 9 MONTH), 2000),
('ANT-001-B003', '001', 'ANT-001', DATE_ADD(CURDATE(), INTERVAL 10 MONTH), 1000),
('ANT-002-B001', '001', 'ANT-002', DATE_ADD(CURDATE(), INTERVAL 7 MONTH), 1200),
('ANT-002-B002', '001', 'ANT-002', DATE_ADD(CURDATE(), INTERVAL 10 MONTH), 2000);

-- ANTIBIOTICS - Warehouse 002
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('ANT-003-B001', '002', 'ANT-003', DATE_ADD(CURDATE(), INTERVAL 1 MONTH), 800),  -- Expiring soon
('ANT-003-B002', '002', 'ANT-003', DATE_ADD(CURDATE(), INTERVAL 8 MONTH), 2000),
('ANT-004-B001', '002', 'ANT-004', DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 1000),
('ANT-004-B002', '002', 'ANT-004', DATE_ADD(CURDATE(), INTERVAL 9 MONTH), 1100);

-- ONCOLOGY - Warehouse 001 (Low stock, high value)
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('ONC-001-B001', '001', 'ONC-001', DATE_ADD(CURDATE(), INTERVAL 4 MONTH), 50),
('ONC-001-B002', '001', 'ONC-001', DATE_ADD(CURDATE(), INTERVAL 7 MONTH), 100);

-- IRRIGATION SOLUTION - Warehouse 001
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('IRR-001-B001', '001', 'IRR-001', DATE_ADD(CURDATE(), INTERVAL 5 MONTH), 3000),
('IRR-001-B002', '001', 'IRR-001', DATE_ADD(CURDATE(), INTERVAL 9 MONTH), 5000);

-- DIABETES - Warehouse 001
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('DIA-001-B001', '001', 'DIA-001', DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 2000),
('DIA-001-B002', '001', 'DIA-001', DATE_ADD(CURDATE(), INTERVAL 10 MONTH), 3200),
('DIA-002-B001', '001', 'DIA-002', DATE_ADD(CURDATE(), INTERVAL 2 MONTH), 600),  -- Expiring soon
('DIA-002-B002', '001', 'DIA-002', DATE_ADD(CURDATE(), INTERVAL 8 MONTH), 1200);

-- DIABETES - Warehouse 002
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('DIA-003-B001', '002', 'DIA-003', DATE_ADD(CURDATE(), INTERVAL 7 MONTH), 1500),
('DIA-003-B002', '002', 'DIA-003', DATE_ADD(CURDATE(), INTERVAL 10 MONTH), 1600);

-- SKIN CARE - Warehouse 001
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('SKN-001-B001', '001', 'SKN-001', DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 2000),
('SKN-001-B002', '001', 'SKN-001', DATE_ADD(CURDATE(), INTERVAL 9 MONTH), 2200),
('SKN-002-B001', '002', 'SKN-002', DATE_ADD(CURDATE(), INTERVAL 3 MONTH), 1500),  -- Expiring soon
('SKN-002-B002', '002', 'SKN-002', DATE_ADD(CURDATE(), INTERVAL 8 MONTH), 2300);

-- PAIN RELIEF - Warehouse 001 (High volume)
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('PNR-001-B001', '001', 'PNR-001', DATE_ADD(CURDATE(), INTERVAL 7 MONTH), 3000),
('PNR-001-B002', '001', 'PNR-001', DATE_ADD(CURDATE(), INTERVAL 10 MONTH), 3800),
('PNR-002-B001', '001', 'PNR-002', DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 4000),
('PNR-002-B002', '001', 'PNR-002', DATE_ADD(CURDATE(), INTERVAL 9 MONTH), 3500);

-- PAIN RELIEF - Warehouse 002
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('PNR-003-B001', '002', 'PNR-003', DATE_ADD(CURDATE(), INTERVAL 8 MONTH), 2500),
('PNR-003-B002', '002', 'PNR-003', DATE_ADD(CURDATE(), INTERVAL 10 MONTH), 2700);

-- HEART HEALTH - Warehouse 001
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('HRT-001-B001', '001', 'HRT-001', DATE_ADD(CURDATE(), INTERVAL 5 MONTH), 2000),
('HRT-001-B002', '001', 'HRT-001', DATE_ADD(CURDATE(), INTERVAL 9 MONTH), 2800),
('HRT-002-B001', '002', 'HRT-002', DATE_ADD(CURDATE(), INTERVAL 1 MONTH), 1500),  -- Expiring soon
('HRT-002-B002', '002', 'HRT-002', DATE_ADD(CURDATE(), INTERVAL 8 MONTH), 2600);

-- HEART HEALTH - Warehouse 003
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('HRT-003-B001', '003', 'HRT-003', DATE_ADD(CURDATE(), INTERVAL 7 MONTH), 1800),
('HRT-003-B002', '003', 'HRT-003', DATE_ADD(CURDATE(), INTERVAL 10 MONTH), 1800);

-- EYE CARE - Warehouse 001
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('EYE-001-B001', '001', 'EYE-001', DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 3000),
('EYE-001-B002', '001', 'EYE-001', DATE_ADD(CURDATE(), INTERVAL 9 MONTH), 2600),
('EYE-002-B001', '002', 'EYE-002', DATE_ADD(CURDATE(), INTERVAL 2 MONTH), 800),  -- Expiring soon
('EYE-002-B002', '002', 'EYE-002', DATE_ADD(CURDATE(), INTERVAL 7 MONTH), 1300);

-- Add more products to other warehouses for diversity
-- Warehouse 002 - Additional products
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('VAC-003-B001', '002', 'VAC-003', DATE_ADD(CURDATE(), INTERVAL 4 MONTH), 500),
('VAC-003-B002', '002', 'VAC-003', DATE_ADD(CURDATE(), INTERVAL 9 MONTH), 700),
('ANT-005-B001', '003', 'ANT-005', DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 2000),
('ANT-005-B002', '003', 'ANT-005', DATE_ADD(CURDATE(), INTERVAL 10 MONTH), 1800);

-- Warehouse 003 - Additional products
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('VAC-004-B001', '003', 'VAC-004', DATE_ADD(CURDATE(), INTERVAL 3 MONTH), 400),
('VAC-004-B002', '003', 'VAC-004', DATE_ADD(CURDATE(), INTERVAL 8 MONTH), 550),
('ONC-002-B001', '002', 'ONC-002', DATE_ADD(CURDATE(), INTERVAL 5 MONTH), 60),
('ONC-002-B002', '002', 'ONC-002', DATE_ADD(CURDATE(), INTERVAL 8 MONTH), 60);

-- Warehouse 004 - Additional products
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('ANT-006-B001', '004', 'ANT-006', DATE_ADD(CURDATE(), INTERVAL 7 MONTH), 1500),
('ANT-006-B002', '004', 'ANT-006', DATE_ADD(CURDATE(), INTERVAL 10 MONTH), 1400),
('DIA-004-B001', '003', 'DIA-004', DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 1200),
('DIA-004-B002', '003', 'DIA-004', DATE_ADD(CURDATE(), INTERVAL 9 MONTH), 1200),
('DIA-005-B001', '004', 'DIA-005', DATE_ADD(CURDATE(), INTERVAL 2 MONTH), 700),  -- Expiring soon
('DIA-005-B002', '004', 'DIA-005', DATE_ADD(CURDATE(), INTERVAL 7 MONTH), 900);

-- More products for Warehouse 004
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('SKN-003-B001', '003', 'SKN-003', DATE_ADD(CURDATE(), INTERVAL 5 MONTH), 1800),
('SKN-003-B002', '003', 'SKN-003', DATE_ADD(CURDATE(), INTERVAL 8 MONTH), 1700),
('SKN-004-B001', '004', 'SKN-004', DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 1500),
('SKN-004-B002', '004', 'SKN-004', DATE_ADD(CURDATE(), INTERVAL 9 MONTH), 1400),
('PNR-004-B001', '003', 'PNR-004', DATE_ADD(CURDATE(), INTERVAL 4 MONTH), 900),
('PNR-004-B002', '003', 'PNR-004', DATE_ADD(CURDATE(), INTERVAL 8 MONTH), 900),
('PNR-005-B001', '004', 'PNR-005', DATE_ADD(CURDATE(), INTERVAL 7 MONTH), 5000),
('PNR-005-B002', '004', 'PNR-005', DATE_ADD(CURDATE(), INTERVAL 10 MONTH), 4200);

-- More Heart Health and Eye Care
INSERT INTO product_batch (batch_id, warehouse_id, sku_id, expiry, quantity) VALUES
('HRT-004-B001', '004', 'HRT-004', DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 2000),
('HRT-004-B002', '004', 'HRT-004', DATE_ADD(CURDATE(), INTERVAL 9 MONTH), 1900),
('HRT-005-B001', '001', 'HRT-005', DATE_ADD(CURDATE(), INTERVAL 1 MONTH), 1000),  -- Expiring soon
('HRT-005-B002', '001', 'HRT-005', DATE_ADD(CURDATE(), INTERVAL 7 MONTH), 1200),
('EYE-003-B001', '003', 'EYE-003', DATE_ADD(CURDATE(), INTERVAL 5 MONTH), 900),
('EYE-003-B002', '003', 'EYE-003', DATE_ADD(CURDATE(), INTERVAL 8 MONTH), 900),
('EYE-004-B001', '004', 'EYE-004', DATE_ADD(CURDATE(), INTERVAL 3 MONTH), 700),  -- Expiring soon
('EYE-004-B002', '004', 'EYE-004', DATE_ADD(CURDATE(), INTERVAL 6 MONTH), 800);

-- ============================================
-- NOTES:
-- ============================================
-- 1. Some batches are expiring soon (1-3 months) to test expiry alerts
-- 2. Some products have low stock (below threshold) to test low stock alerts
-- 3. Products are distributed across all 4 warehouses
-- 4. Mix of storage types: AMBIENT, FROZEN, REFRIGERATED
-- 5. All categories are represented
-- 6. Prices are in USD
-- 7. After running these queries, product quantities will need to be updated
--    to match the sum of batch quantities (this is handled by the backend service)
