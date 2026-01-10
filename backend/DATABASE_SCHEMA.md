# Database Schema Documentation
## Drug Management System - Warehouse Module

---

## Overview
This document describes the database schema for the warehouse management system. The schema supports products divided across B2B and B2C personas (Note: persona_type field needs to be added to Product table).

---

## Tables

### 1. `warehouse`
Stores warehouse information and location data.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| **warehouse_id** | VARCHAR(10) | **PK**, NOT NULL | Primary key - Unique warehouse identifier |
| username | VARCHAR(50) | NOT NULL, UNIQUE | Warehouse login username |
| password | VARCHAR(255) | NOT NULL | Warehouse login password (hashed) |
| latitude | DECIMAL(10,8) | NOT NULL | Warehouse latitude coordinate |
| longitude | DECIMAL(11,8) | NOT NULL | Warehouse longitude coordinate |
| location_pin_code | VARCHAR(10) | NOT NULL | Postal/pin code of warehouse location |
| total_zone | INT | NOT NULL | Total number of zones in this warehouse |

**Primary Key (PK):** `warehouse_id`

**Relationships:**
- One-to-Many with `product` (via warehouse_id)
- One-to-Many with `product_batch` (via warehouse_id)
- One-to-Many with `zone` (via warehouse_id)

---

### 2. `product`
Stores product information and inventory details. Products are warehouse-specific.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| **sku_id** | VARCHAR(50) | **PK** (composite), NOT NULL | Product SKU identifier |
| **warehouse_id** | VARCHAR(10) | **PK** (composite), **FK**, NOT NULL | Foreign key to warehouse table |
| product_name | VARCHAR(255) | NOT NULL | Product name |
| manufacture_name | VARCHAR(100) | NOT NULL | Manufacturer name |
| category | VARCHAR(50) | NOT NULL | Product category (ENUM: MEDICATIONS, SUPPLEMENTS, EQUIPMENTS, SUPPLIES) |
| description | VARCHAR(1000) | NULL | Product description |
| storage_type | VARCHAR(20) | NOT NULL | Storage requirement (ENUM: AMBIENT, REFRIGERATED, FROZEN) |
| quantity | BIGINT | NOT NULL | Current stock quantity |
| price | DECIMAL(10,2) | NOT NULL | Product price |
| profit_margin | DECIMAL(5,2) | NULL, DEFAULT 5.00 | Profit margin percentage |
| required_prescription | BOOLEAN | NOT NULL, DEFAULT false | Whether prescription is required |
| url | VARCHAR(500) | NULL | Product image/URL |
| dosage_form | VARCHAR(20) | NOT NULL | Dosage form (ENUM: TABLET, CAPSULE, SYRUP, OINTMENT, etc.) |
| threshold_quantity | BIGINT | NOT NULL | Minimum stock threshold for alerts |
| strength | VARCHAR(50) | NULL | Product strength (e.g., "500mg") |
| concern | VARCHAR(20) | NULL | Health concern category (ENUM: PAIN, FEVER, INFECTION, etc.) |

**Primary Key (PK):** Composite key on (`sku_id`, `warehouse_id`)

**Unique Constraint:** (`sku_id`, `warehouse_id`) - ensures same SKU can exist in multiple warehouses but unique per warehouse

**Foreign Key (FK):** 
- `warehouse_id` → `warehouse.warehouse_id`

**Note for B2B/B2C:** 
- ⚠️ **MISSING FIELD:** `persona_type` ENUM('B2B', 'B2C') - needs to be added to separate products for B2B and B2C personas

---

### 3. `product_batch`
Stores batch-level inventory tracking with expiry dates.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| **batch_id** | VARCHAR(50) | **PK** (composite), NOT NULL | Unique batch identifier |
| **warehouse_id** | VARCHAR(10) | **PK** (composite), **FK**, NOT NULL | Foreign key to warehouse table |
| **sku_id** | VARCHAR(50) | **PK** (composite), **FK**, NOT NULL | Foreign key to product table (references sku_id) |
| expiry | DATE | NOT NULL | Batch expiry date |
| quantity | BIGINT | NOT NULL | Quantity in this batch |

**Primary Key (PK):** Composite key on (`batch_id`, `warehouse_id`, `sku_id`)

**Unique Constraint:** (`batch_id`, `warehouse_id`, `sku_id`)

**Foreign Keys (FK):**
- `warehouse_id` → `warehouse.warehouse_id`
- (`sku_id`, `warehouse_id`) → `product(sku_id, warehouse_id)` (composite FK reference)

**Relationships:**
- Many-to-One with `product` (via sku_id + warehouse_id composite)
- Many-to-One with `warehouse` (via warehouse_id)

---

### 4. `zone`
Stores zone information within warehouses for storage type management.

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| **id** | BIGINT | **PK**, AUTO_INCREMENT | Auto-generated primary key |
| warehouse_id | VARCHAR(10) | **FK**, NOT NULL | Foreign key to warehouse table |
| storage_type | VARCHAR(20) | NOT NULL | Storage type (ENUM: AMBIENT, REFRIGERATED, FROZEN) |
| total_capacity | INT | NOT NULL | Maximum capacity of the zone |
| current_capacity | INT | NOT NULL | Current occupied capacity |

