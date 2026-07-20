require('dotenv').config();//חיבור השרת לספריית dotenv כדי לטעון את משתני הסביבה מהקובץ .env
const express = require('express');//חיבור השרת לספריית Express
const app = express();//יצירת אובייקט אפליקציה של Express
const morgan = require('morgan');//חיבור השרת לספריית Morgan
const routerProduct=require('./api/v1/routes/products');
const routerUser=require('./api/v1/routes/user');
const routerCategory=require('./api/v1/routes/category');
const routerOrder=require('./api/v1/routes/order');
const auth=require('./api/v1/middlewares/auth');
const mongoose=require('mongoose');//חיבור לספריית מוגוס    
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SRV}/EcommDB`;//הגדרת מחרוזת התחברות
const session=require('express-session');//חיבור לספריית express-session
const {MongoStore}=require('connect-mongo');//חיבור לספריית connect-mongo כדי לשמור sessions במונגו במקום בזיכרון
const cors = require('cors');//חיבור לספריית 
const path = require('path');
const hbs = require('express-handlebars');//חיבור לספריית express-handlebars
console.log(connStr);
mongoose.connect(connStr).then((conn)=>
{
console.log('MongoDB connected');
})
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:connStr}),//שמירת ה-sessions באוסף נפרד במונגו במקום ב-MemoryStore (שלא מתאים ל-production ומאבד הכל בכל הפעלה מחדש)
    cookie:{maxAge:1000*60*60*24}//הגדרת משך חיי הסשן ל-24 שעות
}));
app.use(express.static('public'));//הגשת קבצים סטטיים (css/images) מתוך תיקיית public - בלי זה css/style.css והתמונות לא ייטענו בדפדפן
app.use(morgan('dev'));//הגדרת המידלוור של Morgan כדי לרשום את כל הבקשות שמגיעות לשרת בקונסול    n
app.use(express.json());//הגדרת המידלוור של Express לעיבוד בקשות עם גוף בפורמט JSON
app.use(express.urlencoded({ extended: true }));//הגדרת המידלוור של Express לעיבוד טופסי HTML רגילים
app.engine('handlebars', hbs.engine({
    layoutsDir: path.join(__dirname, 'API', 'v1', 'views', 'layouts'),
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');//הגדרת מנוע התבניות של Handlebars
app.set('views', path.join(__dirname, 'API', 'v1', 'views'));//הגדרת תיקיית התבניות של Handlebars
app.set('layouts','./views/layouts/main');//הגדרת התבנית הראשית של Handlebars
app.set('partials','./views/partials');//הגדרת תיקיית החלקים של Handlebars
app.use(express.static(path.join(__dirname, 'API', 'v1', 'public')));//הגשת קבצים סטטיים (css/images) מתוך תיקיית public - בלי זה css/style.css והתמונות לא ייטענו בדפדפן

app.use(cors());
app.get('/',(req,res)=>{
    res.render('index');//רינדור עמוד הבית עם ה-layout הראשי (main.handlebars)
});
app.use('/products',routerProduct);
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
