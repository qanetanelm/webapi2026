const productModel = require('../models/product');//יבוא המודל של מוצר (Mongo) כדי לבצע פעולות על האוסף
module.exports = {
    getAll: async (req, res) => {//החזרת כל המוצרים
        try {
            const data = await productModel.find().lean();//שליפת כל המוצרים מהאוסף
             console.log("מספר מוצרים:", data.length);
console.log(data);
            return res.render("products", { layout: "main", data });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getById: async (req, res) => {//החזרת מוצר לפי pid
        const pid = req.params.id;//קבלת המזהה מפרמטרי הנתיב
        try {
            const data = await productModel.find({ pid }).lean();
            let prod={};
            if(data.length>0)
            {
                prod=data[0];
                return res.status(200).json(data);
            }
            
        }
         catch (err)
     {
            return res.status(500).json(err);
        }
    },

    delete:async (req, res) => {//מחיקת מוצר לפי pid
        const pid = req.params.id; // קבלת קוד המוצר שנשלח
        try {
            const data = await productModel.deleteOne({ PID: pid });
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    add:async (req, res) => {//הוספת מוצר חדש
        let data = req.body;//נתוני המוצר שהתקבלו בבקשה
        // הבלוק הבא (fields/values) הוא שריד מהגרסה הישנה שבנתה מחרוזת SQL ידנית -
        // הוא לא בשימוש יותר (המעבר למונגו עובד עם האובייקט data ישירות דרך new productModel(data)),
        // נשאר בכוונה כדוגמה איך זה נראה לפני המעבר למונגו
        let arr = Object.keys(data);
        let fields = ' ';
        let values = ' ';
        for (let i = 0; i < arr.length; i++) {
            fields += `${arr[i]},`;
            values += `'${data[arr[i]]}',`;
        }
        fields = fields.substring(0, fields.length - 1);
        values = values.substring(0, values.length - 1);
        try {
            const newProduct = new productModel(data);//יצירת מסמך חדש לפי המודל
            const savedProduct = await newProduct.save();//שמירה בפועל ב-Mongo
            return res.status(200).json(savedProduct);
        }
        catch (err) {
            return res.status(500).json(err);
        }


    },

    update: async (req, res) => {//עדכון מוצר קיים לפי pid
        const pid = req.params.id;//קבלת קוד המוצר מפרמטרי הנתיב
        const data = req.body;//נתוני העדכון שהתקבלו בבקשה
        try {
            const updatedProduct = await productModel.updateOne({ PID: pid }, data);//עדכון המסמך במונגו
            return res.status(200).json(updatedProduct);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};
//ייצוא המודול
 
