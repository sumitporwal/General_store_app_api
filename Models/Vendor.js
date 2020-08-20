var mongoose=require('mongoose');
var Schema=mongoose.Schema

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,  
    },
    phno:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});
module.exports=Vendor=mongoose.model('Vendor',UserSchema);