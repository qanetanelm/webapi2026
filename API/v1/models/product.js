const mongoose=require('mongoose');
mongoose.pluralize(null);
const productSchema=mongoose.Schema({
    //הוסרה שורת _id שהייתה כאן (new mongoose.Schema.Types.ObjectId) - היא יצרה ObjectId קבוע במקום להגדיר טיפוס,
    //ומנעה מ-Mongoose ליצור _id אוטומטי בזמן שמירה (שגיאת "document must have an _id before saving")
    PID:Number,//שם השדה תואם לפרונט (Ecom) שמצפה ל-PID
    pName:String,
    price:Number,
    pDesc:String,
    picName:String,
    cID:Number
});
const productModel=mongoose.model('Product', productSchema);
module.exports=productModel;
