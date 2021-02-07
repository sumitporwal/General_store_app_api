var express=require('express');
const mongo=require('mongodb');
var router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const connection=require('../dbconnection');
const cors=require('cors');
const Register=require('../Models/Register');
const Vendor=require('../Models/Vendor');
const Product=require('../Models/Product');

process.env.SECRET_KEY='secret';
router.use(cors());

router.post('/user/register',(req,res)=>{
console.log("Request Received");
var item={
    name:req.body.name,
    email:req.body.email,
    phno:req.body.phno,
    password:req.body.password,
    username:req.body.username
};
Register.findOne({
    username:req.body.username
})
.then(user=>{
    if(!user){
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            item.password=hash;
            Register.create(item)
            .then(user=>{
                res.json({status : user.email+' registered'})
            })
            .catch(err=>{
                res.send('error:'+ err);
            })
        })
    }
    else{
        res.json({error: "USer already exists"});
    }
})
});
router.post('/user/login',(req,res)=>{
    var item={
        username:req.body.username,
        password:req.body.password
    };
    Register.findOne({
        username:req.body.username
    })
    .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const payload={
                    name:user.name,
                    email:user.email,
                    phno:user.phno,
                    password:user.password,
                    username:user.username
                }
                let token=jwt.sign(payload,process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.status(201);
                res.send(token);
            }
            else{
                res.status(202);
                res.send("Invalid Username or Password");
            }
        }
        else{
            res.send("User does not exist");
        }
    })
    .catch(err=>{
        res.send(err);
    })
})
router.post('/vendor/register',(req,res)=>{
    console.log("Request Received");
    var item={
        name:req.body.name,
        email:req.body.email,
        phno:req.body.phno,
        password:req.body.password
    };
    Vendor.findOne({
        phno:req.body.phno
    })
    .then(user=>{
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                item.password=hash;
                Vendor.create(item)
                .then(user=>{
                    res.json({status : user.phno+' registered'})
                })
                .catch(err=>{
                    res.send('error:'+ err);
                })
            })
        }
        else{
            res.json({error: "Shopkeeper already exists"});
        }
    })
    });
    router.post('/vendor/login',(req,res)=>{
        var item={
            phno:req.body.phno,
            password:req.body.password
        };
        Vendor.findOne({
            phno:req.body.phno
        })
        .then(user=>{
            if(user){
                if(bcrypt.compareSync(req.body.password,user.password)){
                    const payload={
                        name:user.name,
                        email:user.email,
                        phno:user.phno,
                        password:user.password
                    }
                    let token=jwt.sign(payload,process.env.SECRET_KEY,{
                        expiresIn:1440
                    })
                    res.status(201)
                    res.send(token);
                }
                else{
                    res.status(202);
                    res.send("Invalid Phno or Password");
                }
            }
            else{
                res.send("Shopkeeper does not exist");
            }
        })
        .catch(err=>{
            res.send(err);
        })
    })
router.get('/vendor/list',(req,res)=>{
Product.find({})
.then(user=>{
    if(user){
        res.status(201);
        res.send(user);
    }
    else{
        res.status(202)
        res.send("No Records Found");
    }
})
.catch(err=>{
    res.send(err);
})
})
module.exports=router;