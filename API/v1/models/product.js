const mongoose=require('mongoose');
mongoose.pluralize(null);
const productSchema=mongoose.Schema({
   _id: new mongoose.Schema.Types.ObjectId,
    pid:Number,
    pname:String,
    price:Number,
    pdesck:String,
    picname:String,
    cid:Number
});
const productModel=mongoose.model('Product', productSchema);
module.exports=productModel;
