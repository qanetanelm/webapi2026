const mysql=require('mysql2');//חיבור השרת לספריית mysql2
const connection=mysql.createConnection({
    host:'localhost',
    user:'netanel'
    ,password:'123123',
    port:3306,
    database:'webapi'
});

const mysqldb=require('../mysqldb');//יבוא החיבור למסד הנתונים כדי שנוכל להשתמש בו בקבצים אחרים באפליקציה שלנו   
module.exports=connection;//ייצוא החיבור למסד הנתונים כדי שנוכל להשתמש בו בקבצים אחרים באפליקציה שלנו   