# 🎓 Alumni Bidding Platform Backend

## 📌 Overview

This project is a backend system for an **Alumni Bidding Platform**, where users can register, manage their alumni profiles, and participate in a **blind bidding system** to be featured as the *Alumni of the Day*.

The system focuses on:

* Secure authentication using JWT
* Clean layered architecture
* Fair blind bidding logic
* Fully documented REST API using Swagger

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
* Defines API endpoints
* Connects requests to service layer

#### 2. Service Layer (`/services`)

* Contains core business logic:

  * Authentication (JWT + bcrypt)
  * Blind bidding logic
  * Alumni selection logic

#### 3. DAO Layer (`/daos`)

* Handles all database interactions
* No business logic
* Ensures clean separation

#### 4. Middleware (`/middleware`)

* JWT authentication middleware
* Protects secured routes

#### 5. Utilities (`/utils`)

* Token generation
* Helper functions

---

## 🔐 Security Features

* **Password hashing** using bcrypt
* **JWT authentication** with expiry
* **University email restriction** (controlled via `.env`)
* Protected routes using middleware

---

## 🚀 Features

### 1. Authentication

* Register using university email only
* Secure login system
* JWT-based authentication

---

### 2. Alumni Profile Management

* Update profile information
* Store LinkedIn URL
* Store profile image

---

### 3. Blind Bidding System

* Users place bids without seeing others
* Users can only increase their bids
* System determines highest bidder
* Users see only:

  * **Winning**
  * **Losing**

---

## 💰 Blind Bidding Logic

* All bids are stored securely in the database
* No user can view other bids
* The highest bid is determined internally
* The winner is selected when requesting `/alumni/today`
* This ensures fairness and prevents bid manipulation

---

## 📊 Monthly Feature Limit

* Each alumnus can be featured a maximum of **3 times per month**
* Tracked using `thisMonthAppearanceCount`
* Users exceeding this limit are excluded from winning

---

## 📁 Project Structure

```
ar-alumni-backend/
│
├─ daos/
├─ services/
├─ routes/
├─ middleware/
├─ utils/
├─ database/
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

EMAIL_DOMAIN=@westminster.ac.uk

SALT_ROUNDS=10
```

### 🔹 Explanation

* `JWT_SECRET` → Signs authentication tokens
* `EMAIL_DOMAIN` → Restricts registration to university emails
* `SALT_ROUNDS` → Controls password hashing strength

---

## 🗄️ Database Schema

### Users Table

| Field    | Description     |
| -------- | --------------- |
| id       | Primary key     |
| email    | Unique login    |
| password | Hashed password |

---

### Alumni Table

| Field                    | Description           |
| ------------------------ | --------------------- |
| id                       | Primary key           |
| linkedinUrl              | LinkedIn profile      |
| profilePic               | Image URL             |
| thisMonthAppearanceCount | Monthly feature count |
| createdAt                | Timestamp             |
| updatedAt                | Timestamp             |

---

### Bids Table

| Field     | Description |
| --------- | ----------- |
| id        | Primary key |
| alumniID  | Foreign key |
| amount    | Bid amount  |
| createdAt | Timestamp   |

---

## 🔗 Data Relationships

* One User → One Alumni profile
* One Alumni → Many Bids
* Highest bid → Determines featured alumni

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

---

## 🔑 Example Endpoints

### Authentication

* `POST /alumni/register`
* `POST /alumni/login`

### Profile

* `PUT /alumni/profile`

### Bidding

* `POST /bid/makebid`
* `PUT /bid/update`
* `GET /bid/status`

### Public API

* `GET /alumni/today`

---

## 📦 Example Response

```json
{
  "success": true,
  "data": {
    "status": "Winning"
  }
}
```

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

* **Layered Architecture** → improves maintainability
* **DAO Pattern** → separates database logic
* **JWT Authentication** → secure and stateless
* **bcrypt hashing** → protects passwords
* **Blind bidding logic** → ensures fairness

---

## ⚠️ Notes

* This project is designed for **educational purposes**
* SQLite is used for simplicity and easy setup

---

## 🎯 Conclusion

This backend demonstrates:

* Secure authentication practices
* Clean architecture design
* Fully documented API
* Complete implementation of coursework requirements

---

## 👨‍💻 Author

Student Name: *Kelyan Djomo*
Module: *Advanced Server-Side Web Programming*
University: *University of Westminster*

---
