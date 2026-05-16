import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from "./components/layouts/Header"
import Footer from './components/Footer/Footer'

// ✅ Lazy load — بيتحمل بس لما المستخدم يدخل الصفحة
const Home     = lazy(() => import('./components/Home'))
const Product  = lazy(() => import('./components/products/Product'))
const Cart     = lazy(() => import('./components/cart/Cart'))
const Register = lazy(() => import('./components/user/Register'))
const Login    = lazy(() => import('./components/user/Login'))
const Checkout = lazy(() => import('./components/payments/Checkout'))

// Loading Spinner
const PageLoader = () => (
  <>
    <style>{`
      .page-loader {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        background: #0a0a0f;
        gap: 16px;
      }
      .page-loader-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(108,99,255,0.15);
        border-top-color: #6C63FF;
        border-radius: 50%;
        animation: loaderSpin 0.8s linear infinite;
      }
      .page-loader-text {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.85rem;
        color: rgba(255,255,255,0.3);
        letter-spacing: 0.05em;
      }
      @keyframes loaderSpin {
        to { transform: rotate(360deg); }
      }
    `}</style>
    <div className="page-loader">
      <div className="page-loader-spinner"></div>
      <div className="page-loader-text">Loading...</div>
    </div>
  </>
)

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/category/:category_id" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App