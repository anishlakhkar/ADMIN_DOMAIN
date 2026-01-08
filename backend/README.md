# Drug Management System - Admin Backend

Quarkus-based backend API for the Admin persona of the Drug Management System.

## Features

- **Product Catalog Management (CRUD)**
  - Create, Read, Update, Delete products
  - Search and filter products by warehouse
  - Pagination and sorting support

- **Stock Management**
  - View stock levels by warehouse
  - Update stock quantities
  - Low stock alerts
  - Batch tracking with expiry dates

- **Warehouse Management**
  - Multi-warehouse support (001, 002, 003, 004)
  - Zone-based storage (Ambient, Frozen, Refrigerated)
  - Capacity tracking

## Technology Stack

- **Framework**: Quarkus 3.8.0
- **Database**: PostgreSQL
- **ORM**: Hibernate ORM with Panache
- **Validation**: Bean Validation
- **API**: RESTEasy Reactive

## Prerequisites

- Java 17 or higher
- Maven 3.8+
- MySQL 8.0+

## Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE drug_management;
```

2. Update `application.properties` with your database credentials:
```properties
quarkus.datasource.username=your_username
quarkus.datasource.password=your_password
quarkus.datasource.jdbc.url=jdbc:mysql://localhost:3306/drug_management
```

## Running the Application

### Development Mode

```bash
cd backend
./mvnw quarkus:dev
```

The API will be available at `http://localhost:8080`

### Production Mode

```bash
./mvnw clean package
java -jar target/quarkus-app/quarkus-run.jar
```

## API Endpoints

### Products

- `GET /api/products` - Get all products (with pagination, search, sorting)
- `GET /api/products/{skuId}` - Get product by SKU
- `POST /api/products` - Create new product
- `PUT /api/products/{skuId}` - Update product
- `DELETE /api/products/{skuId}` - Delete product

### Stock

- `GET /api/stock` - Get all stock (with pagination)
- `GET /api/stock/{skuId}` - Get stock by SKU
- `GET /api/stock/low-stock` - Get low stock items
- `PUT /api/stock/{skuId}` - Update stock quantity

## Query Parameters

### Products Endpoint
- `warehouseId` - Filter by warehouse (default: "001")
- `search` - Search by product name or SKU
- `page` - Page number (default: 0)
- `size` - Page size (default: 20)
- `sortBy` - Sort field (name, sku, quantity, price)
- `direction` - Sort direction (ASC, DESC)

### Stock Endpoint
- `warehouseId` - Filter by warehouse (default: "001")
- `page` - Page number (default: 0)
- `size` - Page size (default: 20)
- `threshold` - Low stock threshold (for low-stock endpoint)

## Database Schema

### Key Tables

- **warehouse** - Warehouse information
- **zone** - Storage zones within warehouses
- **product** - Product catalog
- **product_batch** - Product batches with expiry dates

## Warehouse IDs

The system supports 4 warehouses:
- 001
- 002
- 003
- 004

All operations are warehouse-specific and require a `warehouseId` parameter.

## Storage Types

- **AMBIENT** - Room temperature storage
- **FROZEN** - Freezer storage
- **REFRIGERATED** - Refrigerated storage

## Product Categories

- VACCINE
- ANTIBIOTICS
- ONCOLOGY
- IRRIGATION_SOLUTION
- DIABETES
- SKIN_CARE
- PAIN_RELIEF
- HEART_HEALTH
- EYE_CARE

## Development Notes

- All quantities are stored as `Long` type
- Prices are stored as `BigDecimal` for precision
- Product quantities are automatically calculated from batch quantities
- Zone capacities are updated when stock changes
- Products cannot be deleted if they have existing batches
