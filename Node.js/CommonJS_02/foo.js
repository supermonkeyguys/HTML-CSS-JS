let name = "foo";
let age = 2025;
function say(){
    console.log("Hello");
};

module.exports.name = name;
module.exports.age = age;
module.exports.say = say;

// console.log(module.exports === exports);

module.exports = {
    name,
    age,
    say
};