import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

function Cart() {
    const { cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch()  // ← ناقص كمان
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <div className='container'>
            <div className='row my-5'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-body'>
                            {
                                !cartItems.length ?
                                <div className='alert alert-info'>
                                    Your cart is empty!
                                </div>
                                :
                                <div>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Subtotal</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                        />
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${item.price}</td>
                                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                                    <td>
                                                        <button
                                                            className='btn btn-sm btn-danger'
                                                            onClick={() => dispatch(removeFromCart(item.id))}  // ← جوا الـ button
                                                        >
                                                            <i className='fas fa-trash'></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="5" className='text-end fw-bold'>Total:</td>
                                                <td className='fw-bold text-danger'>${totalPrice.toFixed(2)}</td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div className='d-flex justify-content-end align-items-center'>
<Link to="/checkout" className='btn btn-primary rounded-0 '>
Checkout
</Link>
<Link to="/" className='btn btn-dark rounded-0 mx-1 '>
Continue Shopping
</Link>
                                        </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart