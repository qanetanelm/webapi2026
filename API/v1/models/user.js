const mongoose=require('mongoose');//יבוא ספריית מונגוס
mongoose.pluralize(null);//ביטול הריבוי האוטומטי של שם הקולקציה (כדי שהקולקציה תיקרא 'User' ולא 'Users')
const userSchema=mongoose.Schema({//הגדרת מבנה המסמך (סכמה) של משתמש באוסף ה-Mongo
   _id: new mongoose.Schema.Types.ObjectId,
    uid:Number,//מזהה משתמש (מספרי)
    fullname:String,//שם מלא
    pass:String,//סיסמה (מוצפנת עם bcrypt לפני שמירה)
    email:String,//כתובת מייל, משמשת גם להתחברות
});
const userModel=mongoose.model('User', userSchema);//יצירת המודל לפי הסכמה כדי שנוכל לבצע פעולות (find, save וכו') על האוסף
module.exports=userModel;//ייצוא המודל לשימוש בקונטרולר
