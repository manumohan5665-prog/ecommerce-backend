# E-Commerce Backend System

A RESTful E-Commerce Backend built using **Node.js, Express.js, and MongoDB**. This project provides authentication, role-based access control, product management, user profiles, order management, dashboard analytics, and product recommendations.

## 🚀 Features

### Authentication & Authorization
- User registration and login
- Password hashing using bcryptjs
- JWT-based authentication
- Role-based access control (Admin and User)
- Protected API routes

### Product Management
- Create, read, update, and delete products
- Search products by name
- Filter products by category and price
- Sort products by price and date

### User Management
- View and update user profiles
- Admin access to user management
- Delete user accounts

### Order Management
- Create customer orders
- View personal order history
- Admin order management
- Update order status
- Delete orders

### Analytics & Recommendations
- Dashboard statistics
- Total users, products, and orders
- Revenue analytics
- Product recommendation API using purchase-history-based collaborative filtering
- Recommendation dataset export in JSON and CSV formats

### Data Analysis
- Export customer purchase data for Altair AI Studio
- Analyse customer purchasing patterns using exported datasets

> Note: Altair AI Studio dataset export is implemented. A live integration between Altair's recommendation model and the Express recommendation API is not yet implemented.

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- Postman
- Altair AI Studio

## 📁 Project Structure

ecommerce-backend/
│
├── config/
│   └── dbConnection.js
│
├── controllers/
│   ├── analyticsController.js
│   ├── authentication.js
│   ├── orderController.js
│   ├── productController.js
│   └── userProfileController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorHandler.js
│
├── models/
│   ├── order.js
│   ├── product.js
│   └── user.js
│
├── routes/
│   ├── analyticsRoutes.js
│   ├── authenticationRoutes.js
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userProfileRoutes.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md

## ⚙️ Installation

### 1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL

### 2. Navigate to the project

cd ecommerce-backend

### 3. Install dependencies

npm install

### 4. Configure environment variables

Create a `.env` file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Never upload your `.env` file or expose your database credentials.

### 5. Start the server

npm run dev

Server runs at:

`http://localhost:5000`

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login user |

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/profile` | Get own profile |
| PUT | `/api/users/profile` | Update own profile |
| GET | `/api/users` | Get all users (Admin) |
| GET | `/api/users/:id` | Get user by ID (Admin) |
| DELETE | `/api/users/:id` | Delete user (Admin) |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | Get own orders |
| GET | `/api/orders/all` | Get all orders (Admin) |
| GET | `/api/orders/:id` | Get order by ID |
| PUT | `/api/orders/:id/status` | Update order status (Admin) |
| DELETE | `/api/orders/:id` | Delete order (Admin) |

### Analytics

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/analytics/dashboard` | Dashboard analytics (Admin) |
| GET | `/api/analytics/recommendations` | Product recommendations |
| GET | `/api/analytics/dataset` | Export recommendation dataset (Admin) |
| GET | `/api/analytics/dataset/csv` | Download dataset as CSV (Admin) |

## 🔐 Authentication

Protected routes require a JWT token.

In Postman:

1. Select Authorization.
2. Choose Bearer Token.
3. Enter your JWT token.
4. Send the request.

Available roles:
- Admin
- User
- Guest

## 🧪 API Testing

The APIs were tested using Postman.

Tested functionality includes:
- User signup and login
- Password validation
- JWT authentication
- Role-based authorization
- Product CRUD operations
- Product search, filtering, and sorting
- User profile management
- Order creation and management
- Dashboard analytics
- Product recommendations
- JSON and CSV dataset exports
- Custom 404 error handling

## 📊 Data Analysis

Customer purchase records can be exported through:

`GET /api/analytics/dataset/csv`

The exported CSV contains customer IDs, product IDs, product names, categories, prices, quantities, and order dates.

The dataset can be imported into Altair AI Studio for further analysis.

## 👨‍💻 Author

**Manu Mohandas**

- GitHub: https://github.com/manumohan5665-prog
- LinkedIn: https://linkedin.com/in/manu-mohandas-dev

## 📄 License

This project is developed as part of a Full Stack Web Development assignment.