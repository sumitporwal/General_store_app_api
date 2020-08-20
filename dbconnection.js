const mongoose = require("mongoose")
const mongoURI='mongodb://localhost:27017/General_store';
mongoose.connect(mongoURI,{useNewUrlParser:true})
.then(()=>console.log("MongoDB Connected"))
.catch(()=>console.log(err));
module.exports=mongoURI;

