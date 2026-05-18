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
getById: (req, res) => {
    const pid = req.params.id;

    const sql = `SELECT * FROM t_products WHERE pid = ?`;

    mysqldb.query(sql, [pid], (err, results, fields) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ msg: 'Not Found' });
        }

        return res.status(200).json(results[0]);
    });
},
    // getById:( req, res ) => {
    //     const pid=req.params.id;
    //     const sql=`SELECT * FROM t_products where pid=${pid}`;
    //     mysqldb.query(sql,(err,results,fields)=>{
    //     if (err == null) {
    //         console.log(results);
    //         return res.status(200).json(results);
    //     }
    //     else if(results.length==0) {
    //         return res.status(404).json({msg:'Not Found'});
    //     }
    //     console.log(results);
    //     return  res.status(200).json({msg:'all products'});
    //     console.log(err);
    //     console.log(fields);
    //      return  res.status(200).json({msg:`Got product id: ${pid}`});
    // }}
     

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
