const router = require('express').Router();
const jwt= require('jsonwebtoken');

router.get('/',ensureauthenticated,(req,res)=>{
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "tv",
            price: 20000
        }
    ])
})

function ensureauthenticated(req,res,next){
    const token= req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(403).json({
            message:"unauthorized, JWT token required"
        });
    }
    try{
        const details= jwt.verify(token,process.env.SECRET_KEY);
        req.details= details;
        next();
    }
    catch(err){
        return res.status(403).json({
            message:"unauthorized, JWT token wrong or expired"
        })
    }
}

module.exports= router;