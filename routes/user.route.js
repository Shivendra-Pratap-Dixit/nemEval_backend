const express=require("express")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const { userModel } = require("../models/user.model");
const { blacklist } = require("../blacklist");
const userRouter=express.Router();



userRouter.post("/register",(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body;
    try {
       bcrypt.hash(password,5,async(err,hash)=>{
if(err){
    res.status(200).send({"error":err.message})
}else{
    const user =new userModel({name,email,gender,password:hash,age,city,is_married});
    await user.save()
    res.status(200).send({"msg":"A new user has been registed","user":user})
}
       }) 
    } catch (error) {
        res.status(400).send({"error":error})
    }
})
userRouter.post("/login",async(req,res)=>{
const {email,password}=req.body;
try {
    const user=await userModel.findOne({email});
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token =jwt.sign({name:user.name,userID:user._id},"masai",{expiresIn:'7d'})
                res.status(200).send({"msg":"Login Succesfull ","token":token})
            }else{
                res.status(200).send({"msg":"Check Your Credentials"})
            }
        })
    }
} catch (error) {
    res.status(400).send({"error":error})
}
})
userRouter.get("/logout",(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try {
        blacklist.push(token)
        res.status(200).send({"msg":"user has been logged Out"})
    } catch (error) {
        res.status(200).send({"error":error})
    }
})
module.exports={
    userRouter
}