
const{Schema,model, Types}=require('mongoose')

const categoryshema=Schema({
name:{
        type:String,
        required:true,
          unique: true,

}
    },{
      timestamps:true

})
module.exports=model('category',categoryshema)

