module.exports={
    getAll:( req, res ) => {
   return  res.status(200).json({msg:'all products'});
},
    getById:( req, res ) => {
        const pid=req.params.id;
      return  res.status(200).json({msg:`Got product id: ${pid}`});
},
    deleteById:( req, res ) => {  
            const pid=req.params.id;
           return res.status(200).json({msg:`Deleted product id: ${pid}`});
        },
    add:( req, res ) => { 
               return res.status(200).json({msg:'Created new product'});
            },
    update:( req, res ) => { 
                    const pid=req.params.id;
                   return res.status(200).json({msg:`Updated product id: ${pid}`});
                 }
};//ייצוא המודול שכתבנו 
