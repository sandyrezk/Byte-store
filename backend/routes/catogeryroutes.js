const Category = require('../models/categorymodel'); // ✅ استدعاء الموديل

const router = require('express').Router();

const sendcategories = [
    {
         name: 'Phones' 

    },
    { 
        name: 'Laptops'

     }
];

router.post('/', async (req, res) => {
    try {
        const categories = await Category.insertMany(sendcategories);
        return res.status(200).send(categories);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        });
    }
});
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        return res.status(200).send(categories);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        });
    }
});

module.exports = router; // ✅ تصدير الراوتر