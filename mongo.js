require('dotenv').config();//חיבור השרת לספריית dotenv כדי לטעון את משתני הסביבה מהקובץ .env
const mongoose=require('mongoose');//חיבור לספריית מוגוס





const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SRV}/EcommDB`;//הגדרת מחרוזת התחברות
// const productSchema=mongoose.Schema({
//    _id: new mongoose.Schema.Types.ObjectId,
//     pid:Number,
//     pname:String,
//     price:Number,
//     pdesck:String,
//     picname:String,
//     cid:Number
// });
console.log(connStr);
mongoose.connect(connStr).then((conn)=>
{
console.log('MongoDB connected');
}




);
const productModel=mongoose.model('Product', productSchema);


