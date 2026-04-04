const{Schema,model, Types}=require('mongoose')

const productshema=Schema({
    name:{
        type:String,
        required:true
    },
    description :{
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
    image:{
        type:String,
        required:true
    },
    
    category
    :{ type:Schema.Types.ObjectId,ref:'categories' }
},
{
    timestamps:true
});

module.exports=model('product',productshema)
