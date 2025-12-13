# 🍬 Sweet Shop Management System – Backend

## Overview

This project is a **RESTful backend API** for managing a Sweet Shop. It handles **user authentication**, **sweet management**, and **inventory operations**. The backend is designed using **Test-Driven Development (TDD)** and clean architecture principles.

This repository currently focuses **only on the backend**. The frontend will be developed later.

---

## Tech Stack

* **Language:** TypeScript
* **Runtime:** Node.js
* **Framework:** Express
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **Testing:** Jest + Supertest
* **Dev Tools:** ts-node, nodemon, dotenv

---

## Architecture & Design

### High-level structure

```
Request → Route → Controller → Service → Database
```

* **Routes**: Define API endpoints
* **Controllers**: Handle HTTP request/response
* **Services**: Business logic
* **Models**: Mongoose schemas
* **Tests**: Define expected behavior (written first)

---

## Data Models

### User

| Field    | Type     | Notes             |
| -------- | -------- | ----------------- |
| id       | ObjectId | Auto-generated    |
| email    | string   | Unique, required  |
| password | string   | Hashed            |
| role     | string   | `USER` or `ADMIN` |

---

### Sweet

| Field    | Type     | Notes                 |
| -------- | -------- | --------------------- |
| id       | ObjectId | Auto-generated        |
| name     | string   | Required              |
| category | string   | e.g. Chocolate, Candy |
| price    | number   | Must be > 0           |
| quantity | number   | Stock count           |

---

## Authentication

* Users register and log in using email + password
* Passwords are hashed using bcrypt
* Login returns a JWT
* Protected routes require `Authorization: Bearer <token>`
* Admin-only routes require role = `ADMIN`

---

## API Endpoints

### Auth

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register new user      |
| POST   | `/api/auth/login`    | Login user, return JWT |

---

### Sweets (Protected)

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/api/sweets`        | Add new sweet             |
| GET    | `/api/sweets`        | Get all sweets            |
| GET    | `/api/sweets/search` | Search sweets             |
| PUT    | `/api/sweets/:id`    | Update sweet              |
| DELETE | `/api/sweets/:id`    | Delete sweet (Admin only) |

Search supports:

* name
* category
* price range

---

### Inventory (Protected)

| Method | Endpoint                   | Description                    |
| ------ | -------------------------- | ------------------------------ |
| POST   | `/api/sweets/:id/purchase` | Decrease quantity              |
| POST   | `/api/sweets/:id/restock`  | Increase quantity (Admin only) |

---

## Testing Strategy (TDD)

This project follows **Test-Driven Development**:

1. Write a failing test (RED)
2. Write minimum code to pass (GREEN)
3. Refactor while keeping tests green

### Test Order

1. Auth – Register
2. Auth – Login
3. Auth – JWT protection
4. Sweets – Create
5. Sweets – List
6. Sweets – Search
7. Inventory – Purchase
8. Inventory – Restock
9. Admin-only access

---

## Environment Variables

Create a `.env` file:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/sweet-shop
JWT_SECRET=supersecret
```

`.env` is ignored by git.

---

## Running the Project

### Development

```
npm run dev
```

### Run Tests

```
npm test
```

---

## Git & Workflow

* Small commits
* One feature or test per commit
* Clear commit messages
* AI usage documented in commits and README

---

## AI Usage

AI tools (ChatGPT) were used for:

* Clarifying TDD concepts
* Backend architecture guidance
* Configuration troubleshooting

All business logic and implementation decisions were made manually.

---

## Current Status

* Backend setup complete
* MongoDB connected
* Ready to start TDD with auth endpoints

---

## Next Steps

* Write first failing test for user registration
* Implement minimal logic to pass
* Continue iteratively using TDD

---

This README serves as a **living reference** while building the backend.
