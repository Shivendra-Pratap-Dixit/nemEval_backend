const express=require("express")
const { postModel } = require("../models/post.model")
const { auth } = require("../Middleware/auth.middleware")
const postRouter=express.Router()
postRouter.use(auth)
postRouter.post("/add",async(req,res)=>{

try {
    const newpost=new postModel(req.body)
    await newpost.save()
    res.status(200).send({"msg":"New post Added Succesfully","newpost":newpost})
} catch (error) {
    res.status(400).send({"msg":error})
}
})
postRouter.get("/",async(req,res)=>{

    try {
        const posts=await postModel.find({name:req.body.name})
       
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({"msg":error})
    }
    })
    postRouter.patch("/update/:id",async(req,res)=>{
const {id}=req.params;
const posts=await postModel.findOne({_id:id})
        try {
            if(req.body.userID===posts.userID){
                await postModel.findByIdAndUpdate({_id:id},req.body)
                res.status(200).send({"msg":`Post Updated Succesfully of id :${id}`})
            }else{
            res.status(200).send({"msg":"You are not authorized"})
            }
        } catch (error) {
            res.status(400).send({"msg":error})
        }
        })
        postRouter.delete("/delete/:id",async(req,res)=>{
            const {id}=req.params;
            const posts=await postModel.findOne({_id:id})
                    try {
                        if(req.body.userID===posts.userID){
                            await postModel.findByIdAndDelete({_id:id})
                            res.status(200).send({"msg":`Post Deleted Succesfully of id :${id}`})
                        }else{
                        res.status(200).send({"msg":"You are not authorized"})
                        }
                    } catch (error) {
                        res.status(400).send({"msg":error})
                    }
                    })
                    postRouter.get('/top',async(req,res)=>{
                        try {
                            const userId=req.user._id;
                            const topposts=await postModel.find({user:userId}).sort({no_of_comments:-1}).limit(3)
                            res.status(200).send(topposts)
                        } catch (error) {
                            res.status(400).send({"msg":error})
                        }
                    })
                    module.exports={
                        postRouter
                    }