module.exports={
    getAll:( req, res ) => {
        return res.status(200).json({msg:'all categorys'});
    },
    getById:( req, res ) => {
        const cid=req.params.id;
        return res.status(200).json({msg:`Got category id: ${cid}`});
    },
    deleteById:( req, res ) => {  
            const cid=req.params.id;
           return res.status(200).json({msg:`Deleted category id: ${cid}`});
        },
    add:( req, res ) => { 
               return res.status(200).json({msg:'Created new category'});
            },
    update:( req, res ) => { 
                    const cid=req.params.id;
                   return res.status(200).json({msg:`Updated category id: ${cid}`});
                 }
};//ייצוא המודול שכתבנו 
