const mySqlDB=require('../models/mysqldb');//יבוא החיבור למסד הנתונים כדי שנוכל להשתמש בו בקבצים אחרים באפליקציה שלנו   
module.exports={

    getAll:( req, res ) => {

        const sql='SELECT * FROM t_products';
        mySqlDB.query(sql,(err,results,fields)=>
        {
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
    },

    getById:( req, res ) => {
        const pid=req.params.id;
        const sql=`SELECT * FROM t_products WHERE p_id=${pid}`;
        mySqlDB.query(sql,(err,results,fields)=>{

            if(err==null){
                console.log(results);
                return res.status(200).json(results);
            }
            else{
                console.log(err);
                return res.status(500).json({'error':err.message});
            }
        });
    },
    delete:(req,res)=>{
          const pid=req.params.id; // קבלת קוד המוצר שנשלח
          const sql=`delete from t_products where p_id=${pid}`;
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
    },
    
    add:( req, res ) => {
        let data=req.body;
        let arr=Object.keys(data);
        let fields=' ';
        let values=' ';
        for(let i=0;i<arr.length;i++)
            {
                fields+=`${arr[i]},`;
                values+=`'${data[arr[i]]}',`;
            }
        fields=fields.substring(0,fields.length-1);
        values=values.substring(0,values.length-1);
        let sql=`INSERT INTO t_products (${fields}) VALUES (${values})`;
        mySqlDB.query(sql,(err,results,fld)=>{
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
    },
    update:( req, res ) => {
    const pid=req.params.id;
    let sql='UPDATE t_products SET ';
    let data=req.body;
    let arr=Object.keys(data);
    for(let i=0;i<arr.length;i++)
    {
        sql+=`${arr[i]}='${data[arr[i]]}',`;
    }
    sql=sql.substring(0,sql.length-1);
    sql+=` WHERE p_id='${pid}'`;
    mySqlDB.query(sql,(err,results,fld)=>
    {
        if(err==null)
        {
            console.log(results);
            return res.status(200).json({ msg: `Updated product id: ${pid}` });
        }
        else
        {
            console.log(err);
            return res.status(500).json({'error':err.message});
        }
        });
}

    

};
//ייצוא המודול 

