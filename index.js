const express=require("express");
const { connection } = require("./db");
const cors=require("cors");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",userRouter);
app.use("/posts",postRouter)
app.listen(8080,async()=>{
    try {
        await connection
        console.log("Running at 8080 and connected to DBAtlas")
    } catch (error) {
        console.log(error)
    }
   
})