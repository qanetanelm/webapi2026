const router=require('express').Router();//יצירת אובייקט מסוג ראוטר
const categoryController=require('../controllers/category');//יבוא הקונטרולר המתאים
router.get('/',categoryController.getAll);//ניתוב הבקשות לנתיב המתאים  ושימוש בקונטרולר
router.get('/:id',categoryController.getById);
router.delete('/:id',categoryController.deleteById);
router.post('/',categoryController.add);
router.put('/:id',categoryController.update);
    
      
           
               
 module.exports=router;//ייצוא המודול שכתבנו             