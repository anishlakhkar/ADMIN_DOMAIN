meta {
  version: "2.0"
  author: "Drug Management System"
  environment: "production"
  description: "Drug Management System with Warehouse Management for B2B (MedBiz) and B2C (MedBuddy) personas - Complete schema with persona_type at product and batch levels"
}

enum Category {
  MEDICATIONS
  SUPPLEMENTS
  EQUIPMENTS
  SUPPLIES
}

enum StorageType {
  AMBIENT
  REFRIGERATED
  FROZEN
}

enum DosageForm {
  TABLET
  CAPSULE
  SYRUP
  OINTMENT
}

enum Concern {
  PAIN
  FEVER
  INFECTION
}

enum PersonaType {
  B2B
  B2C
  BOTH
}

table Warehouse {
  warehouse_id: string(10) primary key
  username: string(50) unique not null
  password: string(255) not null
  latitude: decimal(10, 8) not null
  longitude: decimal(11, 8) not null
  location_pin_code: string(10) not null
  total_zone: int not null
  created_at: datetime default "now()"
  updated_at: datetime default "now()"
}

table Product {
  sku_id: string(50) not null
  warehouse_id: string(10) not null
  product_name: string(255) not null
  manufacture_name: string(100) not null
  category: Category not null
  description: string(1000)
  storage_type: StorageType not null
  quantity: bigint not null
  price: decimal(10, 2) not null
  profit_margin: decimal(5, 2) default "5.00"
  required_prescription: boolean default false
  url: string(500)
  dosage_form: DosageForm not null
  threshold_quantity: bigint not null
  strength: string(50)
  concern: Concern
  persona_type: PersonaType default "BOTH"
  created_at: datetime default "now()"
  updated_at: datetime default "now()"
  primary key (sku_id, warehouse_id)
}

table ProductBatch {
  batch_id: string(50) not null
  warehouse_id: string(10) not null
  sku_id: string(50) not null
  expiry: date not null
  quantity: bigint not null
  persona_type: PersonaType default "BOTH"
  created_at: datetime default "now()"
  primary key (batch_id, warehouse_id, sku_id)
}

table Zone {
  id: bigint primary key auto_increment
  warehouse_id: string(10) not null
  storage_type: StorageType not null
  total_capacity: int not null
  current_capacity: int not null
  created_at: datetime default "now()"
  updated_at: datetime default "now()"
}

table ZoneProductList {
  zone_id: bigint not null
  sku_id: string(50) not null
  quantity: int not null
  updated_at: datetime default "now()"
  primary key (zone_id, sku_id)
}

relation {
  Warehouse.warehouse_id -> Product.warehouse_id on delete cascade
  Warehouse.warehouse_id -> ProductBatch.warehouse_id on delete cascade
  Warehouse.warehouse_id -> Zone.warehouse_id on delete cascade
  Product.sku_id -> ProductBatch.sku_id on delete cascade
  Product.warehouse_id -> ProductBatch.warehouse_id on delete cascade
  Zone.id -> ZoneProductList.zone_id on delete cascade
  Product.sku_id -> ZoneProductList.sku_id on delete restrict
}

index {
  Warehouse: [username]
  Product: [warehouse_id, category, storage_type, persona_type, threshold_quantity]
  ProductBatch: [warehouse_id, sku_id, expiry, persona_type]
  Zone: [warehouse_id, storage_type]
  ZoneProductList: [zone_id, sku_id]
}
