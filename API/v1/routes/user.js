const router=require('express').Router();//יצירת אובייקט מסוג ראוטר
const userController=require('../controllers/user');//יבוא הקונטרולר המתאים
const auth=require('../middlewares/auth');
router.get('/',auth,userController.getAll);//ניתוב הבקשות לנתיב המתאים  ושימוש בקונטרולר
router.get('/:id',auth,userController.getById);
router.delete('/:id',auth,userController.delete);
router.post('/',auth,userController.add);
router.put('/:id',auth,userController.update);
router.post('/login',userController.login);
    
      
           
               
 module.exports=router;//ייצוא המודול שכתבנו             