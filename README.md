# 🛒 ByteStore — Laptop & Mobile E-Commerce

A full-stack e-commerce web application for buying laptops and mobile phones, built with the MERN stack and Stripe payment integration.

---

## 🚀 Tech Stack

**Frontend:**
- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Bootstrap
- React Toastify
- Stripe.js / React Stripe.js

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Stripe API
- dotenv

---

## ✨ Features

- 🔐 User Authentication (Register / Login / Logout)
- 🛍️ Browse laptops and mobile phones
- 🛒 Add to cart / Remove from cart
- 💳 Stripe Payment Integration
- 📦 Place orders after successful payment
- 📋 View order history
- 🔒 Protected routes (checkout requires login)
- 💾 Cart persisted in localStorage

---

## 📁 Project Structure

```
ByteStore/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── payments/
│   │   │   │   ├── Stripe.jsx
│   │   │   │   ├── CheckoutForm.jsx
│   │   │   │   └── Checkout.jsx
│   │   │   ├── layout/
│   │   │   │   └── Header.jsx
│   │   │   └── cart/
│   │   │       └── Cart.jsx
│   │   ├── redux/
│   │   │   └── slices/
│   │   │       ├── cartSlice.js
│   │   │       └── userSlice.js
│   │   └── App.jsx
└── backend/
    ├── routes/
    │   ├── paymentroutes.js
    │   ├── orderroutes.js
    │   ├── userroutes.js
    │   ├── productroutes.js
    │   └── catogeryroutes.js
    └── index.js
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/sandyrezk/Byte-store.git
cd Byte-store
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

Start the backend:
```bash
node index.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 💳 Stripe Test Cards

Use these test card numbers to simulate payments:

| Card | Number | Expiry | CVC |
|------|--------|--------|-----|
| ✅ Success | `4242 4242 4242 4242` | Any future date | Any 3 digits |
| ❌ Declined | `4000 0000 0000 0002` | Any future date | Any 3 digits |

---

## 🌐 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port (default: 3001) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_test_...) |

---

## 👩‍💻 Author

**Sandy Rezk**
- GitHub: [@sandyrezk](https://github.com/sandyrezk)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
