const{Schema,model, Types}=require('mongoose')
const bcrypt = require('bcrypt') 

const usershema=Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    zipcode:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
},{
    timestamps:true

})

module.exports=model('user',usershema)
