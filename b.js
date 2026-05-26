const bcrypt=require('bcrypt');
const pass='b12312A';
const roundSalt=10;
bcrypt.hash(pass,roundSalt).then((hashPass)=>{
    console.log(hashPass);
}).catch((err)=>{
    console.log(err);
  
});

let hashPass="$2b$10$5ovMfXg/vIFkg6clHVclFuIt0MICdXObxSxQwyAGzVWXM/zZaj2";
bcrypt.compare(pass, hashPass).then((status)=>{
    if(status)
        
            console.log("GOOD");
    else       
            console.log("NOT GOOD");        
})
