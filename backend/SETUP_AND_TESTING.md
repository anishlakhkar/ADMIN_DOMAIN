# Setup and Testing Guide

## Prerequisites

### Backend Prerequisites
- Java 17 or higher
- Maven 3.8+
- MySQL 8.0+ installed and running
- MySQL Workbench or command-line MySQL client

### Frontend Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Edge)

---

## Database Setup (MySQL)

### 1. Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE drug_management;
```

### 2. Verify Database Connection

Update `application.properties` if your MySQL credentials are different:

```properties
quarkus.datasource.username=admin
quarkus.datasource.password=admin
quarkus.datasource.jdbc.url=jdbc:mysql://localhost:3306/drug_management
```

**Note**: The tables will be automatically created by Hibernate when you first run the application (due to `quarkus.hibernate-orm.database.generation=update`).

---

## Running the Backend

### Option 1: Development Mode (Recommended)

1. Open terminal/command prompt
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Run in development mode:
   ```bash
   # Windows
   mvnw.cmd quarkus:dev
   
   # Linux/Mac
   ./mvnw quarkus:dev
   ```

4. The backend will start at: `http://localhost:8080`
5. API documentation will be available at: `http://localhost:8080/api-docs`

### Option 2: Build and Run JAR

1. Build the project:
   ```bash
   mvn clean package
   ```

2. Run the JAR:
   ```bash
   java -jar target/quarkus-app/quarkus-run.jar
   ```

### Verify Backend is Running

Open your browser and visit:
- `http://localhost:8080/api-docs` - Should show OpenAPI documentation
- `http://localhost:8080/api/products?warehouseId=001` - Should return empty array `{"content":[],"totalElements":0,...}`

---

## Running the Frontend

1. Open a new terminal/command prompt
2. Navigate to the frontend directory:
   ```bash
   cd admin_inventory
   ```

3. Install dependencies (first time only):
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The frontend will start at: `http://localhost:5173` (or the port shown in terminal)

6. Open your browser and navigate to: `http://localhost:5173`

---

## Testing with Postman

### Setup Postman Collection

1. **Base URL**: `http://localhost:8080`

2. **Headers for all requests**:
   - `Content-Type: application/json`
   - `Accept: application/json`

### API Endpoints to Test

#### 1. Get All Products
```
GET http://localhost:8080/api/products?warehouseId=001&page=0&size=20
```

**Query Parameters**:
- `warehouseId` (required): 001, 002, 003, or 004
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 20)
- `search` (optional): Search term for product name or SKU
- `sortBy` (optional): Sort field (name, sku, quantity, price)
- `direction` (optional): ASC or DESC

**Expected Response**:
```json
{
  "content": [],
  "totalElements": 0,
  "totalPages": 0,
  "size": 20,
  "number": 0
}
```

#### 2. Create a Product
```
POST http://localhost:8080/api/products
```

**Request Body**:
```json
{
  "skuId": "MED-001",
  "warehouseId": "001",
  "productName": "Amoxicillin 500mg",
  "manufactureName": "Pfizer",
  "category": "ANTIBIOTICS",
  "description": "Broad spectrum antibiotic",
  "storageType": "AMBIENT",
  "price": 12.50,
  "profitMargin": 5.00,
  "requiredPrescription": true,
  "url": "https://example.com/amoxicillin",
  "dosageForm": "TABLET",
  "thresholdQuantity": 200,
  "strength": "500mg",
  "concern": "INFECTION"
}
```

**Expected Response**: 201 Created with product details

#### 3. Get Product by SKU
```
GET http://localhost:8080/api/products/MED-001?warehouseId=001
```

#### 4. Update Product
```
PUT http://localhost:8080/api/products/MED-001?warehouseId=001
```

**Request Body**: Same as create, with updated values

#### 5. Delete Product
```
DELETE http://localhost:8080/api/products/MED-001?warehouseId=001
```

**Note**: Will fail if product has existing batches

#### 6. Get All Stock
```
GET http://localhost:8080/api/stock?warehouseId=001&page=0&size=20
```

#### 7. Get Stock by SKU
```
GET http://localhost:8080/api/stock/MED-001?warehouseId=001
```

**Expected Response**:
```json
{
  "skuId": "MED-001",
  "warehouseId": "001",
  "warehouseName": "Warehouse 001",
  "productName": "Amoxicillin 500mg",
  "productSku": "MED-001",
  "onHand": 0,
  "reserved": 0,
  "blocked": 0,
  "available": 0,
  "batches": []
}
```

#### 8. Get Low Stock Items
```
GET http://localhost:8080/api/stock/low-stock?warehouseId=001&threshold=100
```

#### 9. Update Stock
```
PUT http://localhost:8080/api/stock/MED-001?warehouseId=001
```

**Request Body**:
```json
{
  "warehouseId": "001",
  "skuId": "MED-001",
  "quantity": 500
}
```

---

## Testing in UI (Frontend)

### 1. Start Both Services

**Terminal 1 - Backend**:
```bash
cd backend
mvnw.cmd quarkus:dev
```

**Terminal 2 - Frontend**:
```bash
cd admin_inventory
npm run dev
```

### 2. Access the Application

1. Open browser: `http://localhost:5173`
2. You'll see the login page
3. **Note**: Since authentication is not fully implemented yet, you may need to:
   - Mock the login response, OR
   - Temporarily disable protected routes for testing

