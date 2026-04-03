import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm '

// ✅ Move outside component — avoids recreating on every render
const stripePromise = loadStripe('pk_test_51TIGsc48Bb9IboBHTTUhwczi99Wp6XWL9fmauvyFTf4LikdFh7CmdiJx0JcLxahJ83SAXqivGjFK3mhew3U9UdRr0091cS20rs')

function Stripe({ amount }) {  // ✅ Destructure from props
  const [clientSecret, setClientSecret] = useState('')
  const total = amount * 100  // ✅ Use this instead of amount in the API call
  const { isLoggedIn } = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      const fetchClientSecret = async () => {
        try {
          const response = await axios.post('http://localhost:3001/payments/pay', {
            amount: total  // ✅ Send amount in cents
          })
          setClientSecret(response.data.clientSecret)
        } catch (error) {
          console.error(error)
        }
      }
      fetchClientSecret()
    }
  }, [isLoggedIn, navigate, total])  // ✅ Complete deps array

  // ✅ Valid JSX return with a wrapper fragment
  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}

export default Stripe