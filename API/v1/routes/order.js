const router=require('express').Router();//יצירת אובייקט מסוג ראוטר
const orderController=require('../controllers/order');//יבוא הקונטרולר המתאים
router.get('/',orderController.getAll);//ניתוב הבקשות לנתיב המתאים  ושימוש בקונטרולר
router.get('/:id',orderController.getById);
router.delete('/:id',orderController.deleteById);
router.post('/',orderController.add);
router.put('/:id',orderController.update);
    
      
           
               
 module.exports=router;//ייצוא המודול שכתבנו             