const jwt = require('jsonwebtoken');


const data={uid:5,Email:"n@gmail.com"};
const pk= "netanelMiskovsky";
const token=jwt.sign(data,pk,{expiresIn:'1h'});
console.log(token);

const newData=jwt.verify(token,pk);
console.log(newData);