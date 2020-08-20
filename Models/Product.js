var mongoose=require('mongoose');
var Schema=mongoose.Schema

const VendorSchema=new Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    }
})
module.exports=Product=mongoose.model('Product',VendorSchema);