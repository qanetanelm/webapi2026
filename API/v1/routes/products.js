const router=require('express').Router();//יצירת אובייקט מסוג ראוטר
const productController=require('../controllers/products');//יבוא הקונטרולר המתאים
router.get('/',productController.getAll);//ניתוב הבקשות לנתיב המתאים  ושימוש בקונטרולר
router.get('/:id',productController.getById);
router.delete('/:id',productController.deleteById);
router.post('/',productController.add);
router.put('/:id',productController.update);
    
      
           
               
 module.exports=router;//ייצוא המודול שכתבנו             