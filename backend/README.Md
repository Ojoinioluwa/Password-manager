# Password Vault Backend

A secure, scalable backend API for managing passwords and sensitive credentials. Built with enterprise-grade security features, collaborative sharing capabilities, and advanced password management tools.

## 🔗 Live Demo

**Frontend Application**: [https://password-manager-frontend-mzof.onrender.com/](https://password-manager-frontend-mzof.onrender.com/)

## ✨ Features

- **🔐 Secure Password Storage**: Encrypted storage and retrieval of passwords with custom notes and categorization
- **👥 Group Management**: Create and manage user groups for streamlined access control
- **🤝 Collaborative Sharing**: Share passwords with individual users or entire groups
- **📊 Password Analytics**: Built-in password strength analyzer with improvement recommendations
- **🎲 Advanced Password Generator**: Customizable password generation with multiple security options
- **🔍 Shared Password Views**: Easy access to passwords shared by other authorized users
- **🛡️ JWT Authentication**: Secure token-based authentication system
- **⚡ RESTful API**: Clean, well-documented API endpoints

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt for password hashing
- **Validation**: express-validator
- **Environment**: dotenv for configuration
- **Testing**: Jest
- **Documentation**: Swagger

## 🚀 Getting Started

### Prerequisites

Before running the application, ensure you have:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher)
- **MongoDB** (version 5.0 or higher)
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/password-vault-backend.git
   cd password-vault-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Server Configuration
   PORT=8000
   NODE_ENV=development

   # Database Configuration
   DATABASE_URL=mongodb://localhost:27017/passwordvault

   # JWT Configuration (Generate a secure random string!)
   JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters
   JWT_EXPIRES_IN=7d

   # Security Configuration
   BCRYPT_ROUNDS=12

   # CORS Configuration
   FRONTEND_URL=http://localhost:3000

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

### Production Deployment

```bash
npm run build
npm start
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response**: `201 Created`

```json
{
  "message": "User registered successfully",
  "userId": "64f7b1234567890abcdef123"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response**: `200 OK`

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "64f7b1234567890abcdef123",
  "user": {
    "id": "64f7b1234567890abcdef123",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Password Management

#### Create Password Entry

```http
POST /api/passwords
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Gmail Account",
  "username": "john@gmail.com",
  "password": "MySecretPassword123!",
  "url": "https://gmail.com",
  "notes": "Main email account",
  "category": "Email"
}
```

#### Get All Passwords

```http
GET /api/passwords
Authorization: Bearer <your_jwt_token>
```

#### Get Specific Password

```http
GET /api/passwords/:id
Authorization: Bearer <your_jwt_token>
```

#### Update Password

```http
PUT /api/passwords/:id
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Updated Gmail Account",
  "password": "NewSecurePassword456!"
}
```

#### Delete Password

```http
DELETE /api/passwords/:id
Authorization: Bearer <your_jwt_token>
```

#### Share Password with User

```http
POST /api/passwords/:id/share/user
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "targetUserId": "64f7b1234567890abcdef456"
}
```

#### Share Password with Group

```http
POST /api/passwords/:id/share/group
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "targetGroupId": "64f7b1234567890abcdef789"
}
```

#### Get Shared Passwords

```http
GET /api/passwords/shared-with-me
Authorization: Bearer <your_jwt_token>
```

### Group Management

#### Create Group

```http
POST /api/groups
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Development Team",
  "description": "Shared credentials for dev environment"
}
```

#### Get All Groups

```http
GET /api/groups
Authorization: Bearer <your_jwt_token>
```

#### Update Group

```http
PUT /api/groups/:id
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Updated Team Name",
  "description": "Updated description"
}
```

#### Delete Group

```http
DELETE /api/groups/:id
Authorization: Bearer <your_jwt_token>
```

#### Add Group Members

```http
POST /api/groups/:id/members
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "userIds": ["64f7b1234567890abcdef456", "64f7b1234567890abcdef789"]
}
```

#### Remove Group Members

```http
DELETE /api/groups/:id/members
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "userIds": ["64f7b1234567890abcdef456"]
}
```

### Security Tools

#### Test Password Strength

```http
POST /api/tools/strength-test
Content-Type: application/json

{
  "password": "MyPassword123!"
}
```

**Response**: `200 OK`

```json
{
  "strength": "Strong",
  "score": 8,
  "recommendations": [
    "Consider adding special characters",
    "Increase length to 16+ characters for maximum security"
  ],
  "estimatedCrackTime": "centuries"
}
```

#### Generate Password

```http
GET /api/tools/generate-password?length=16&includeUppercase=true&includeLowercase=true&includeNumbers=true&includeSymbols=true
```

**Response**: `200 OK`

```json
{
  "generatedPassword": "K8#mN9$vL2@pQ7!R",
  "strength": "Very Strong",
  "length": 16
}
```

## 🔒 Security Features

### Authentication & Authorization

- **JWT-based Authentication**: Secure token-based authentication system
- **Password Hashing**: bcrypt with configurable salt rounds
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configurable cross-origin resource sharing

### Authorization Levels

1. **User-Level Authorization**: Granular control over individual password access
2. **Group-Level Authorization**: Simplified team collaboration through group sharing
3. **Owner Permissions**: Full control over created passwords and groups

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests
4. **Run the test suite**: `npm test`
5. **Commit your changes**: `git commit -m 'feat: Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/password-vault-backend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/password-vault-backend/discussions)
- **Email**: support@yourproject.com

## 🗺️ Roadmap

- [ ] Two-factor authentication (2FA)
- [ ] Password breach monitoring
- [ ] Advanced audit logging
- [ ] Mobile app API extensions
- [ ] Enterprise SSO integration
- [ ] Advanced password policies
- [ ] Automated password rotation

---

**⚠️ Security Notice**: This application handles sensitive data. Always use HTTPS in production, keep dependencies updated, and follow security best practices.
