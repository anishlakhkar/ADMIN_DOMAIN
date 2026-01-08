# Quick Start Guide - Drug Management System

## 🚀 Quick Start (5 Minutes)

### Step 1: Setup Database (MySQL)

1. Open MySQL command line or MySQL Workbench
2. Create database:
   ```sql
   CREATE DATABASE drug_management;
   ```
3. Verify your MySQL credentials match `backend/src/main/resources/application.properties`

### Step 2: Start Backend

Open **Terminal 1**:
```bash
cd backend
mvnw.cmd quarkus:dev
```

Wait for: `Listening on: http://localhost:8080`

### Step 3: Start Frontend

Open **Terminal 2**:
```bash
cd admin_inventory
npm install    # First time only
npm run dev
```

Wait for: `Local: http://localhost:5173`

### Step 4: Test

1. **Backend Test**: Open browser → `http://localhost:8080/api/products?warehouseId=001`
   - Should return: `{"content":[],"totalElements":0,...}`

2. **Frontend Test**: Open browser → `http://localhost:5173`
   - Should see login page

---

## 📋 Detailed Instructions

### Backend Setup

**Requirements**:
- Java 17+
- Maven 3.8+
- MySQL 8.0+

**Steps**:
1. Navigate to `backend` folder
2. Run: `mvnw.cmd quarkus:dev` (Windows) or `./mvnw quarkus:dev` (Linux/Mac)
3. Backend runs on: `http://localhost:8080`
4. API docs: `http://localhost:8080/api-docs`

**Database Configuration**:
- File: `backend/src/main/resources/application.properties`
- Default: `jdbc:mysql://localhost:3306/drug_management`
- Username: `admin`, Password: `admin`
- Tables auto-created on first run

### Frontend Setup

**Requirements**:
- Node.js 18+
- npm

**Steps**:
1. Navigate to `admin_inventory` folder
2. Run: `npm install` (first time only)
3. Run: `npm run dev`
4. Frontend runs on: `http://localhost:5173`

**API Configuration**:
- Frontend connects to: `http://localhost:8080/api` (default)
- Configured in: `admin_inventory/src/sevices/api.ts`

---

## 🧪 Testing Options

### Option 1: Postman Testing

1. **Import Collection**:
   - File: `backend/POSTMAN_COLLECTION.json`
   - Import into Postman

2. **Set Variables**:
   - `baseUrl`: `http://localhost:8080`
   - `warehouseId`: `001`

3. **Test Endpoints**:
   - Get All Products: `GET /api/products?warehouseId=001`
   - Create Product: `POST /api/products` (with JSON body)
   - Get Stock: `GET /api/stock?warehouseId=001`
   - Update Stock: `PUT /api/stock/MED-001?warehouseId=001`

### Option 2: UI Testing

1. Start both backend and frontend
2. Open: `http://localhost:5173`
3. Navigate through:
   - **Inventory → Catalog Management** (Add/View products)
   - **Inventory → Product Inventory** (View/Update stock)
   - **Monitoring → Stock Levels** (View stock data)

### Option 3: Browser Testing

**Test Backend Directly**:
```
http://localhost:8080/api/products?warehouseId=001
http://localhost:8080/api/stock?warehouseId=001
http://localhost:8080/api/stock/low-stock?warehouseId=001
```

---

## 📝 Sample API Requests

### Create a Product

**POST** `http://localhost:8080/api/products`

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
  "dosageForm": "TABLET",
  "thresholdQuantity": 200,
  "strength": "500mg",
  "concern": "INFECTION"
}
```

### Update Stock

**PUT** `http://localhost:8080/api/stock/MED-001?warehouseId=001`

```json
{
  "warehouseId": "001",
  "skuId": "MED-001",
  "quantity": 500
}
```

---

## 🔧 Troubleshooting

### Backend Won't Start
- ✅ Check Java version: `java -version` (need 17+)
- ✅ Check MySQL is running
- ✅ Verify database exists: `SHOW DATABASES;`
- ✅ Check port 8080 is free

### Frontend Won't Start
- ✅ Check Node version: `node -v` (need 18+)
- ✅ Delete `node_modules` and run `npm install` again
- ✅ Check port 5173 is free

### API Connection Issues
- ✅ Verify backend is running: `http://localhost:8080/api-docs`
- ✅ Check CORS settings in `application.properties`
- ✅ Verify API base URL in frontend code

### Database Connection Failed
- ✅ Verify MySQL is running: `mysql -u admin -p`
- ✅ Check credentials in `application.properties`
- ✅ Ensure database `drug_management` exists

---

## 📚 More Information

- **Detailed Setup**: See `backend/SETUP_AND_TESTING.md`
- **API Documentation**: `http://localhost:8080/api-docs` (when backend is running)
- **Postman Collection**: `backend/POSTMAN_COLLECTION.json`

---

## ✅ Verification Checklist

- [ ] MySQL database created
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access `http://localhost:8080/api-docs`
- [ ] Can access `http://localhost:5173`
- [ ] Can create a product via Postman/API
- [ ] Can view products in frontend

---

**Need Help?** Check `backend/SETUP_AND_TESTING.md` for detailed instructions!
