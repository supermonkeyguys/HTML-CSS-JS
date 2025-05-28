let bar = require('./utils.js');
console.log(bar.utilsName);

setTimeout(() => {
    console.log(bar.utilsName);
},4000);
