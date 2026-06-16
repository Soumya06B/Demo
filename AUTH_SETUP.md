# JWT Auth With Email OTP

## Install Commands

Backend:

```bash
cd backend
npm install bcryptjs jsonwebtoken nodemailer
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

The required frontend packages are already listed in `frontend/package.json`.

## Folder Structure Added

```text
backend/src/config/smtp.js
backend/src/controllers/authController.js
backend/src/middleware/authMiddleware.js
backend/src/models/User.js
backend/src/routes/authRoutes.js
backend/src/utils/generateOtp.js
backend/src/utils/generateToken.js
backend/src/utils/sendEmail.js
backend/.env.example

frontend/src/pages/VerifyRegisterOtp.jsx
frontend/src/pages/VerifyLoginOtp.jsx
frontend/src/services/api.js
frontend/src/utils/tokenStorage.js
frontend/.env.example
```

## Backend Environment Example

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_strong_jwt_secret_key
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_without_spaces
SMTP_FROM="Project Auth <your_email@gmail.com>"
OTP_EXPIRES_IN_MINUTES=10
```

## Frontend Environment Example

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=Auth Demo App
VITE_APP_ENV=development
```

## Postman Examples

Register:

```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "password123"
}
```

Verify register OTP:

```http
POST http://localhost:5000/api/auth/verify-register-otp
Content-Type: application/json

{
  "email": "demo@example.com",
  "otp": "123456"
}
```

Login:

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "demo@example.com",
  "password": "password123"
}
```

Verify login OTP:

```http
POST http://localhost:5000/api/auth/verify-login-otp
Content-Type: application/json

{
  "email": "demo@example.com",
  "otp": "123456"
}
```

Profile:

```http
GET http://localhost:5000/api/auth/profile
Authorization: Bearer your_jwt_token
```

## Frontend Test Flow

1. Start backend with `npm run dev`.
2. Start frontend with `npm run dev`.
3. Open `http://localhost:5173/register`.
4. Register with name, email, and password.
5. Check the email inbox for the OTP.
6. Submit the OTP on `/verify-register-otp`.
7. Confirm the dashboard loads profile data.
8. Logout, then login again.
9. Check email for login OTP.
10. Submit the OTP on `/verify-login-otp`.

## Flow Summary

Registration saves a user with a hashed password, hashed OTP, OTP expiry, and `isEmailVerified: false`. Verifying the register OTP clears OTP fields, marks the user verified, and returns a JWT.

Login checks email and password, sends a new hashed OTP, and does not return a JWT yet. Verifying the login OTP clears OTP fields and returns the JWT. The protected profile route reads the JWT from the `Authorization` header and returns safe user data only.
