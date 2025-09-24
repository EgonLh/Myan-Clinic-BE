src/
│── app.module.ts
│── main.ts
│
├── prisma/                        # Prisma integration
│   ├── prisma.module.ts
│   ├── prisma.service.ts
│   └── seed.ts                    # optional: seeding script
│
├── common/                        # shared utilities
│   ├── decorators/                # custom decorators (e.g. @CurrentUser)
│   ├── filters/                   # exception filters
│   ├── guards/                    # auth guards (JWT, Roles)
│   ├── interceptors/
│   ├── dtos/                      # shared DTOs
│   └── utils/                     # helpers
│
├── auth/                          # authentication & authorization
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── strategies/                # JWT, Local strategies
│   └── dtos/
│
├── user/                          # base User entity
│   ├── user.module.ts
│   ├── user.service.ts
│   ├── user.controller.ts
│   ├── user.repository.ts         # optional if you want a repo layer
│   ├── dtos/
│   └── entities/
│
├── patient/
│   ├── patient.module.ts
│   ├── patient.service.ts
│   ├── patient.controller.ts
│   ├── patient.repository.ts
│   ├── dtos/
│   └── entities/
│
├── doctor/
│   ├── doctor.module.ts
│   ├── doctor.service.ts
│   ├── doctor.controller.ts
│   ├── doctor.repository.ts
│   ├── dtos/
│   └── entities/
│
├── root/                          # Root/Admin
│   ├── root.module.ts
│   ├── root.service.ts
│   ├── root.controller.ts
│   ├── dtos/
│   └── entities/
│
├── appointment/
│   ├── appointment.module.ts
│   ├── appointment.service.ts
│   ├── appointment.controller.ts
│   ├── appointment.repository.ts
│   ├── dtos/
│   └── entities/
│
├── storage/
│   ├── storage.module.ts
│   ├── storage.service.ts
│   ├── storage.controller.ts
│   ├── dtos/
│   └── entities/
│
├── file/
│   ├── file.module.ts
│   ├── file.service.ts
│   ├── file.controller.ts
│   ├── dtos/
│   └── entities/
│
└── department/
    ├── department.module.ts
    ├── department.service.ts
    ├── department.controller.ts
    ├── dtos/
    └── entities/

//later to add reposititors
//entities 
