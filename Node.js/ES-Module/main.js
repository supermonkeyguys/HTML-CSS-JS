//导入方式一
// import {name,age,say} from "./foo.js";

//导入方式二, 给标识符起别名
// import {name as fname , age , say} from  "./foo.js";

// console.log(fname);
// console.log(age);
// say();

//导入方式三, 给整个模块起别名
import * as foo from "./foo.js";

console.log(foo.name);
console.log(foo.age);
console.log(foo.say());