const qr = require('qrcode')
let data = {
    "name": "Edu",
    "email": "edu@gmail.com",
    "gender": "male",
    "id": 123
};
let stJson = JSON.stringify(data);

// qr.toString(stJson,{type:"terminal", small: true}, function(err,code)
// {
//     if(err) return console.log("error");
//     console.log(code);
// });

// qr.toDataURL(stJson,{type:"terminal"}, function(err,code)
// {
//     if(err) return console.log("error");
//     console.log(code);
// });

qr.toFile('qr.png',stJson,function(err)
{
    if(err) return console.log("error");
});