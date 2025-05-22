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

1.  **Clone the repository** ```bash
    git clone [https://github.com/Ojoinioluwa/Password-manager.git](https://github.com/Ojoinioluwa/Password-manager.git)
    cd Password-manager/backend
    ```
2.  **Install dependencies** ```bash
    npm install
    ```
3.  **Set up environment variables** Create a `.env` file in the `backend/` directory (see Configuration below for details).

---

## Configuration

Copy the `.env.example` file to `.env` and fill in the required values:

```bash
cp .env.example .env
```