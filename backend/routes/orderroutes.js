const Order = require('../models/ordermodel'); // ✅ استدعاء الموديل
const auth=require("../middleware/auth")
const router = require('express').Router();


router.post('/', auth,async (req, res) => {
    try {
    
        const{products}=req.body
        const userId=req.user.userId;
        products.forEach(async(product)=>{
            const order=new Order({
                user:userId,
                productname:product.name,
           qty:product.quantity,
             price:product.price,
             total:product.quantity * product.price
            });
            await order.save();
        })
        return res.status(200).send({
            message:"order paid successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        });
    }
});
router.get('/',auth, async (req, res) => {
    try {
        const orders = await Order.find({user:req.user.userId});
        return res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        });
    }
});

module.exports = router; // ✅ تصدير الراوتر