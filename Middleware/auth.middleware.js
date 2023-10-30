const jwt=require("jsonwebtoken");
const { blacklist } = require("../blacklist");
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(!blacklist.includes(token)){
        if(token){
            jwt.verify(token,"masai",(err,decoded)=>{
                if(decoded){
                    req.body.userID=decoded.userID;
                    req.body.name=decoded.name;
                    next()
                }else{
                    res.send({"msg":"You are not authorized"})
                }
            })
        }else{
            res.send({"msg":"Please Login ~!!"})
        }
    }else{
        res.send({"msg":"You have to login again session expired"})
    }
}
module.exports={
    auth
}