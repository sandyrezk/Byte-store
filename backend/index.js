

const express = require('express')
require('dotenv').config()
const cors=require('cors')
const Mongoose  = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3001


app.use(cors())
app.use(express.json())

app.use('/categories',require('./routes/catogeryroutes'))
app.use('/products',require('./routes/productroutes'))
app.use('/users',require('./routes/userroutes'))
app.use('/orders',require('./routes/orderroutes'))
app.use('/payments', require('./routes/paymentroutes'))



Mongoose.connect( process.env.MONGO_URI).then(()=>{
    app.listen(PORT,()=>{
        console.log('app is running')
    })
}).catch((error)=>console.log(error))

