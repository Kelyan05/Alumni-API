# 🎓 Alumni Bidding Platform Backend

## 📌 Overview

This project is a backend system for an **Alumni Bidding Platform**, where alumni can register, manage their professional profiles, and participate in a **blind bidding system** to be featured as the *Alumni of the Day*.

The system is designed with a strong focus on:

* Security (JWT, bcrypt, validation)
* Clean architecture (Layered + DAO pattern)
* Blind bidding fairness
* Developer accessibility via a public API
* Full Swagger documentation

---

## 🏗️ Architecture

This project follows a **layered architecture** to ensure separation of concerns and maintainability.

### 🔹 Architecture Diagram

```
Client (Browser / API Consumer)
        ↓
Router Layer (Express Routes)
        ↓
Service Layer (Business Logic)
        ↓
DAO Layer (Database Access)
        ↓
Database (SQLite)
```

---

### 🔹 Layers Explained

#### 1. Router Layer (`/routes`)

* Handles HTTP requests and responses
* Connects endpoints to services
* Example endpoints:

  * `/alumni/register`
  * `/bid/makebid`

#### 2. Service Layer (`/services`)

* Contains core business logic:

  * Authentication (JWT + bcrypt)
  * Blind bidding logic
  * Monthly limit enforcement
  * Alumni of the Day selection

#### 3. DAO Layer (`/daos`)

* Handles all database operations
* No business logic
* Ensures clean separation

#### 4. Middleware (`/middleware`)

* JWT authentication
* Input validation
* Security enforcement

#### 5. Shared Utilities (`/shared-utils`)

* Token generation
* Standard API response formatting

---

## 🔐 Security Features

* **Password Hashing** using bcrypt
* **JWT Authentication** with expiry
* **Email domain restriction** (university emails only)
* **Input validation & sanitization**
* **Blind bidding logic** (no bid visibility)
* **API key management with revocation**
* Secure token-based password reset

---

## 🚀 Features

### 1. Alumni Registration & Authentication

* Email-based registration (university domain only)
* Email verification system (token-based)
* Secure login/logout
* Password reset functionality

---

### 2. Alumni Profile Management

* Personal profile details
* LinkedIn URL
* Degrees (with URLs & completion dates)
* Certifications (with URLs & dates)
* Licenses (with URLs & dates)
* Short courses (with URLs & dates)
* Employment history
* Profile image upload
* Edit/update functionality

---

### 3. Blind Bidding System

* Place bids without seeing others
* Increase-only bid updates
* Status feedback: **Winning / Losing**
* Monthly limit: max 3 wins per alumnus
* Automatic winner selection when retrieving featured alumnus

---

### 4. Security & API Access

* JWT-based authentication
* API key system for developers
* Usage tracking (request counts, timestamps)
* Ability to revoke API keys

---

### 5. Public Developer API

* Get "Alumni of the Day"
* Secure access via API keys
* Fully documented using Swagger

---

## 📁 Project Structure

```
ar-alumni-backend/
│
├─ database/
├─ daos/
├─ services/
├─ routes/
├─ middleware/
├─ shared-utils/
├─ public/
│
├─ index.js
├─ package.json
├─ .env
├─ .env.example
└─ README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file using the template below:

```
PORT=3000

JWT_SECRET=your_jwt_secret
JWT_EXPIRY=1d

REFRESH_SECRET=your_refresh_secret
REFRESH_EXPIRY=7d

EMAIL_DOMAIN=@university.edu

SALT_ROUNDS=10

API_KEY_LENGTH=32
```

### 🔹 Explanation

* `JWT_SECRET` → Signs authentication tokens
* `EMAIL_DOMAIN` → Restricts registration
* `SALT_ROUNDS` → Controls password hashing strength
* `API_KEY_LENGTH` → Length of generated API keys

---

## 🗄️ Database Schema

### Alumni Table

| Field           | Description               |
| --------------- | ------------------------- |
| id              | Primary key               |
| email           | Unique login              |
| password        | Hashed password           |
| isVerified      | Email verification status |
| isFeatured      | Alumni of the Day         |
| appearanceCount | Monthly feature count     |
| linkedinUrl     | LinkedIn profile          |
| profilePic      | Image path                |
| degrees         | JSON array                |
| certifications  | JSON array                |
| licenses        | JSON array                |
| shortCourses    | JSON array                |
| employment      | JSON array                |

---

### Bid Table

| Field      | Description |
| ---------- | ----------- |
| id         | Primary key |
| alumniID   | Foreign key |
| amount     | Bid amount  |
| created_at | Timestamp   |

---

### API Keys Table

| Field      | Description     |
| ---------- | --------------- |
| key        | API key         |
| clientName | Client name     |
| usageCount | Usage tracking  |
| revoked    | Revocation flag |

---

### Relationships

* One Alumni → Many Bids
* One Alumni → Can be featured
* API keys track external usage

---

## 📘 API Documentation (Swagger)

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

### Features:

* Interactive API testing
* Request/response examples
* JWT authentication support
* Full endpoint coverage

---

## 🔑 Example Endpoints

### Authentication

* `POST /alumni/register`
* `POST /alumni/login`

### Profile

* `PUT /alumni/profile`

### Bidding

* `POST /bid/makebid`
* `GET /bid/status`

### Public API

* `GET /alumni/today`

---

## ▶️ How to Run

### 1. Install dependencies

```
npm install
```

### 2. Setup environment variables

Create `.env` using `.env.example`

### 3. Run server

```
node index.js
```

### 4. Open Swagger

```
http://localhost:3000/api-docs
```

---

## 🧠 Key Design Decisions (For Viva)

* **Layered Architecture** → improves maintainability and scalability
* **DAO Pattern** → separates database logic
* **JWT Authentication** → stateless and secure
* **bcrypt hashing** → protects passwords
* **Blind bidding logic** → ensures fairness
* **JSON fields for profile** → simplifies complex data structures

---

## ⚠️ Notes

* This project is designed for **educational purposes**
* Email sending is simulated (can be extended with real service)
* SQLite used for simplicity (can be replaced with other DBs)

---

## 🎯 Conclusion

This backend system demonstrates:

* Strong security practices
* Clean architecture design
* Complete API documentation
* Full implementation of coursework requirements

---

## 👨‍💻 Author

Student Name: *[Your Name]*
Module: *[Module Name]*
University: *[Your University]*

---
