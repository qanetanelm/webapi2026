require('dotenv').config();//חיבור השרת לספריית dotenv כדי לטעון את משתני הסביבה מהקובץ .env
const express = require('express');//חיבור השרת לספריית Express
const app = express();//יצירת אובייקט אפליקציה של Express
const morgan = require('morgan');//חיבור השרת לספריית Morgan
const routerProduct=require('./api/v1/routes/products');
const routerUser=require('./api/v1/routes/user');
const routerCategory=require('./api/v1/routes/category');
const routerOrder=require('./api/v1/routes/order');
const auth=require('./api/v1/middlewares/auth');


app.use(morgan('dev'));//הגדרת המידלוור של Morgan כדי לרשום את כל הבקשות שמגיעות לשרת בקונסול    n
app.use(express.json());//הגדרת המידלוור של Express לעיבוד בקשות עם גוף בפורמט JSO
app.use('/products',auth,routerProduct);
app.use('/user',routerUser);
app.use('/category',routerCategory);
app.use('/order',routerOrder);
// const mysql = require('mysql');
// //חיבור השרת לספריית mysql2
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'webapiadmin',
//     password: '123123',
//     database: 'webapi   '
// });
// connection.connect();
// connection.query('SELECT * FROM products', (error, results) => {
//     if (error) {
//         console.log('Do not found');
//     }
//     else 
//         {
//         console.log(results);
//     }
// })
    // app.get('/products', (req, res) => {
    //     res.status(200).json({ msg: 'All Products' });//כאשר נקבל בקשה לנתיב הראשי '/' נחזיר תשובה עם סטטוס 200 ומסר בפורמט JSON

//הגדרת נקודת קצה בשיטת גט שכאשר נבקש מהשרת את הנתיב הנל תופעל לאחר מכן פונקציית החזרה


module.exports = app;//ייצוא האפליקציה כדי שנוכל להשתמש בה בקובץ השרת שלנו SERVER.JS
