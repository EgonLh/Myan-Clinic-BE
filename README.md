
# **MyanClinic Backend – Nest.js API**

A modular, scalable, and production-ready backend for the **MyanClinic healthcare system**, built using **Nest.js**, **Prisma**, **JWT authentication**, and a clean domain-driven folder structure.
This service manages users, patients, doctors, appointments, storage, departments, files, and administration workflows.

---

## **Tech Stack**

* **Nest.js** – scalable Node.js framework
* **Prisma ORM** – database schema, migrations, and querying
* **PostgreSQL / MySQL** (configurable in `.env`)
* **JWT Authentication** (access & refresh)
* **BCrypt** password hashing
* **Role-based Access Control** (User, Patient, Doctor, Root)
* **Docker-ready** (optional)

---

## **Project Structure**

```
src/
│── app.module.ts
│── main.ts
│
├── prisma/                        # Prisma Database Integration
│   ├── prisma.module.ts
│   ├── prisma.service.ts
│   └── seed.ts                    # Database seeding script
│
├── common/                        # Shared Cross-cutting Concerns
│   ├── decorators/                # Custom decorators (e.g. @CurrentUser)
│   ├── filters/                   # Global & route-specific exception filters
│   ├── guards/                    # JWT guard, Role guards
│   ├── interceptors/              # Logging, Transform, Timeout
│   ├── dtos/                      # Global/shared DTOs
│   └── utils/                     # Helper functions, date utils, etc.
│
├── auth/                          # Authentication & Authorization Module
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── strategies/                # JWT strategy, Local strategy
│   └── dtos/
│
├── user/                          # Base User Module (common parent entity)
│   ├── user.module.ts
│   ├── user.service.ts
│   ├── user.controller.ts
│   ├── user.repository.ts         # Optional repository abstraction
│   ├── dtos/
│   └── entities/                  # User entity (Prisma types)
│
├── patient/                       # Patient Domain
│   ├── patient.module.ts
│   ├── patient.service.ts
│   ├── patient.controller.ts
│   ├── patient.repository.ts
│   ├── dtos/
│   └── entities/
│
├── doctor/                        # Doctor Domain
│   ├── doctor.module.ts
│   ├── doctor.service.ts
│   ├── doctor.controller.ts
│   ├── doctor.repository.ts
│   ├── dtos/
│   └── entities/
│
├── root/                          # Administrative Root Module
│   ├── root.module.ts
│   ├── root.service.ts
│   ├── root.controller.ts
│   ├── dtos/
│   └── entities/
│
├── appointment/                   # Clinic Appointment Management
│   ├── appointment.module.ts
│   ├── appointment.service.ts
│   ├── appointment.controller.ts
│   ├── appointment.repository.ts
│   ├── dtos/
│   └── entities/
│
├── storage/                       # Pharmacy/Medicine Inventory
│   ├── storage.module.ts
│   ├── storage.service.ts
│   ├── storage.controller.ts
│   ├── dtos/
│   └── entities/
│
├── file/                          # File Upload / Medical Record Files
│   ├── file.module.ts
│   ├── file.service.ts
│   ├── file.controller.ts
│   ├── dtos/
│   └── entities/
│
└── department/                    # Medical Departments (General, Dental, ENT, etc.)
    ├── department.module.ts
    ├── department.service.ts
    ├── department.controller.ts
    ├── dtos/
    └── entities/
```

---

## **Entities**

Each `entities/` folder stores the Prisma-related mapping types or class-based entity definitions used for:

* **Domain modeling**
* **Repository typing**
* **DTO transformations**
* **API response shaping**

In MyanClinic, entities represent core medical workflow objects:
**User**, **Patient**, **Doctor**, **Appointment**, **Department**, **StorageItem**, **FileRecord**, etc.

---

## **Installation**

### **1. Install dependencies**

```
npm install
```

### **2. Environment variables**

Create a `.env` file:

```
DATABASE_URL="postgresql://user:password@localhost:5432/myanclinic"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="1d"
```

---

## **Database Setup**

### **Generate Prisma Client**

```
npx prisma generate
```

### **Push schema to database**

```
npx prisma db push
```

### **(Optional) Seed data**

```
npx ts-node src/prisma/seed.ts
```

---

## **Running the App**

### Development

```
npm run start:dev
```

### Production build

```
npm run build
npm run start
```

---

## **API Modules Overview**

### **Auth Module**

* Login (JWT)
* Registration (patients, doctors, root/admin)
* Token refresh
* Role-based authorization (Guard)

### **User Module**

* Generic user profile
* Shared logic between doctor/patient accounts

### **Patient & Doctor Modules**

* Profiles
* CRUD operations
* Linking to appointments, departments, and medical files

### **Appointment Module**

* Create appointment
* Approve / Reject
* Doctor schedule relation
* Status workflow

### **Storage Module**

* Medicine inventory
* Quantity tracking
* Pharmacy module for patients

### **File Module**

* Medical record upload
* Prescription attachments
* Lab result files

### **Department Module**

* Clinic departments
* Doctor assignment

---

## **Future Enhancements**

* Repository layer deepening (DDD-style)
* Full test coverage (unit + e2e)
* Redis caching
* Background jobs (email notifications)
* Audit logging

---

## **License**

MIT License.
