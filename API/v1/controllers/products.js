module.exports={
    getAll:( req, res ) => {
        const sql='SELECT * FROM t_products';
connection.query=connection.query(sql,(err,results,fields)=>
    {
        if(arr==null){
            return res.status(404).json({msg:'Not Found'});
        }
        
        console.log(results);
        return  res.status(200).json({msg:'all products'});
        console.log(err);
        console.log(fields);
    }
    
);
   
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
