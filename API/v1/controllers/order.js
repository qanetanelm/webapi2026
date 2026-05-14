module.exports={
    getAll:( req, res ) => {
        return res.status(200).json({msg:'all orders'});
    },
    getById:( req, res ) => {
        const oid=req.params.id;
        return res.status(200).json({msg:`Got order id: ${oid}`});
    },

    deleteById:( req, res ) => {  
            const oid=req.params.id;
           return res.status(200).json({msg:`Deleted order id: ${oid}`});
        },
    add:( req, res ) => { 
               return res.status(200).json({msg:'Created new order'});
            },
    update:( req, res ) => { 
                    const oid=req.params.id;
                   return res.status(200).json({msg:`Updated order id: ${oid}`});
                 }
};//ייצוא המודול שכתבנו 
