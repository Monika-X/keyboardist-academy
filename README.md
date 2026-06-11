# 🎹 Keyboardist Academy

A **premium full-stack music academy** web application built with Node.js, Express.js, MongoDB Atlas, and Vanilla JavaScript.

---

## Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript      |
| Backend    | Node.js, Express.js                  |
| Database   | MongoDB Atlas + Mongoose             |
| Auth       | JWT (HTTP-only cookies + Bearer)     |
| Security   | Helmet, CORS, Rate Limiting, HPP     |
| Email      | Nodemailer                           |
| Pattern    | MVC (Model–View–Controller)          |

---

## Project Structure

```
keyboardist-academy/
├── server.js                    # Entry point
├── .env                         # Environment variables (git-ignored)
├── .env.example                 # Template
├── package.json
│
├── backend/
│   ├── app.js                   # Express app configuration
│   ├── config/
│   │   ├── database.js          # MongoDB Atlas connection
│   │   ├── jwt.js               # JWT helpers
│   │   └── constants.js         # App-wide constants
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Lesson.js
│   │   ├── Enrollment.js
│   │   ├── Review.js
│   │   └── Contact.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── courseController.js
│   │   ├── lessonController.js
│   │   ├── enrollmentController.js
│   │   ├── reviewController.js
│   │   └── contactController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── lessonRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/
│   │   ├── auth.js              # protect + authorize
│   │   ├── errorHandler.js      # Global error handler
│   │   ├── notFound.js          # 404 middleware
│   │   └── validate.js          # express-validator helper
│   ├── services/
│   │   ├── emailService.js
│   │   └── tokenService.js
│   └── utils/
│       ├── AppError.js          # Custom error class
│       ├── catchAsync.js        # Async wrapper
│       ├── ApiFeatures.js       # Query filter/sort/paginate
│       └── sendEmail.js         # Nodemailer + templates
│
└── frontend/
    ├── index.html               # SPA shell
    ├── assets/
    │   ├── css/
    │   │   ├── variables.css    # Design tokens
    │   │   ├── reset.css
    │   │   ├── typography.css
    │   │   ├── utilities.css
    │   │   ├── components.css
    │   │   ├── animations.css
    │   │   └── main.css
    │   ├── js/
    │   │   ├── config.js        # Frontend config
    │   │   ├── auth.js          # Auth state manager
    │   │   ├── router.js        # SPA router
    │   │   ├── app.js           # Bootstrap
    │   │   └── utils/
    │   │       ├── api.js       # Fetch wrapper
    │   │       ├── storage.js   # localStorage helper
    │   │       ├── helpers.js   # DOM & formatting
    │   │       └── validator.js # Client-side validation
    │   └── images/
    │       └── uploads/
    └── pages/                   # Page HTML/CSS (to be created)
```

---

## API Endpoints

| Method | Endpoint                            | Access         |
|--------|-------------------------------------|----------------|
| POST   | /api/v1/auth/register               | Public         |
| POST   | /api/v1/auth/login                  | Public         |
| POST   | /api/v1/auth/logout                 | Public         |
| GET    | /api/v1/auth/me                     | Protected      |
| GET    | /api/v1/courses                     | Public         |
| GET    | /api/v1/courses/featured            | Public         |
| GET    | /api/v1/courses/:slug               | Public         |
| POST   | /api/v1/courses                     | Instructor+    |
| POST   | /api/v1/enrollments/:courseId       | Student        |
| GET    | /api/v1/enrollments/my              | Student        |
| POST   | /api/v1/contact                     | Public         |
| GET    | /api/v1/health                      | Public         |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
# Edit .env with your MongoDB Atlas URI and other secrets

# 3. Run in development mode
npm run dev

# 4. Open in browser
# http://localhost:5000
```

---

## Color Palette

| Token         | Hex       | Usage                    |
|---------------|-----------|--------------------------|
| Matte Black   | `#121212` | Background, base surface |
| Soft White    | `#F5F5F2` | Text, foreground         |
| Royal Violet  | `#6C63FF` | Primary brand, accents   |
