const mongoose=require('mongoose');
mongoose.pluralize(null);
const categorySchema=mongoose.Schema({
    cID:Number,//שם השדה תואם לפרונט (Ecom) שמצפה ל-cID
    cName:String
});
const categoryModel=mongoose.model('Category', categorySchema);
module.exports=categoryModel;
