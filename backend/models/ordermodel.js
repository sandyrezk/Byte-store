const{Schema,model, Types}=require('mongoose')

const ordershema=Schema({
    productname:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    total:{
        type:String,
        required:true
    },
    
    user
    :{ type:Schema.Types.ObjectId,ref:'users' }
},
{
    timestamps:true
});

module.exports=model('order',ordershema)
