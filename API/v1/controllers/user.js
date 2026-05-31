const mySqlDB=require('../models/mysqldb');//יבוא החיבור למסד הנתונים כדי שנוכל להשתמש בו בקבצים אחרים באפליקציה שלנו   
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
module.exports={
     getAll:( req, res ) => {

        const sql='SELECT * FROM t_user';
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
        const uid=req.params.id;
        const sql=`SELECT * FROM t_user WHERE uid=${uid}`;
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
          const uid=req.params.id; // קבלת קוד המוצר שנשלח
          const sql=`delete from t_user where uid=${uid}`;
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

   add:(req,res)=>{
    
    let data=req.body;
    let arr=Object.keys(data);
    let fields='';
    let values='';

   let sqlName=`SELECT * FROM t_user WHERE email = '${data.email}'`;
    mySqlDB.query(sqlName,(err,results,fld)=>{
         if(err!=null)
            {
             console.log(results);
             return res.status(500).json({'error':err.message});
            }
            else if(results.length>0)
            {
             
             return res.status(201).json({msg:'email already exists '});
            }
     for(let i=0;i<arr.length;i++)
      {
        if(arr[i]=='pass')
        {
            let pass=data[arr[i]];
            let hashPass=bcrypt.hashSync(pass,10);
            fields+=`${arr[i]},`;// pass
            values+=`'${hashPass}',`;
        }
        else
        {

            fields+=`${arr[i]},`;
            values+=`'${data[arr[i]]}',`;
        }
    }   
    fields=fields.substring(0,fields.length-1);
    values=values.substring(0,values.length-1);
    let sql=`INSERT INTO t_user (${fields}) VALUES (${values})`;

    mySqlDB.query(sql,(err,results,fld)=>{
         if(err==null)
          {
             console.log(results);
             return res.status(201).json(results);
          }
         else
         {
           console.log(err);
           return res.status(500).json({'error':err.message});
         }
    });

    
    });
    },

   update:( req, res ) => {
    const uid=req.params.id;
    let sql='UPDATE t_user SET ';
    let data=req.body;
    let arr=Object.keys(data);
    for(let i=0;i<arr.length;i++)


    {
        sql+=`${arr[i]}='${data[arr[i]]}',`;
    }
    sql=sql.substring(0,sql.length-1);
    sql+=` WHERE uid='${uid}'`;
    console.log(sql);
    mySqlDB.query(sql,(err,results,fields)=>
    {
        if(err==null)
        {
            console.log(results);
            return res.status(200).json({ msg: `Updated user id: ${uid}` });
        }
        else
        {
            console.log(err);
            return res.status(500).json({'error':err.message});
        }
        });
},
   login:(req,res)=>{
    
   let data=req.body;
   let sqlLogin=`SELECT * FROM t_user WHERE email = '${data.email}'`;
    mySqlDB.query(sqlLogin,(err,results)=>{
            if(err!=null)
            {
             console.log(err);
             return res.status(500).json({status:false,error:err.message,data:[]});
            }
            else if(results.length==0)
            {
             
             return res.status(200).json({status:false,error:null,data:[]});
            }
           let user=results[0];
           bcrypt.compare(data.pass, user.pass,(err,same)=>{
            if(err != null)
            {
                console.log(err);
                return res.status(500).json({status:false,error:err.message,data:[]});
            }
            if(same==true)
            {
                const token=jwt.sign({uid:user.uid,email:user.email},process.env.PRIVET_KEY,{expiresIn:'1h'});
                return res.status(200).json({status:true,error:null,data:results,token:token});
            }
            else
            {
                return res.status(200).json({status:false,error:null,data:[]});
            }

        
        })
    });
},


};


//ייצוא המודול 

