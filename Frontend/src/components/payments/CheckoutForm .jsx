import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCartItems } from "../../redux/slices/cartSlice"
import axios from 'axios'
import { toast } from 'react-toastify'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .cf-form {
    font-family: 'DM Sans', sans-serif;
  }

  .cf-section-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .cf-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.06);
  }

  /* Payment Element wrapper */
  .cf-payment-wrapper {
    margin-bottom: 24px;
  }

  /* Error message */
  .cf-error {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255,80,80,0.08);
    border: 1px solid rgba(255,80,80,0.2);
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 20px;
    color: #ff8a8a;
    font-size: 0.85rem;
    animation: slideIn 0.3s ease;
  }

  /* Success message */
  .cf-success {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(80,255,160,0.08);
    border: 1px solid rgba(80,255,160,0.2);
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 20px;
    color: #6dffb3;
    font-size: 0.85rem;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Pay Button */
  .cf-pay-btn {
    width: 100%;
    padding: 15px;
    background: #6C63FF;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: -0.01em;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
    overflow: hidden;
  }

  .cf-pay-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .cf-pay-btn:hover:not(:disabled)::before {
    opacity: 1;
  }

  .cf-pay-btn:hover:not(:disabled) {
    background: #7b73ff;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(108,99,255,0.4);
  }

  .cf-pay-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  /* Processing state */
  .cf-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Processing overlay */
  .cf-processing-bar {
    height: 2px;
    background: rgba(108,99,255,0.15);
    border-radius: 2px;
    margin-bottom: 24px;
    overflow: hidden;
    display: none;
  }

  .cf-processing-bar.active {
    display: block;
  }

  .cf-processing-bar::after {
    content: '';
    display: block;
    height: 100%;
    width: 40%;
    background: #6C63FF;
    border-radius: 2px;
    animation: progress 1s ease-in-out infinite;
  }

  @keyframes progress {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(350%); }
  }

  /* Footer note */
  .cf-footer-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 16px;
    color: rgba(255,255,255,0.25);
    font-size: 0.78rem;
  }

  .cf-footer-note i {
    color: rgba(108,99,255,0.5);
    font-size: 0.7rem;
  }
`

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'error' | 'success'
  const [isProcessing, setIsProcessing] = useState(false)
  const { token } = useSelector(state => state.user)
  const { cartItems } = useSelector(state => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
      toast.success(response.data.message, { position: "top-right" })
      navigate('/user/orders')
    } catch (error) {
      setIsProcessing(false)
      setMessage('Order placement failed. Please contact support.')
      setMessageType('error')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)
    setMessage('')

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
      setMessageType('error')
      setIsProcessing(false)
    } else if (response.paymentIntent?.id) {
      setMessage('Payment successful! Placing your order...')
      setMessageType('success')
      placeOrder()
    }
  }

  return (
    <>
      <style>{styles}</style>
      <form className="cf-form" id="payment-form" onSubmit={handleSubmit}>

        {/* Progress bar */}
        <div className={`cf-processing-bar ${isProcessing ? 'active' : ''}`}></div>

        {/* Payment Element */}
        <div className="cf-section-label">
          <i className="fas fa-credit-card"></i>
          Payment Details
        </div>

        <div className="cf-payment-wrapper">
          <PaymentElement id="payment-element" />
        </div>

        {/* Message */}
        {message && (
          <div className={messageType === 'success' ? 'cf-success' : 'cf-error'}>
            <i className={`fas ${messageType === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            {message}
          </div>
        )}

        {/* Pay Button */}
        <button
          className="cf-pay-btn"
          disabled={isProcessing || !stripe || !elements}
          type="submit"
        >
          {isProcessing ? (
            <>
              <div className="cf-spinner"></div>
              Processing Payment...
            </>
          ) : (
            <>
              <i className="fas fa-lock" style={{ fontSize: '0.8rem' }}></i>
              Pay Now
            </>
          )}
        </button>

        {/* Footer */}
        <div className="cf-footer-note">
          <i className="fas fa-shield-alt"></i>
          256-bit SSL encrypted payment
        </div>

      </form>
    </>
  )
}

export default CheckoutForm