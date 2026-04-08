# 🛒 MERN E-Commerce Platform

A full-featured **E-commerce Web Application** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with an **Admin Panel** for product and order management.

---

## 🚀 Features

### 👤 User Features

* 🔐 Secure Authentication (JWT आधारित)
* 🛍️ Browse products across multiple categories (10+)
* 🔎 Search & filter products
* 🛒 Add to Cart / Remove from Cart
* 💳 Order placement system
* 📦 Order history tracking

---

### 🛠️ Admin Features

* 📦 Add / Update / Delete Products
* 🗂️ Manage Categories
* 📊 Manage Orders
* 👥 User Management
* 🔧 Full Admin Dashboard

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux / Context API (if used)
* Axios
* Bootstrap / Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 📂 Project Structure

```
Ecommerce-App/
│
├── client/              # React Frontend
│
├── config/              # DB config
├── controllers/         # Business logic
├── helpers/             # Utility functions
├── middlewares/         # Auth middleware
├── models/              # Mongoose models
├── routes/              # API routes
│
├── server.js            # Entry point
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-app.git
cd ecommerce-app
```

---

### 2️⃣ Setup Backend

```bash
npm install
```

Create a `.env` file in root:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🌐 Key Functionalities

### 🛍️ Product Management

* Add, edit, delete products
* Image handling
* Category-based filtering

---

### 🛒 Cart System

* Add/remove items
* Quantity management
* Persistent cart (localStorage/session)

---

### 💳 Order System

* Place orders
* Track order status
* Admin order control

---

### 🔐 Authentication System

* Register/Login
* Protected routes
* Role-based access (Admin/User)

---

## ⚡ API Endpoints

### Auth

```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Products

```
GET /api/v1/product
POST /api/v1/product
PUT /api/v1/product/:id
DELETE /api/v1/product/:id
```

### Orders

```
POST /api/v1/order
GET /api/v1/order
```

---
## 🧑‍💻 Author

**Md Farman Aslam**

* GitHub: https://github.com/Farmanaslam

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!

---

## 🚀 Future Improvements

* 💳 Payment Gateway Integration (Stripe/Razorpay)
* 📦 Order Tracking UI
* 🔔 Email Notifications
* ⭐ Product Reviews & Ratings
* 📱 Mobile Optimization
