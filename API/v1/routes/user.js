const router=require('express').Router();//יצירת אובייקט מסוג ראוטר
const userController=require('../controllers/user');//יבוא הקונטרולר המתאים
const auth=require('../middlewares/auth');
router.get('/',auth,userController.getAll);//ניתוב הבקשות לנתיב המתאים  ושימוש בקונטרולר
router.post('/login',userController.login);
router.get('/loginPage',userController.loginPage);//הצגת עמוד התחברות
router.get('/:id',auth,userController.getById);
router.delete('/:id',auth,userController.delete);
router.post('/',auth,userController.add);
router.put('/:id',auth,userController.update);
    
      
           
               
 module.exports=router;//ייצוא המודול שכתבנו             