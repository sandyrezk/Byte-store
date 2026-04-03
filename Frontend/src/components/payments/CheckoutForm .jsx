import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux' // ✅ زيد useDispatch
import { useNavigate } from 'react-router-dom'
import { clearCartItems } from "../../redux/slices/cartSlice"
import axios from 'axios'                              // ✅ ناقص
import { toast } from 'react-toastify'                 // ✅ ناقص

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const { token } = useSelector(state => state.user)
  const { cartItems } = useSelector(state => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()                       // ✅ ناقص

  // ✅ placeOrder خارج handleSubmit
  const placeOrder = async () => {
    const config = {
      headers: {
        "content-type": 'application/json',
        "Authorization": `Bearer ${token}`
      }
    }
    try {
      const response = await axios.post('http://localhost:3001/orders', {
        products: cartItems
      }, config)
      dispatch(clearCartItems())
      setIsProcessing(false)
      toast.success(response.data.message, {
        position: "top-right"
      })
      navigate('/user/orders')
    } catch (error) {
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: 'if_required',
    })

    if (
      (response.error && response.error.type === 'card_error') ||
      (response.error && response.error.type === 'validation_error')
    ) {
      setMessage(response.error.message)
      setIsProcessing(false)
    } else if (response.paymentIntent.id) {
      placeOrder()
      setMessage('Payment successful!')
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
      {message && <div>{message}</div>}
    </form>
  )
}

export default CheckoutForm