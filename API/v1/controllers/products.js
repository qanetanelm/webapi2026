const mySqlDB=require('../models/mysqldb');//יבוא החיבור למסד הנתונים כדי שנוכל להשתמש בו בקבצים אחרים באפליקציה שלנו   
module.exports={

    getAll:( req, res ) => {

        const sql='SELECT * FROM t_products';

        mySqlDB.query(sql,(err,results,fields)=>
        {

            if(err){
                console.log(err);
                console.log(fields);
                return res.status(500).json({msg:'Database error'});
            }

            if(results.length==0){
                return res.status(404).json({msg:'Not Found'});
            }

            console.log(results);

            return res.status(200).json(results);

        });

    },

    getById:( req, res ) => {

        const pid=req.params.id;

        const sql=`SELECT * FROM t_products WHERE pid=${pid}`;

        mySqlDB.query(sql,(err,results,fields)=>{

            if(err){
                console.log(err);
                console.log(fields);
                return res.status(500).json({msg:'Database error'});
            }

            if(results.length==0){
                return res.status(404).json({msg:'Not Found'});
            }

            console.log(results);

            return res.status(200).json(results[0]);

        });

    },
    delete:(req,res)=>{
          const pid=req.params.id; // קבלת קוד המוצר שנשלח
          const sql=`delete from t_products where pid=${pid}`;
          mySqlDB.query(sql,(err,results,feilds)=>{
            if(err==null)
            {
             console.log(results);
             return res.status(200).json(results);
            }
            else
            {
             console.log(err);
             return res.status(500).json({'error':err.message});
            }
        
});
    }
    ,
    add:( req, res ) => {

        return res.status(200).json({
            msg:'Created new product'
        });

    },
    update:( req, res ) => {

    const pid=req.params.id;

    const sql=`UPDATE t_products 
    SET name='${req.body.name}',
    price='${req.body.price}'
    WHERE pid='${pid}'`;

    mySqlDB.query(sql,(err,results,fields)=>
    {

        if(err){
            console.log(err);
            console.log(fields);
            return res.status(500).json({msg:'Database error'});
        }

        if(results.affectedRows==0){
            return res.status(404).json({msg:'Not Found'});
        }

        return res.status(200).json({
            msg:`Updated product id: ${pid}`
        });

    });

}

    

};
//ייצוא המודול 

