import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { setCurrentUsser, setLoggedInOut, setToken } from '../../redux/slices/userSlice';
import axios from 'axios';

function Header() {
    const { cartItems } = useSelector(state => state.cart)
    const { token, isLoggedIn, user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

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
    const logoutUser=()=>{
localStorage.removeItem('currentToken')
                    dispatch(setLoggedInOut(false))
                    dispatch(setToken(''))
               dispatch(setCurrentUsser(null))
               toast.success("Logged out successfully", {
               position: "top-right"
             })
            Navigate('/login')               

    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Byte Store</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                <i className='fas fa-home me-1'></i>Home
                            </Link>
                        </li>

                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        <i className='fas fa-user-plus me-1'></i>Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        <i className='fas fa-sign-in me-1'></i>Login
                                    </Link>
                                </li>
                            </>
                        ) : (
                            // ✅ لف العنصرين في Fragment
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">
                                        <i className='fas fa-user me-1'></i>{user?.username}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <Link className='nav-link border-0 bg-light'
                                    onClick={()=>logoutUser()}>
                                        <i className='fas fa-sign-out me-1'></i>Logout
                                    </Link>
                                </li>
                            </>
                        )}

                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <i className='fas fa-shopping-cart me-1'></i>
                                Cart ({totalQuantity})
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;