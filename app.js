const express = require('express');//חיבור השרת לספריית Express
const app = express();//יצירת אובייקט אפליקציה של Express
//ניצור מידלוור משלנו
const myLog=require('./api/v1/middlewares/myLog');//יבוא המידלוור שיצרנו כדי לרשום את כל הבקשות שמגיעות לשרת בקונסול    
app.use(myLog);//הגדרת המידלוור שיצרנו כדי לרשום את כל הבקשות שמגיעות לשרת בקונסול  
//שכבת אבטחה
app.use((req,res,next)=>{
    const arrAllowList=['127.0.0.1' ,'::1'];
    for(let i=0;i<arrAllowList.length;i++){
     if(req.ip==arrAllowList[i]){next();}
    }  
        return res.status(403).json({msg:'Forbidden'});
});
const morgan = require('morgan');//חיבור השרת לספריית Morgan
app.use(morgan('dev'));//הגדרת המידלוור של Morgan כדי לרשום את כל הבקשות שמגיעות לשרת בקונסול    n
app.use(express.json());//הגדרת המידלוור של Express לעיבוד בקשות עם גוף בפורמט JSON
const routerProduct=require('./api/v1/routes/products');
app.use('/product',routerProduct);
const routerCategory=require('./api/v1/routes/category');
app.use('/category',routerCategory);
const routerUser=require('./api/v1/routes/user');
app.use('/user',routerUser);
const routerOrder=require('./api/v1/routes/order');
app.use('/order',routerOrder);


const mysql = require('mysql');
//חיבור השרת לספריית mysql2
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'webapiadmin',
    password: '123123',
    database: 'webapi   '
});
connection.connect();
connection.query('SELECT * FROM products', (error, results) => {
    if (error) {
        console.log('Do not found');
    }
    else 
        {
        console.log(results);
    }
}
    // app.get('/products', (req, res) => {
    //     res.status(200).json({ msg: 'All Products' });//כאשר נקבל בקשה לנתיב הראשי '/' נחזיר תשובה עם סטטוס 200 ומסר בפורמט JSON

//הגדרת נקודת קצה בשיטת גט שכאשר נבקש מהשרת את הנתיב הנל תופעל לאחר מכן פונקציית החזרה


module.exports = app;//ייצוא האפליקציה כדי שנוכל להשתמש בה בקובץ השרת שלנו SERVER.JS