const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
    const token=req.headers.authorization.split(" ")[1];
    const user =jwt.verify(token,process.env.PRIVET_KEY);
    req.user=user;
    next();
}
catch{
   
    return res.status(401).json({msg:'Unauthorized'});
}   
};