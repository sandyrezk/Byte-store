import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from "./components/layouts/Header"
import Home from "./components/Home"
import Product from "./components/products/Product"
import Cart from './components/cart/Cart'
import Register from'./components/user/Register'
import Login from './components/user/Login'
import Checkout from "./components/payments/Checkout"

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/category/:category_id" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
                    <Route path="/checkout" element={<Checkout/>} />



      </Routes>
    </BrowserRouter>
  )
}

export default App