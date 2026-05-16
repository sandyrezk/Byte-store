import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { setCurrentUsser, setLoggedInOut, setToken } from '../../redux/slices/userSlice';
import axios from 'axios';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .bs-nav {
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0f;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 0 2rem;
    height: 68px;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(20px);
  }

  .bs-nav .container-fluid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0;
  }

  /* Logo */
  .bs-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    color: #fff !important;
    text-decoration: none !important;
    letter-spacing: -0.03em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .bs-logo span {
    color: #6C63FF;
  }

  .bs-logo-dot {
    width: 7px;
    height: 7px;
    background: #6C63FF;
    border-radius: 50%;
    display: inline-block;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.7; }
  }

  /* Nav Links */
  .bs-nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .bs-nav-links .nav-link {
    color: rgba(255,255,255,0.55) !important;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 6px 14px !important;
    border-radius: 8px;
    transition: all 0.2s ease;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .bs-nav-links .nav-link:hover {
    color: #fff !important;
    background: rgba(255,255,255,0.07);
  }

  .bs-nav-links .nav-link i {
    font-size: 0.8rem;
    opacity: 0.7;
  }

  /* Username chip */
  .bs-user-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 12px;
    background: rgba(108,99,255,0.12);
    border: 1px solid rgba(108,99,255,0.25);
    border-radius: 100px;
    color: #a89fff !important;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .bs-user-avatar {
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #6C63FF, #a89fff);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    color: #fff;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
  }

  /* Logout */
  .bs-logout {
    color: rgba(255,100,100,0.7) !important;
    cursor: pointer;
    background: none;
    border: none;
  }

  .bs-logout:hover {
    color: #ff6464 !important;
    background: rgba(255,100,100,0.08) !important;
  }

  /* Auth buttons */
  .bs-btn-ghost {
    color: rgba(255,255,255,0.6) !important;
  }

  .bs-btn-register {
    background: #6C63FF !important;
    color: #fff !important;
    padding: 7px 16px !important;
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.85rem;
  }

  .bs-btn-register:hover {
    background: #7b73ff !important;
    color: #fff !important;
  }

  /* Cart */
  .bs-cart-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px !important;
    background: rgba(255,255,255,0.05) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    border-radius: 10px !important;
    color: rgba(255,255,255,0.8) !important;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .bs-cart-btn:hover {
    background: rgba(255,255,255,0.09) !important;
    border-color: rgba(255,255,255,0.18) !important;
    color: #fff !important;
  }

  .bs-cart-badge {
    background: #6C63FF;
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${0} > 0 ? 'badgePop 0.3s ease' : 'none'};
  }

  @keyframes badgePop {
    0% { transform: scale(0.5); }
    70% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  /* Divider */
  .bs-divider {
    width: 1px;
    height: 24px;
    background: rgba(255,255,255,0.08);
    margin: 0 8px;
  }

  /* Mobile toggle */
  .bs-toggler {
    background: rgba(255,255,255,0.06) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    border-radius: 8px !important;
    padding: 6px 10px !important;
  }

  .bs-toggler .navbar-toggler-icon {
    filter: invert(1);
    width: 18px;
    height: 18px;
  }

  @media (max-width: 991px) {
    .bs-nav {
      height: auto;
      padding: 12px 1.2rem;
    }

    .bs-nav-links {
      flex-direction: column;
      align-items: flex-start;
      padding: 12px 0;
      gap: 2px;
    }

    .bs-nav-links .nav-link {
      width: 100%;
    }

    .bs-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
    }
  }
`;

function Header() {
  const { cartItems } = useSelector(state => state.cart)
  const { token, isLoggedIn, user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const getLoggedInUser = async () => {
      const config = {
        headers: {
          "content-type": 'application/json',
          "Authorization": `Bearer ${token}`
        }
      }
      try {
        const response = await axios.get('http://localhost:3001/users/user', config)
        dispatch(setCurrentUsser(response.data.user))
      } catch (error) {
        if (error?.response?.status === 401) {
          sessionStorage.removeItem('currentToken')
          dispatch(setLoggedInOut(false))
          dispatch(setToken(''))
        }
      }
    }
    if (token) getLoggedInUser()
  }, [token])

  const logoutUser = () => {
    localStorage.removeItem('currentToken')
    dispatch(setLoggedInOut(false))
    dispatch(setToken(''))
    dispatch(setCurrentUsser(null))
    toast.success("Logged out successfully", { position: "top-right" })
    navigate('/login')
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <>
      <style>{styles}</style>
      <nav className="bs-nav navbar navbar-expand-lg">
        <div className="container-fluid">

          {/* Logo */}
          <Link className="bs-logo" to="/">
            <span className="bs-logo-dot"></span>
            Byte<span>Store</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler bs-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="bs-nav-links navbar-nav ms-auto align-items-lg-center">

              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>

              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link bs-btn-ghost" to="/login">
                      <i className="fas fa-sign-in"></i> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link bs-btn-register" to="/register">
                      <i className="fas fa-user-plus"></i> Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <span className="nav-link bs-user-chip">
                      <div className="bs-user-avatar">
                        {getInitials(user?.username)}
                      </div>
                      {user?.username}
                    </span>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link bs-logout"
                      onClick={logoutUser}
                      to="#"
                    >
                      <i className="fas fa-sign-out"></i> Logout
                    </Link>
                  </li>
                </>
              )}

              <li><div className="bs-divider"></div></li>

              <li className="nav-item">
                <Link className="nav-link bs-cart-btn" to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  Cart
                  {totalQuantity > 0 && (
                    <span className="bs-cart-badge">{totalQuantity}</span>
                  )}
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;