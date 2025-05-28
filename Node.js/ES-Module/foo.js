const name = " Cookie";
const age = 19;
function say() {
    console.log("sayHello");
};


//导出方式一
export {
    name,
    age,
    say
}

//导出方式二, 给标识符起别名
// export {
//     name as fname,
//     age,
//     say
// }

//导出方式三
// export const fname = "Popguys";