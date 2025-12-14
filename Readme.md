# 🍬 Sweet Shop Management System – Backend

## 📌 Project Overview

This project is a **Sweet Shop Management System backend** built as part of a **Test-Driven Development (TDD) Kata**. The goal is to design, implement, and test a robust RESTful API that manages users, authentication, sweets inventory, and purchasing workflows.

The backend is implemented using **Node.js, TypeScript, Express, MongoDB**, and follows **clean code principles**, **SOLID design**, and **TDD practices**.

---

## 🛠 Tech Stack

* **Runtime:** Node.js
* **Language:** TypeScript
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JWT (JSON Web Tokens)
* **Testing:** Jest + Supertest
* **Dev Tools:** Nodemon, ts-node

---

## 🔐 Authentication & Roles

* Users can **register** and **log in**
* Authentication is handled using **JWT**
* Two roles exist:

  * `USER` – default role
  * `ADMIN` – required for inventory management (create, update, delete, restock)

Admin users are enforced via middleware.

---

## 📚 API Endpoints

### 🔑 Auth

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login and receive JWT |

---

### 🍭 Sweets (Protected)

| Method | Endpoint             | Access | Description                                  |
| ------ | -------------------- | ------ | -------------------------------------------- |
| POST   | `/api/sweets`        | Admin  | Create a new sweet                           |
| GET    | `/api/sweets`        | Auth   | Get all sweets                               |
| GET    | `/api/sweets/search` | Auth   | Search sweets by name, category, price range |
| PUT    | `/api/sweets/:id`    | Admin  | Update sweet details                         |
| DELETE | `/api/sweets/:id`    | Admin  | Delete a sweet                               |

---

### 📦 Inventory (Protected)

| Method | Endpoint                   | Access | Description                          |
| ------ | -------------------------- | ------ | ------------------------------------ |
| POST   | `/api/sweets/:id/purchase` | User   | Purchase a sweet (decrease quantity) |
| POST   | `/api/sweets/:id/restock`  | Admin  | Restock a sweet (increase quantity)  |

---

## 🧪 Testing Strategy (TDD)

This project strictly follows **Test-Driven Development**:

1. Write failing tests first (Red)
2. Implement logic to pass tests (Green)
3. Refactor while keeping tests green (Refactor)

### Test Coverage Includes:

* Auth (register & login)
* Role-based access control
* Sweet CRUD operations
* Inventory purchase & restock
* Search functionality

Tests are written using **Jest** and **Supertest**.

---

## ⚙️ Setup & Run Locally

### 1️⃣ Clone the repository

```bash
git clone <repo-url>
cd sweet-shop-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=your_jwt_secret
PORT=3000
```

### 4️⃣ Run the server

```bash
npm run dev
```

### 5️⃣ Run tests

```bash
npm test
```

---

## 📊 Test Report

All backend features are fully covered by automated tests.

* ✅ Auth tests
* ✅ Sweet CRUD tests
* ✅ Inventory purchase & restock tests

Run `npm test` to view results.

---

## 🤖 My AI Usage

### Tools Used

* **ChatGPT**

### How I Used AI

* Brainstormed API structure and endpoint design
* Generated initial test cases for controllers
* Helped debug Jest, Mongoose, and JWT-related issues
* Assisted in refining TDD workflow and test isolation

### Reflection

AI significantly accelerated development by acting as a pair programmer. However, all logic was carefully reviewed, adapted, and integrated manually to ensure correctness, understanding, and ownership of the code.

--- 

## 🧪 Test Report

All backend features are covered by automated tests written using Jest and Supertest.

### Test Summary

- Test Suites: 8 passed, 8 total
- Tests: 10 passed, 10 total
- Snapshots: 0
- Test Runtime: ~15 seconds

Tests cover:
- User registration & login
- JWT authentication
- Role-based authorization (Admin vs User)
- Sweet CRUD operations
- Search functionality
- Inventory purchase & restock logic

All tests pass successfully.
## 🧪 Test Report

All backend features are fully covered by automated tests written using **Jest** and **Supertest** following Test-Driven Development (TDD).

### How to Run Tests

From the project root:

```bash
cd server
npm test
```

test result ::
```bash
Test Suites: 9 passed, 9 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        ~18 seconds
Ran all test suites.
```