### 3. Test Features

#### Product Catalog Management
1. Navigate to: **Inventory → Catalog Management**
2. Click "Add Product" button
3. Fill in product details
4. Submit and verify product appears in list

#### Product Inventory
1. Navigate to: **Inventory → Product Inventory**
2. View all products
3. Switch to "Update Mode"
4. Edit stock quantities
5. Save changes

#### Stock Monitoring
1. Navigate to: **Monitoring → Stock Levels**
2. View real-time stock information
3. Check **Low Stock Alerts** page
4. View **Expiry Tracking** page

---

## Common Issues and Solutions

### Backend Issues

**Issue**: Port 8080 already in use
- **Solution**: Change port in `application.properties`:
  ```properties
  quarkus.http.port=8081
  ```

**Issue**: Database connection failed
- **Solution**: 
  1. Verify MySQL is running: `mysql -u admin -p`
  2. Check credentials in `application.properties`
  3. Ensure database `drug_management` exists

**Issue**: Tables not created
- **Solution**: Check Hibernate logs. Ensure `quarkus.hibernate-orm.database.generation=update` is set

### Frontend Issues

**Issue**: Cannot connect to backend
- **Solution**: 
  1. Verify backend is running on port 8080
  2. Check `VITE_API_BASE_URL` in frontend `.env` file (if exists)
  3. Check CORS settings in `application.properties`

**Issue**: npm install fails
- **Solution**: 
  1. Clear cache: `npm cache clean --force`
  2. Delete `node_modules` and `package-lock.json`
  3. Run `npm install` again

**Issue**: Port 5173 already in use
- **Solution**: Vite will automatically use next available port, or specify:
  ```bash
  npm run dev -- --port 3000
  ```

---

## Sample Test Data

### Create Sample Products

Use Postman to create these sample products:

**Product 1 - Amoxicillin**:
```json
{
  "skuId": "MED-001",
  "warehouseId": "001",
  "productName": "Amoxicillin 500mg",
  "manufactureName": "Pfizer",
  "category": "ANTIBIOTICS",
  "description": "Broad spectrum antibiotic for bacterial infections",
  "storageType": "AMBIENT",
  "price": 12.50,
  "profitMargin": 5.00,
  "requiredPrescription": true,
  "dosageForm": "TABLET",
  "thresholdQuantity": 200,
  "strength": "500mg",
  "concern": "INFECTION"
}
```

**Product 2 - Ibuprofen**:
```json
{
  "skuId": "MED-002",
  "warehouseId": "001",
  "productName": "Ibuprofen 200mg",
  "manufactureName": "Johnson & Johnson",
  "category": "PAIN_RELIEF",
  "description": "Non-steroidal anti-inflammatory drug",
  "storageType": "AMBIENT",
  "price": 8.75,
  "profitMargin": 5.00,
  "requiredPrescription": false,
  "dosageForm": "TABLET",
  "thresholdQuantity": 200,
  "strength": "200mg",
  "concern": "PAIN"
}
```

**Product 3 - Insulin**:
```json
{
  "skuId": "MED-003",
  "warehouseId": "001",
  "productName": "Insulin Glargine",
  "manufactureName": "Merck & Co. Inc.",
  "category": "DIABETES",
  "description": "Long-acting insulin for diabetes management",
  "storageType": "REFRIGERATED",
  "price": 45.00,
  "profitMargin": 5.00,
  "requiredPrescription": true,
  "dosageForm": "SYRUP",
  "thresholdQuantity": 100,
  "strength": "100 units/ml",
  "concern": null
}
```

### Update Stock for Products

After creating products, update their stock:

**Update Amoxicillin Stock**:
```
PUT http://localhost:8080/api/stock/MED-001?warehouseId=001
Body: {"warehouseId": "001", "skuId": "MED-001", "quantity": 450}
```

**Update Ibuprofen Stock**:
```
PUT http://localhost:8080/api/stock/MED-002?warehouseId=001
Body: {"warehouseId": "001", "skuId": "MED-002", "quantity": 120}
```

---

## API Response Examples

### Successful Product Creation
```json
{
  "skuId": "MED-001",
  "warehouseId": "001",
  "productName": "Amoxicillin 500mg",
  "manufactureName": "Pfizer",
  "category": "ANTIBIOTICS",
  "description": "Broad spectrum antibiotic",
  "storageType": "AMBIENT",
  "quantity": 0,
  "price": 12.50,
  "profitMargin": 5.00,
  "requiredPrescription": true,
  "dosageForm": "TABLET",
  "thresholdQuantity": 200,
  "strength": "500mg",
  "concern": "INFECTION"
}
```

### Error Response
```json
{
  "message": "Product not found with SKU: MED-999 in warehouse: 001"
}
```

---

## Next Steps

1. **Authentication**: Implement JWT authentication for secure API access
2. **Warehouse Setup**: Create initial warehouse records (001, 002, 003, 004)
3. **Zone Setup**: Create zones for each warehouse
4. **Batch Management**: Implement batch creation and expiry tracking
5. **Order Management**: Implement purchase order workflows

---

## Support

If you encounter any issues:
1. Check the backend logs in the terminal
2. Check browser console for frontend errors
3. Verify database connection
4. Ensure both services are running on correct ports
