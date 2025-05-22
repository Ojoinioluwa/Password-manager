# Password Manager Backend

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Password Management](#password-management)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements & References](#acknowledgements--references)

---

## Project Overview

The **Password Manager backend** is a RESTful API built with **Node.js** and **Express**, designed to securely store, retrieve, and manage user credentials. All sensitive data (user passwords and stored password entries) are encrypted before being saved to the database. This project serves as the server component of a full-stack password management application and demonstrates best practices in authentication, encryption, and API design.

Key aspects include:

- **User Authentication**: Secure registration and login using **bcrypt** for password hashing and **JSON Web Tokens (JWT)** for session management.
- **Field-Level Encryption**: Each stored password entry is encrypted using **AES-256** (via Node’s built-in crypto module), ensuring that even if the database is compromised, raw credentials cannot be read without the user’s encryption key.
- **Modular Architecture**: Clear separation of concerns using MVC-style organization: `models/` for Mongoose schemas, `controllers/` for business logic, `routes/` for endpoint definitions, and `middleware/` for shared functionality.

---

## Features

- **User Registration & Login** - Register with email and password, where the password is hashed via **bcrypt** (salted).  
  - Login with email/password to receive a signed **JWT** (expires in a configurable time window).

- **Access-Controlled Endpoints** - Protected routes require a valid **JWT** in the `Authorization` header (Bearer token) to access password entries.

- **Password Vault CRUD** - **Create**: Add a new password entry (e.g., site name, username, encrypted password).  
  - **Read**: Retrieve all entries for the authenticated user.  
  - **Update**: Modify an existing entry (site name, notes, password).  
  - **Delete**: Remove an entry permanently from the vault.

- **Field-Level Encryption** - Each password entry is encrypted using **AES-256-CBC** (or AES-GCM) with a per-user key derived from the user’s master password. This implementation uses a unique Initialization Vector (IV) stored alongside the ciphertext for decryption.

- **Environment-Driven Configuration** - Database connection string, JWT secret, and other sensitive values are retrieved from environment variables, enabling secure credentials management and flexibility across environments.

---

## Tech Stack

- **Node.js** (v14+ recommended) – JavaScript runtime for building scalable network applications.
- **Express.js** – Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB** – NoSQL document database for storing users and encrypted password entries.
- **Mongoose** – Elegant MongoDB object modeling for Node.js.
- **bcrypt** – Library for hashing passwords with salts (secure by default).
- **JSON Web Tokens (jsonwebtoken)** – Secure, stateless user authentication tokens.
- **Node.js Crypto Module** – Native Node.js API for performing AES-256 encryption/decryption for stored password entries.
- **dotenv** – Module to load environment variables from a `.env` file into `process.env`.

---

## Prerequisites

Before getting started, ensure you have the following installed on your local machine:

1.  **Node.js** (v14 or above) and **npm** (v6+).  
2.  **MongoDB** – You can either run locally or use a managed service (e.g., MongoDB Atlas).  
3.  **Git** – For cloning the repository.

---

## Installation

1.  **Clone the repository** 
```bash
    git clone https://github.com/Ojoinioluwa/Password-manager.git
    cd Password-manager/backend
 ```
2.  **Install dependencies** 
```bash
    npm install
```
3.  **Set up environment variables** Create a `.env` file in the `backend/` directory (see Configuration below for details).

---

## Configuration

Copy the `.env.example` file to `.env` and fill in the required values:

```bash
cp .env.example .env
```

Example contents of .env:
```bash
# Server configuration
PORT=5000

# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/password_manager

# JWT secret key
JWT_SECRET=your_jwt_secret_here

# JWT token expiry (e.g., 1h, 7d)
JWT_EXPIRES_IN=1h

# Encryption secret (used as a server‑side pepper for AES)
ENCRYPTION_PEPPER=some_random_pepper_value
PORT: Port on which the Express server will listen.

MONGODB_URI: MongoDB connection string (local or Atlas).

JWT_SECRET: Secret key used to sign JWTs securely.

JWT_EXPIRES_IN: Lifespan of access tokens (e.g., 1h for one hour).

# ENCRYPTION_PEPPER: Additional server‑side secret added to the encryption key derivation for extra security.

```

Running the Server
After configuring environment variables, start the server in development mode:

```bash
npm run dev
```
This command uses nodemon for hot‑reloading, so any file changes automatically restart the server.

To run in production mode:

```bash
npm run start
```
The server will start on http://localhost:<PORT>. By default, if PORT is not set, it will listen on port 5000.

Environment Variables
Key	Description
```bash
PORT	Port number on which the server listens (default: 8000).
MONGODB_URI	MongoDB connection string (e.g., mongodb://localhost:27017/password_manager or your Atlas URI).
JWT_SECRET	Secret string used to sign JWTs for authentication.
JWT_EXPIRES_IN	Expiration time for JWTs (e.g., 1h, 7d).
ENCRYPTION_PEPPER	Additional secret used to “pepper” the AES‑256 encryption key derivation.
```
## API Endpoints
Below is a summary of available endpoints. Replace <BASE_URL> with http://localhost:<PORT>/api.

## Authentication
Register a New User
Endpoint: POST /api/auth/register

Description: Registers a new user by hashing their password and saving the user record. Returns a signed JWT.

Request Body:


```json
{
  "email": "user@example.com",
  "password": "P@ssw0rd!"
}
```
Response (201 Created):

```json
{
  "user": {
    "id": "64a1f2c3d4e5f67890123456",
    "email": "user@example.com"
  },
  "token": "<jwt_token_here>"
}
```
**Error Responses:**

400 Bad Request: Invalid input (e.g., missing fields).

409 Conflict: Email already in use (duplicate key error).

500 Internal Server Error: Unexpected server error.

Login User
Endpoint: POST /api/auth/login

Description: Authenticates a user by comparing the provided password against the stored bcrypt hash. Returns a signed JWT.

Request Body:

```json
{
  "email": "user@example.com",
  "password": "P@ssw0rd!"
}
```
Response (200 OK):


```json
{
  "user": {
    "id": "64a1f2c3d4e5f67890123456",
    "email": "user@example.com"
  },
  "token": "<jwt_token_here>"
}
```
Error Responses:

400 Bad Request: Missing or malformed fields.

401 Unauthorized: Invalid credentials (wrong email or password).

500 Internal Server Error: Unexpected server error.

Password Management
Note: All endpoints below require an Authorization header with a valid JWT:

makefile
Copy
Edit
Authorization: Bearer <jwt_token_here>
Get All Passwords
Endpoint: GET /api/passwords/

Description: Retrieves all encrypted password entries for the authenticated user.

Response (200 OK):

json
Copy
Edit
{
  "passwords": [
    {
      "_id": "64a1f2c3d4e5f67890123457",
      "siteName": "GitHub",
      "username": "octocat",
      "encryptedPassword": "<base64_ciphertext>",
      "iv": "<base64_iv>",
      "createdAt": "2025-05-22T10:15:30.000Z"
    },
    ...
  ]
}
Error Responses:

401 Unauthorized: Missing or invalid JWT.

500 Internal Server Error: Unexpected server error.

Create a New Password Entry
Endpoint: POST /api/passwords/

Description: Encrypts and stores a new password entry for the user. Returns the created entry (excluding plaintext).

Request Body:

```json

{
  "siteName": "GitHub",
  "username": "octocat",
  "password": "myGHpassw0rd!"
}
```
Response (201 Created):

```json
{
  "password": {
    "_id": "64a1f2c3d4e5f67890123457",
    "siteName": "GitHub",
    "username": "octocat",
    "encryptedPassword": "<base64_ciphertext>",
    "iv": "<base64_iv>",
    "createdAt": "2025-05-22T10:15:30.000Z"
  }
}
```
Error Responses:

400 Bad Request: Missing fields.

401 Unauthorized: Missing or invalid JWT.

500 Internal Server Error: Encryption or database error.

Update an Existing Password Entry
Endpoint: PATCH /api/passwords/:id

Description: Updates one or more fields (e.g., siteName, username, password) of an existing entry. If password is provided, it is re‑encrypted before saving.

Request Parameters:

id: ID of the password entry to update (URL parameter).

Request Body (any subset of fields; at least one must be present):

json
{
  "siteName": "GitHub Enterprise",
  "password": "newGHpassw0rd!"
}
Response (200 OK):

```json
{
  "password": {
    "_id": "64a1f2c3d4e5f67890123457",
    "siteName": "GitHub Enterprise",
    "username": "octocat",
    "encryptedPassword": "<new_base64_ciphertext>",
    "iv": "<new_base64_iv>",
    "updatedAt": "2025-05-22T11:00:00.000Z"
  }
}
```
Error Responses:

400 Bad Request: Invalid id format or missing fields.

401 Unauthorized: Missing or invalid JWT.

404 Not Found: No password entry with the given id.

500 Internal Server Error: Encryption or database error.

Delete a Password Entry
Endpoint: DELETE /api/passwords/:id

Description: Permanently deletes the specified password entry.

Request Parameters:

id: ID of the password entry to delete (URL parameter).

Response (200 OK):

```json
{
  "message": "Password entry deleted successfully"
}
```
Error Responses:

400 Bad Request: Invalid id format.

401 Unauthorized: Missing or invalid JWT.

404 Not Found: No password entry with the given id.

500 Internal Server Error: Database error.

Error Handling
All controllers use a centralized error middleware, which captures errors (including Mongoose validation errors) and returns consistent JSON responses with appropriate HTTP status codes.

Common error format:

json

{
  "error": {
    "message": "Detailed error message here",
    "status": 400
  }
}
Unhandled routes return:

json
Copy
Edit
{
  "error": {
    "message": "Endpoint not found",
    "status": 404
  }
}
Testing
Automated tests ensure the API behaves as expected. Follow these steps to run tests:

**Install dev dependencies (if not already installed during npm install):**

```bash
npm install --save-dev jest supertest mongodb-memory-server
```
Run tests:

```bash
npm test
```
Unit tests cover controllers, utilities (e.g., encryption/decryption), and middleware.

Integration tests spin up an in‑memory MongoDB instance (using mongodb-memory-server) to verify endpoints (/api/auth, /api/passwords) behave correctly under various scenarios (success, validation errors, unauthorized access).

View coverage report:
After running npm test, a coverage report is generated under coverage/. Aim for ≥ 80% coverage on core modules.

Contributing
Contributions are welcome! Please follow these guidelines:

Fork the repository and create a new branch for your feature or bug fix:

bash
Copy
Edit
git checkout -b feature/your-feature-name
Follow code style:

Use ESLint (Airbnb style or similar).

Use Prettier for consistent formatting.

Write tests: Any new functionality or bug fix must include unit and/or integration tests. Aim for high coverage.

Open a pull request: Ensure your branch is up to date with main, and include a clear description of changes, testing steps, and screenshots (if relevant).

Code review & merge: Once approved, your changes will be merged and deployed according to the CI/CD pipeline.

License
This project is licensed under the MIT License. See the LICENSE file for details.
