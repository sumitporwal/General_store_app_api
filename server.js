var express=require('express');
var bodyParser=require('body-parser');
var cors=require('cors');
var route=require('./Routes/route');
const Port=process.env.PORT||5000;
var connection=require('./dbconnection');
var Register=require('./Models/Register');
var app=express();
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/",route);
app.listen(Port,(req,res)=>{
    console.log("server started at port"+Port);
});