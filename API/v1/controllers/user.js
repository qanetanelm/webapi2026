module.exports={
    getAll:( req, res ) => {
        return res.status(200).json({msg:'all users'});
    },
    getById:( req, res ) => {
        const uid=req.params.id;
        return res.status(200).json({msg:`Got user id: ${uid}`});
    },
    deleteById:( req, res ) => {  
            const uid=req.params.id;
           return res.status(200).json({msg:`Deleted user id: ${uid}`});
        },
    add:( req, res ) => { 
               return res.status(200).json({msg:'Created new user'});
            },
    update:( req, res ) => { 
                    const uid=req.params.id;
                   return res.status(200).json({msg:`Updated user id: ${uid}`});
                 }
};//ייצוא המודול שכתבנו 
