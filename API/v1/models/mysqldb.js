const mysql=require('mysql2');//חיבור השרת לספריית mysql2
const connection=mysql.createConnection({
    host:process.env.MYSQLSRV,
    user:process.env.MYSQLUSER,
    password:process.env.MYSQLPASSWORD,
    port:process.env.MYSQLPORT,
    database:process.env.MYSQLDATABASE
});
connection.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }

    console.log('MySQL connected');
}); 
module.exports=connection;//ייצוא החיבור למסד הנתונים כדי שנוכל להשתמש בו בקבצים אחרים באפליקציה שלנו   
