const userModel=require('../models/user');//יבוא המודל של משתמש (Mongo) כדי לבצע פעולות על האוסף
const bcrypt=require('bcrypt');//ספרייה להצפנת סיסמאות
const jwt=require('jsonwebtoken');//ספרייה ליצירת ואימות טוקנים (JWT) להתחברות
module.exports={
    getAll:async( req, res ) => {//החזרת כל המשתמשים
        try{
            const data=await userModel.find();//שליפת כל המסמכים מהאוסף
            return res.status(200).json(data);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },

    getById:async( req, res ) => {//החזרת משתמש לפי uid
        const uid=req.params.id;//קבלת המזהה מפרמטרי הנתיב
        try{
            const data=await userModel.find({uid:uid});
            return res.status(200).json(data);
        }
        catch(err){
            return res.status(500).json(err);
        }
    },
    delete:async(req,res)=>{//מחיקת משתמש לפי uid
          const uid=req.params.id; // קבלת קוד המשתמש שנשלח
          try{
            const data=await userModel.deleteOne({uid:uid});
            return res.status(200).json(data);
          }
          catch(err){
            return res.status(500).json(err);
          }
    },

   add:async(req,res)=>{//הוספת משתמש חדש
    const data=req.body;//נתוני המשתמש שהתקבלו בבקשה
    try{
        const arrUsers=await userModel.find({email:data.email});//בדיקה האם כבר קיים משתמש עם אותו מייל
        if(arrUsers.length>0)
        {
            return res.status(200).json({msg:'email already exists '});
        }
        data.pass=bcrypt.hashSync(data.pass,10);//הצפנת הסיסמה לפני השמירה
        const newUser=new userModel(data);//יצירת מסמך חדש לפי המודל
        const savedUser=await newUser.save();//שמירה בפועל ב-Mongo
        return res.status(201).json(savedUser);
    }
    catch(err){
        return res.status(500).json(err);
    }
    },

   update:async( req, res ) => {//עדכון משתמש קיים לפי uid
    const uid=req.params.id;
    const data=req.body;
    if(data.pass!=undefined)
    {
      data.pass=bcrypt.hashSync(data.pass,10);//אם נשלחה סיסמה חדשה - מצפינים אותה גם כן
    }
    try{
        const updatedUser=await userModel.updateOne({uid:uid},data);
        return res.status(200).json(updatedUser);
    }
    catch(err){
        return res.status(500).json(err);
    }
},


   login:async(req,res)=>{//התחברות משתמש לפי מייל וסיסמה

   let data=req.body;
   let users=await userModel.find({email:data.email});//חיפוש משתמש לפי המייל שנשלח
   if(users.length==0)
   {
    return res.status(200).json({msg:'User/password not found'});
   }
   let user=users[0];
    let status=await bcrypt.compare(data.pass,user.pass);//השוואת הסיסמה שנשלחה לסיסמה המוצפנת השמורה
    if(status==false)
    {
        return res.status(200).json({msg:'User/password not found'});
    }
    const token=jwt.sign({uid:user.uid,email:user.email},process.env.PRIVET_KEY,{expiresIn:'1h'});//יצירת טוקן התחברות בתוקף לשעה
    return res.status(200).json({msg:'login success',token:token});

},
loginPage:async(req,res)=>{//הצגת עמוד התחברות
    res.render('login',{layout:'main'});//רינדור עמוד התחברות עם ה-layout הראשי (main.handlebars)
}
};

//ייצוא המודול 

