const router=require('express').Router();//יצירת אובייקט מסוג ראוטר
const userController=require('../controllers/user');//יבוא הקונטרולר המתאים
router.get('/',userController.getAll);//ניתוב הבקשות לנתיב המתאים  ושימוש בקונטרולר
router.get('/:id',userController.getById);
router.delete('/:id',userController.deleteById);
router.post('/',userController.add);
router.put('/:id',userController.update);
    
      
           
               
 module.exports=router;//ייצוא המודול שכתבנו             