const express = require('express')
const stripe = require('stripe')
require('dotenv').config()

const Stripe = new stripe(process.env.STRIPE_SECRET_KEY)

const paymentroutes = express.Router()  // ✅ لازم تكون قبل paymentroutes.post

paymentroutes.post('/pay', async (req, res) => {
    const { amount } = req.body
    console.log('amount received:', amount)

    if (!amount) {
        return res.status(422).send({ error: 'Amount is required' })
    }

    try {
        const paymentIntent = await Stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true
            }
        })

        res.send({
            clientSecret: paymentIntent.client_secret
        })

    } catch (error) {
        console.log('Stripe error:', error.message)
        res.status(500).send({ error: error.message })
    }
})

module.exports = paymentroutes