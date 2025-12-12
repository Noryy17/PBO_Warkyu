# Dokumentasi Perancangan Sistem - Digital Wakrun

**Mata Kuliah:** Perancangan Berbasis Object (PBO)  
**Nama Proyek:** Sistem Digital Wakrun  
**Tanggal:** 12 Desember 2025

---

## 📋 Daftar Isi

- [Overview](#overview)
- [Struktur Dokumen](#struktur-dokumen)
- [Diagram UML](#diagram-uml)
- [Cara Menggunakan](#cara-menggunakan)
- [Tools & Requirements](#tools--requirements)
- [Referensi](#referensi)

---

## 🎯 Overview

Repository ini berisi **14 diagram UML lengkap** untuk perancangan Sistem Digital Wakrun, sebuah aplikasi digitalisasi warung kopi/kedai makanan. Diagram-diagram ini mengikuti alur pemodelan UML standar dari **Behavioral → Structural → Advanced Modeling**.

### Tujuan Sistem

Sistem Digital Wakrun dirancang untuk:
- Memfasilitasi pemesanan makanan/minuman digital
- Manajemen menu real-time oleh admin
- Notifikasi otomatis ke dapur
- Tracking status pesanan
- Integrasi payment gateway
- Laporan penjualan

### Aktor Sistem

1. **Customer** - Memesan, membayar, tracking pesanan
2. **Admin** - Kelola menu, konfirmasi pembayaran, laporan
3. **Dapur** - Terima notifikasi, update status masakan
4. **Payment Gateway** - Proses pembayaran (eksternal)

---

## 📁 Struktur Dokumen

```
UCP-laporan/
├── 01_use_case_diagram.puml           # Use Case Diagram
├── 02_activity_diagram.puml            # Activity Diagram
├── 03_state_machine_diagram.puml      # State Machine Diagram
├── 04_sequence_diagram.puml            # Sequence Diagram
├── 05_communication_diagram.puml       # Communication Diagram
├── 06_timing_diagram.puml              # Timing Diagram
├── 07_class_diagram.puml               # Class Diagram
├── 08_object_diagram.puml              # Object Diagram
├── 09_component_diagram.puml           # Component Diagram
├── 10_composite_structure_diagram.puml # Composite Structure
├── 11_package_diagram.puml             # Package Diagram
├── 12_deployment_diagram.puml          # Deployment Diagram
├── 13_interaction_overview_diagram.puml # Interaction Overview
├── 14_profile_diagram.puml             # Profile Diagram
└── README.md                           # Dokumentasi ini
```

---

## 📊 Diagram UML

### 1️⃣ Use Case Diagram
**File:** `01_use_case_diagram.puml`

**Tujuan:** Menentukan aktor dan fungsi sistem

**Konten:**
- 11 use cases utama
- 4 aktor (Customer, Admin, Dapur, Payment Gateway)
- Relasi include/extend
- System boundary

**Key Features:**
- Customer: Login, Browse Menu, Checkout, Order History
- Admin: Manage Menu, Confirm Payment, Sales Report
- Kitchen: Receive Notification, Update Status

---

### 2️⃣ Activity Diagram
**File:** `02_activity_diagram.puml`

**Tujuan:** Alur proses/workflow tiap use case

**Konten:**
- Complete customer order flow
- Swimlanes: Customer, System, Payment Gateway, Kitchen
- Decision points & loops
- Error handling

**Alur Utama:**
```
Login → Browse Menu → Add to Cart → Checkout → 
Apply Promo → Payment → Kitchen Notification → 
Cooking → Ready → Pickup → Completed
```

---

### 3️⃣ State Machine Diagram
**File:** `03_state_machine_diagram.puml`

**Tujuan:** Perubahan keadaan objek (Order lifecycle)

**Konten:**
- 10+ states dari order
- Nested states (composite states)
- Transitions dengan guards
- Events & activities

**Order States:**
```
Created → PendingPayment → ProcessingPayment → Paid → 
InKitchen → Ready → Served → Completed
(Alternative: PaymentFailed → Cancelled)
```

---

### 4️⃣ Sequence Diagram
**File:** `04_sequence_diagram.puml`

**Tujuan:** Urutan pesan antar objek

**Konten:**
- Detailed interaction sequence
- 6 main phases (Checkout → Payment → Notification)
- Object lifelines
- Return messages
- Alt/opt fragments

**Participants:**
- Customer, UI, Controllers, Services, Database, Payment Gateway, Kitchen

---

### 5️⃣ Communication Diagram
**File:** `05_communication_diagram.puml`

**Tujuan:** Hubungan komunikasi antar objek

**Konten:**
- Same scenario as sequence diagram
- Focus on object relationships
- Message numbering (1, 2, 2.1, 2.2, etc.)
- Structural view of interactions

---

### 6️⃣ Timing Diagram
**File:** `06_timing_diagram.puml`

**Tujuan:** Sinkronisasi waktu (real-time)

**Konten:**
- Time-based view of order processing
- Concurrent states
- Time measurements (T+0, T+5, T+30, etc.)
- Total duration: ~9 minutes from checkout to completion

**Timeline:**
- Checkout: 6 seconds
- Payment: 18 seconds
- Cooking: 6 minutes
- Pickup: 2 minutes

---

### 7️⃣ Class Diagram
**File:** `07_class_diagram.puml`

**Tujuan:** Struktur logis sistem (kelas & relasi)

**Konten:**
- 15+ domain classes
- 5 enums (OrderStatus, PaymentMethod, etc.)
- 6 service classes
- Relationships: association, composition, aggregation, dependency
- Attributes & methods lengkap

**Main Classes:**
- `Customer`, `Admin`, `Order`, `OrderItem`, `MenuItem`
- `Payment`, `PromoCode`, `Cart`, `KitchenNotification`
- `SalesReport`

**Services:**
- `OrderService`, `PaymentService`, `NotificationService`
- `AuthenticationService`

---

### 8️⃣ Object Diagram
**File:** `08_object_diagram.puml`

**Tujuan:** Contoh instansiasi dari class

**Konten:**
- 2 customer scenarios
- Real data examples
- Object relationships
- Instance values

**Example 1:** Customer "Budi" - Active order in kitchen
**Example 2:** Customer "Ani" - Still browsing (cart not empty)

---

### 9️⃣ Component Diagram
**File:** `09_component_diagram.puml`

**Tujuan:** Arsitektur modul perangkat lunak

**Konten:**
- 4-layer architecture
- 20+ components
- Interfaces & ports
- External services integration

**Layers:**
1. **Client Layer**: Web App, Mobile App, Kitchen Display
2. **Presentation Layer**: API Gateway, WebSocket Server
3. **Business Logic Layer**: 6 modules (Auth, Order, Menu, Payment, Notification, Reporting)
4. **Data Access Layer**: Repositories, ORM, Cache

---

### 🔟 Composite Structure Diagram
**File:** `10_composite_structure_diagram.puml`

**Tujuan:** Struktur internal komponen kompleks

**Konten:**
- Internal structure of `OrderService`
- Ports & connectors
- Parts & their collaboration
- Internal communication flow

**Sub-components:**
- OrderController, OrderProcessor, OrderValidator
- PriceCalculator, StatusManager, OrderRepository

---

### 1️⃣1️⃣ Package Diagram
**File:** `11_package_diagram.puml`

**Tujuan:** Pengelompokan modul sistem

**Konten:**
- 5 main packages
- 30+ sub-packages
- Dependencies between packages
- External library dependencies

**Package Structure:**
```
com.digitalwakrun/
├── presentation/     (controllers, routes, dto)
├── domain/           (entities, services, interfaces)
├── infrastructure/   (database, cache, external)
├── utils/            (security, validators, helpers)
├── shared/           (types, events, exceptions)
└── config/           (configurations)
```

---

### 1️⃣2️⃣ Deployment Diagram
**File:** `12_deployment_diagram.puml`

**Tujuan:** Penempatan fisik sistem di hardware

**Konten:**
- Production infrastructure
- Load balancer (Nginx)
- Application cluster (2+ servers)
- Database cluster (Primary + Replica)
- Cache cluster (Redis)
- External services (AWS S3, Midtrans, SendGrid)
- Monitoring (Prometheus, Grafana)

**Deployment Strategy:**
- Horizontal scaling (auto-scale 2-10 instances)
- Database replication (streaming)
- CDN for static assets
- Automated backup

---

### 1️⃣3️⃣ Interaction Overview Diagram
**File:** `13_interaction_overview_diagram.puml`

**Tujuan:** Integrasi banyak interaksi

**Konten:**
- High-level view of complete flow
- Combines activity + sequence diagrams
- References to other diagrams
- Decision points & partitions

**Partitions:**
1. Authentication
2. Menu Browsing
3. Cart Management
4. Checkout Process
5. Payment Processing
6. Kitchen Notification
7. Kitchen Processing
8. Order Completion

---

### 1️⃣4️⃣ Profile Diagram
**File:** `14_profile_diagram.puml`

**Tujuan:** Ekstensi UML untuk domain tertentu

**Konten:**
- Custom stereotypes untuk Food & Beverage domain
- Tagged values untuk payment methods
- Constraints untuk business rules

**Stereotypes Defined:**
- `<<FoodItem>>` - Items yang butuh preparation
- `<<Beverage>>` - Minuman dengan temperature/size
- `<<PaymentMethod>>` - Metode pembayaran
- `<<TimeSensitive>>` - Entities yang bisa expire
- `<<Cacheable>>` - Data yang di-cache
- `<<Auditable>>` - Track perubahan
- `<<EventSource>>` - Emit domain events
- `<<AdminOnly>>` - Components untuk admin
- `<<KitchenEquipment>>` - Peralatan dapur

---

## 🚀 Cara Menggunakan

### 1. View Diagram dengan PlantUML

#### Online (Recommended for Quick View)
1. Buka [PlantUML Online Editor](http://www.plantuml.com/plantuml/uml/)
2. Copy-paste isi file `.puml`
3. Diagram akan ter-render otomatis

#### VS Code Extension
1. Install extension: **PlantUML** by jebbs
2. Buka file `.puml`
3. Press `Alt+D` untuk preview

#### Command Line
```bash
# Install PlantUML
brew install plantuml  # macOS
# atau
sudo apt-get install plantuml  # Linux

# Generate PNG
plantuml 01_use_case_diagram.puml

# Generate all diagrams
plantuml *.puml

# Generate SVG (scalable)
plantuml -tsvg *.puml
```

### 2. Export Diagram

```bash
# Export to PNG
plantuml -tpng *.puml

# Export to SVG (vector, better quality)
plantuml -tsvg *.puml

# Export to PDF
plantuml -tpdf *.puml

# Output to specific directory
plantuml -o ../output *.puml
```

### 3. Batch Processing

```bash
# Create output directory
mkdir -p output/png output/svg

# Generate all PNG
for file in *.puml; do
  plantuml -tpng -o output/png "$file"
done

# Generate all SVG
for file in *.puml; do
  plantuml -tsvg -o output/svg "$file"
done
```

---

## 🛠️ Tools & Requirements

### PlantUML Installation

**macOS:**
```bash
brew install plantuml
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install plantuml
```

**Windows:**
1. Install [Chocolatey](https://chocolatey.org/)
2. Run: `choco install plantuml`

**Manual (All OS):**
1. Install [Java JRE](https://www.java.com/)
2. Download [plantuml.jar](https://plantuml.com/download)
3. Run: `java -jar plantuml.jar file.puml`

### VS Code Extensions

1. **PlantUML** by jebbs
   - Preview diagrams in editor
   - Auto-completion
   - Export to various formats

2. **Graphviz (dot) language support**
   - Syntax highlighting

### Online Tools

- [PlantUML Online Server](http://www.plantuml.com/plantuml/)
- [PlantText](https://www.planttext.com/)
- [LiveUML](https://liveuml.com/)

---

## 📚 Referensi

### PlantUML Documentation
- [Official PlantUML Guide](https://plantuml.com/)
- [Use Case Diagram](https://plantuml.com/use-case-diagram)
- [Activity Diagram](https://plantuml.com/activity-diagram-beta)
- [State Machine Diagram](https://plantuml.com/state-diagram)
- [Sequence Diagram](https://plantuml.com/sequence-diagram)
- [Class Diagram](https://plantuml.com/class-diagram)
- [Component Diagram](https://plantuml.com/component-diagram)
- [Deployment Diagram](https://plantuml.com/deployment-diagram)

### UML Standards
- [UML 2.5 Specification](https://www.omg.org/spec/UML/)
- [UML Diagram Types](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/uml-aggregation-vs-composition/)

### Best Practices
- [UML Best Practices - Martin Fowler](https://martinfowler.com/bliki/UmlMode.html)
- [Domain-Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html)

---

## 📝 Catatan Tambahan

### Urutan Membaca Diagram (Recommended)

Untuk pemahaman terbaik, baca diagram dalam urutan berikut:

**Fase 1: Requirements & Functionality**
1. Use Case Diagram → Pahami fitur sistem
2. Activity Diagram → Pahami alur proses

**Fase 2: Dynamic Behavior**
3. State Machine Diagram → Pahami lifecycle order
4. Sequence Diagram → Pahami interaksi detail
5. Communication Diagram → Pahami relasi objek
6. Timing Diagram → Pahami aspek waktu

**Fase 3: Structure**
7. Class Diagram → Pahami struktur domain model
8. Object Diagram → Lihat contoh konkret

**Fase 4: Architecture**
9. Component Diagram → Pahami arsitektur sistem
10. Composite Structure → Pahami internal component
11. Package Diagram → Pahami organisasi kod

**Fase 5: Implementation**
12. Deployment Diagram → Pahami infrastruktur

**Fase 6: Integration**
13. Interaction Overview → Lihat big picture
14. Profile Diagram → Pahami domain extensions

---

## 👨‍💻 Informasi Project

**Course:** Perancangan Berbasis Object (PBO)  
**Project Name:** Sistem Digital Wakrun  
**Version:** 1.0  
**Date:** December 2025  
**Status:** Design Phase Complete

**Contributors:**
- System Analysis & Design
- UML Modeling
- Documentation

---

## 📄 License

Educational purposes only - PBO Course Assignment

---

**Last Updated:** 12 Desember 2025
