# Backend Changes for Persona Type (B2B/B2C) Implementation

## Summary
Added `persona_type` support to separate products and batches for B2B (MedBiz) and B2C (MedBuddy) personas.

---

## Files Created

### 1. `src/main/java/com/drugmanagement/enums/PersonaType.java`
- **New enum** with values: `B2B`, `B2C`, `BOTH`
- Represents product/batch availability for different personas

---

## Files Modified

### 1. `src/main/java/com/drugmanagement/entity/Product.java`
**Changes:**
- Added `PersonaType personaType` field with `@Enumerated(EnumType.STRING)`
- Default value: `PersonaType.BOTH`
- Added getter/setter for `personaType`

**Field:**
```java
@Enumerated(EnumType.STRING)
@Column(name = "persona_type", nullable = false, length = 10)
private PersonaType personaType = PersonaType.BOTH;
```

### 2. `src/main/java/com/drugmanagement/entity/ProductBatch.java`
**Changes:**
- Added `PersonaType personaType` field
- Updated constructor to include `personaType` parameter
- Added new constructor with `personaType` parameter
- Added getter/setter for `personaType`

**Field:**
```java
@Enumerated(EnumType.STRING)
@Column(name = "persona_type", nullable = false, length = 10)
private PersonaType personaType = PersonaType.BOTH;
```

### 3. `src/main/java/com/drugmanagement/dto/ProductRequest.java`
**Changes:**
- Added `PersonaType personaType` field
- Default value: `PersonaType.BOTH`
- Added getter/setter

**Field:**
```java
private PersonaType personaType = PersonaType.BOTH;
```

### 4. `src/main/java/com/drugmanagement/dto/ProductResponse.java`
**Changes:**
- Added `PersonaType personaType` field
- Added getter/setter

### 5. `src/main/java/com/drugmanagement/service/ProductService.java`
**Changes:**
- Updated `getAllProducts()` method signature to accept `String personaType` parameter
- Added persona_type filtering logic:
  - B2B persona: Shows products with `personaType = B2B` or `BOTH`
  - B2C persona: Shows products with `personaType = B2C` or `BOTH`
- Updated `createProduct()` to map `personaType` from request (defaults to BOTH)
- Updated `updateProduct()` to update `personaType` if provided
- Updated `toResponse()` to include `personaType` in response

**Filtering Logic:**
```java
if (personaTypeEnum == PersonaType.B2B) {
    return p.getPersonaType() == PersonaType.B2B || p.getPersonaType() == PersonaType.BOTH;
} else if (personaTypeEnum == PersonaType.B2C) {
    return p.getPersonaType() == PersonaType.B2C || p.getPersonaType() == PersonaType.BOTH;
}
```

### 6. `src/main/java/com/drugmanagement/controller/ProductController.java`
**Changes:**
- Added `@QueryParam("personaType") String personaType` parameter to `getAllProducts()` endpoint
- Passes `personaType` to service layer

**API Endpoint:**
```
GET /api/products?warehouseId=001&personaType=B2B
GET /api/products?warehouseId=001&personaType=B2C
GET /api/products?warehouseId=001 (shows all products)
```

### 7. `src/main/java/com/drugmanagement/repository/ProductBatchRepository.java`
**Changes:**
- Added `findByPersonaType()` method - filters batches by persona type with BOTH logic
- Added `findBySkuIdAndPersonaType()` method - finds batches for specific SKU and persona type

**New Methods:**
```java
public List<ProductBatch> findByPersonaType(String warehouseId, PersonaType personaType)
public List<ProductBatch> findBySkuIdAndPersonaType(String skuId, String warehouseId, PersonaType personaType)
```

---

## API Changes

### Updated Endpoints

#### GET `/api/products`
**New Query Parameter:**
- `personaType` (optional): `B2B`, `B2C`, or omit for all products

**Example Requests:**
```
GET /api/products?warehouseId=001&personaType=B2B
GET /api/products?warehouseId=001&personaType=B2C
GET /api/products?warehouseId=001&search=paracetamol&personaType=B2B
```

**Response:** ProductResponse objects include `personaType` field

#### POST `/api/products`
**Request Body:** ProductRequest now accepts optional `personaType` field
- If not provided, defaults to `BOTH`
- Valid values: `B2B`, `B2C`, `BOTH`

#### PUT `/api/products/{skuId}`
**Request Body:** ProductRequest can include `personaType` to update product persona
- If provided, updates the persona type
- If not provided, keeps existing value

---

## Business Rules Implemented

### Product Filtering:
- **B2B persona** can see:
  - Products with `personaType = B2B`
  - Products with `personaType = BOTH`
- **B2C persona** can see:
  - Products with `personaType = B2C`
  - Products with `personaType = BOTH`
- **Admin persona** can see all products (no filtering)

### Batch Filtering:
- Repository methods support filtering batches by persona type
- B2B batches (bulk/wholesale) cannot be used for B2C orders
- B2C batches (retail) cannot be used for B2B orders
- BOTH batches can be used by both personas

---

## Pending Implementation

### 1. Batch Validation Logic (Recommended)
Add validation when creating batches to ensure:
- If product `personaType = B2B`, batch can only be `B2B`
- If product `personaType = B2C`, batch can only be `B2C`
- If product `personaType = BOTH`, batch can be `B2B`, `B2C`, or `BOTH` based on quantity

### 2. Update MonitoringService (Recommended)
- Add persona_type filtering to stock levels
- Add persona_type filtering to low stock alerts
- Add persona_type filtering to expiry tracking

### 3. Update DashboardService (Recommended)
- Filter dashboard data by persona_type
- Calculate persona-specific stock values
- Show persona-specific low stock alerts

### 4. Batch Creation Service (Recommended)
- Auto-assign batch persona_type based on:
  - Product persona_type
  - Batch quantity (large = B2B, small = B2C, medium = BOTH)

### 5. Stock Calculation (Recommended)
- Calculate stock separately for each persona:
  - B2B stock = sum of B2B + BOTH batches
  - B2C stock = sum of B2C + BOTH batches

---

## Testing

### Test Cases to Verify:
1. ✅ Create product with `personaType = B2B` → Verify it's saved correctly
2. ✅ Create product with `personaType = B2C` → Verify it's saved correctly
3. ✅ Get products with `personaType=B2B` → Should return B2B and BOTH products
4. ✅ Get products with `personaType=B2C` → Should return B2C and BOTH products
5. ✅ Update product persona_type → Verify update works
6. ✅ ProductResponse includes personaType field
7. ⏳ Batch persona_type validation (pending)
8. ⏳ Batch filtering by persona_type (pending)

---

## Database Migration Required

Before running the backend:
1. Run `migrate_add_persona_type.sql` to add `persona_type` column to `product` table
2. Run `migrate_add_persona_type_to_batch.sql` to add `persona_type` column to `product_batch` table
3. Run `insert_b2b_products.sql` to insert sample B2B products (optional)
4. Run `insert_batch_persona_type_data.sql` to insert sample batches (optional)

---

## Notes

- Default persona_type for new products is `BOTH` (available to both personas)
- Persona_type filtering is optional - if not provided, all products are returned
- Backward compatible: Existing API calls without personaType parameter will continue to work
- Admin persona can see all products regardless of persona_type