**Primary Key (PK):** `id` (auto-increment)

**Foreign Key (FK):**
- `warehouse_id` → `warehouse.warehouse_id`

**Relationships:**
- Many-to-One with `warehouse` (via warehouse_id)
- One-to-Many with `zone_product_list` (via id as zone_id)

---

### 5. `zone_product_list`
Junction table storing product quantities within each zone (ElementCollection map).

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| **zone_id** | BIGINT | **FK**, NOT NULL | Foreign key to zone.id |
| **sku_id** | VARCHAR(50) | NOT NULL | Product SKU identifier (map key) |
| **quantity** | INT | NOT NULL | Quantity of this SKU in the zone |

**Primary Key (PK):** Composite key on (`zone_id`, `sku_id`) - implicit through JPA ElementCollection

**Foreign Key (FK):**
- `zone_id` → `zone.id`

**Note:** This is a collection table created by Hibernate's `@ElementCollection` and `@CollectionTable` annotations.

---

## Entity Relationship Diagram (ERD)

```
warehouse (1) ────────< (M) product
   │                      │
   │                      │
   │ (1)                  │ (1)
   │                      │
   │                      │
   └───────< (M) product_batch (M) ─────┘
   │
   │ (1)
   │
   └───────< (M) zone (1) ──────< (M) zone_product_list
```

---

## Foreign Key Relationships Summary

| From Table | From Column(s) | To Table | To Column(s) | Relationship Type |
|-----------|----------------|----------|--------------|-------------------|
| product | warehouse_id | warehouse | warehouse_id | Many-to-One |
| product_batch | warehouse_id | warehouse | warehouse_id | Many-to-One |
| product_batch | (sku_id, warehouse_id) | product | (sku_id, warehouse_id) | Many-to-One (Composite) |
| zone | warehouse_id | warehouse | warehouse_id | Many-to-One |
| zone_product_list | zone_id | zone | id | Many-to-One |

**Note:** The relationship between `product_batch` and `product` uses a composite foreign key referencing both `sku_id` and `warehouse_id` together.

---

## Key Constraints

### Unique Constraints
1. **warehouse.username** - Unique username per warehouse
2. **product(sku_id, warehouse_id)** - Unique product SKU per warehouse
3. **product_batch(batch_id, warehouse_id, sku_id)** - Unique batch per product per warehouse

### NOT NULL Constraints
- All primary key columns
- All foreign key columns
- Critical business fields (product_name, manufacture_name, category, price, quantity, etc.)

---

## Enums Used

### Category (VARCHAR(50))
- `MEDICATIONS`
- `SUPPLEMENTS`
- `EQUIPMENTS`
- `SUPPLIES`

### StorageType (VARCHAR(20))
- `AMBIENT`
- `REFRIGERATED`
- `FROZEN`

### DosageForm (VARCHAR(20))
- `TABLET`
- `CAPSULE`
- `SYRUP`
- `OINTMENT`
- (Other values as defined in enum)

### Concern (VARCHAR(20))
- `PAIN`
- `FEVER`
- `INFECTION`
- (Other values as defined in enum)

---

## Recommended Schema Changes for B2B/B2C Separation

### Add to `product` table:

```sql
ALTER TABLE product 
ADD COLUMN persona_type ENUM('B2B', 'B2C', 'BOTH') NOT NULL DEFAULT 'BOTH';

-- OR if ENUM not supported, use VARCHAR:
ALTER TABLE product 
ADD COLUMN persona_type VARCHAR(10) NOT NULL DEFAULT 'BOTH' 
CHECK (persona_type IN ('B2B', 'B2C', 'BOTH'));
```

**Impact:**
- Allows filtering products by persona type (B2B, B2C, or both)
- Enables persona-specific product catalogs
- Supports different pricing/availability per persona

---

## Indexes (Recommended)

Consider adding indexes on frequently queried columns:

```sql
-- For warehouse lookups
CREATE INDEX idx_product_warehouse ON product(warehouse_id);
CREATE INDEX idx_product_batch_warehouse ON product_batch(warehouse_id);

-- For category filtering
CREATE INDEX idx_product_category ON product(category);

-- For persona type filtering (after adding persona_type)
CREATE INDEX idx_product_persona ON product(persona_type);

-- For expiry tracking
CREATE INDEX idx_product_batch_expiry ON product_batch(expiry);

-- For low stock alerts
CREATE INDEX idx_product_quantity ON product(quantity, threshold_quantity);
```

---

## Notes

1. **Composite Primary Keys**: Both `product` and `product_batch` use composite primary keys to support the same SKU/batch existing across multiple warehouses.

2. **Zone Product List**: The `zone_product_list` table is managed automatically by Hibernate through the `@ElementCollection` annotation on the `Zone` entity's `productList` field.

3. **No Explicit JPA Relationships**: Currently, entities use `String` foreign key fields instead of `@ManyToOne`/`@OneToMany` JPA relationships. This means referential integrity must be managed at the application level.

4. **Quantity Tracking**: Product quantity in `product` table should be the sum of all `product_batch.quantity` for that SKU in that warehouse.

5. **B2B/B2C Separation**: The schema currently does not have a field to separate products for B2B and B2C personas. This needs to be added as mentioned above.
