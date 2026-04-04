const User = require('../models/usermodel'); // ✅ استدعاء الموديل\
const auth = require('../middleware/auth')
require('dotenv').config();
const bcrypt = require('bcrypt') 
var jwt =require('jsonwebtoken')

const router = require('express').Router();

router.post('/register',async(req,res)=>{
    try{
        const{username,email,password,zipcode,address,city}=req.body;
        //validate user data
if(!username||!email||!password||!zipcode||!address||!city){
    return res.status(422).send({
        error:"ALL fields are required"
    })
}
//check if email already exist
const exists= await User.findOne({email})
if(exists){
 return res.status(401).send({
       error:"Email already taken"
})
}
//store user
const hashedpassword=await bcrypt.hash(password,10);
const user= new User({
    username,
    email,
    password:hashedpassword,
    zipcode,
    address,
    city
})
const createduser=await user.save();
if(createduser){
     return res.status(200).send({
       message:"User created successfully"
     
})
}
 }catch(error){
     return res.status(500).send({
       error:error.message
     })
}
})

router.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        //validate user data
if(!email||!password){
    return res.status(422).send({
        error:"ALL fields are required"
    })
}
const user= await User.findOne({email})
if(user){
const passwordcheck= await bcrypt.compare(password,user.password)
if(!passwordcheck){
    return res.status(422).send({
        error:"Invalid email or password"
    })
}else{
    //create token  
    const token= jwt.sign({userId:user._id}, process.env.JWT_SECRET, { expiresIn: "10d" })
         return res.status(200).send({
            user:{
                _id:user._id,
                username:user.username,
                 email:user.email,
                 zipcode:user.zipcode,
            address:user.address,
             city:user.city,

            },
            token
         })
        }
    }else{
        return res.status(422).send({
        error:"Invalid email or password"
    })
    }
}catch(error){
  return res.status(500).send({
       error:error.message
     })
}
 
})

router.get('/user',auth,async(req,res)=>{
const user=await User.findById(req.user.userId)
     return res.status(200).send({
       user:{
          _id:user._id,
                username:user.username,
                 email:user.email,
                 zipcode:user.zipcode,
            address:user.address,
             city:user.city,

       }
     
})
})


module.exports = router; // ✅ تصدير الراوتر