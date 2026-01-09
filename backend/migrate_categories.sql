-- ============================================
-- Category Migration Script
-- ============================================
-- This script migrates old category values to new category enum values
-- Old categories: VACCINE, ANTIBIOTICS, ONCOLOGY, IRRIGATION_SOLUTION, DIABETES, SKIN_CARE, PAIN_RELIEF, HEART_HEALTH, EYE_CARE
-- New categories: MEDICATIONS, SUPPLEMENTS, EQUIPMENTS, SUPPLIES
-- ============================================

-- Disable safe update mode for this session
SET SQL_SAFE_UPDATES = 0;

-- First, ensure the category column is large enough for new values
-- Increase column size to 50 characters if it's smaller
ALTER TABLE product MODIFY COLUMN category VARCHAR(50) NOT NULL;

-- Update VACCINE -> MEDICATIONS
UPDATE product SET category = 'MEDICATIONS' WHERE category = 'VACCINE';

-- Update ANTIBIOTICS -> MEDICATIONS
UPDATE product SET category = 'MEDICATIONS' WHERE category = 'ANTIBIOTICS';

-- Update ONCOLOGY -> MEDICATIONS
UPDATE product SET category = 'MEDICATIONS' WHERE category = 'ONCOLOGY';

-- Update DIABETES -> MEDICATIONS
UPDATE product SET category = 'MEDICATIONS' WHERE category = 'DIABETES';

-- Update PAIN_RELIEF -> MEDICATIONS
UPDATE product SET category = 'MEDICATIONS' WHERE category = 'PAIN_RELIEF';

-- Update HEART_HEALTH -> MEDICATIONS
UPDATE product SET category = 'MEDICATIONS' WHERE category = 'HEART_HEALTH';

-- Update EYE_CARE -> MEDICATIONS
UPDATE product SET category = 'MEDICATIONS' WHERE category = 'EYE_CARE';

-- Update SKIN_CARE -> SUPPLEMENTS (or could be MEDICATIONS, adjust as needed)
UPDATE product SET category = 'SUPPLEMENTS' WHERE category = 'SKIN_CARE';

-- Update IRRIGATION_SOLUTION -> SUPPLIES
UPDATE product SET category = 'SUPPLIES' WHERE category = 'IRRIGATION_SOLUTION';

-- Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

-- Verify the migration
SELECT category, COUNT(*) as count 
FROM product 
GROUP BY category 
ORDER BY category;

-- Expected result should show only:
-- MEDICATIONS, SUPPLEMENTS, EQUIPMENTS, SUPPLIES
