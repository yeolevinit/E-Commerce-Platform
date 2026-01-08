# E-Commerce Backend API

Backend server for the E-Commerce platform built with Express.js, MongoDB, and JWT authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your configuration:
   - MongoDB connection string
   - JWT secret key
   - Stripe API keys
   - Cloudinary credentials (for image uploads)

3. **Start the server:**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/                # Mongoose models (to be added)
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Cart.js
├── routes/                # API routes (to be added)
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   ├── orders.js
│   └── admin.js
├── controllers/           # Route controllers (to be added)
│   ├── authController.js
│   ├── productController.js
│   └── orderController.js
├── utils/                 # Utility functions (to be added)
│   └── generateToken.js
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
└── server.js              # Main server file
```

## 🔌 API Endpoints

### Health Check
- `GET /` - Server status
- `GET /api/health` - Health check

### Authentication (Coming Soon)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products (Coming Soon)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart (Coming Soon)
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Orders (Coming Soon)
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

## 🛠️ Technologies

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Cloudinary** - Image storage
- **CORS** - Cross-origin resource sharing

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- CORS configuration
- Environment variable protection
- Input validation with express-validator

## 📝 Development

- Use `npm run dev` for development with nodemon auto-reload
- Follow RESTful API conventions
- Add proper error handling for all routes
- Validate all inputs
- Use async/await for database operations

## 🚧 Next Steps

1. Create User model and authentication routes
2. Create Product model and CRUD operations
3. Implement shopping cart functionality
4. Integrate Stripe payment
5. Add admin dashboard endpoints
6. Implement AI product recommendations

## 📄 License

ISC
