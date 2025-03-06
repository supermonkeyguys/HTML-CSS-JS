//1.变量与常量
{
    let count = 0;
    ++ count;
    //先使用const常量定义,发现该值需要更改再定义成变量(var,let)

    // const BASE_URL = 'http://web.hello.com/api';
}

// 2.模板字符串
const str1 = 'bond';
const str2 = `GG-${str1}`;

console.log(str2);

// 3.解构赋值
const array = [1,2,3];
const val_1 = array[0];
const val_2 = array[1];
const val_3 = array[2];
//  ||
//  ||
const [a,b,c] = [91,78,66];

console.log(b);

// 解构字符串时 常量/变量 名得和内容名一致(如：user_name)
// 也可以像第二种方式获取(age:user_age)
// ... + 变量名 会获取 剩余未被获取的内容
const {user_name , age: user_age , ...other_info} = {
    user_name: 'GG-bond',
    age: 99,
    gender: 'male',
    category: 'user'
}

console.log(user_name , user_age , other_info);

// 4.1.数组和对象的扩展
const arrary_1 = [1,2,3];
const arrary_2 = [4,5,6];

// ...在赋值符号前为解构，在后为扩展运算符
// 扩展符类似解压包,把对应的数组拆包放在其中

const arrary_3 = [100,...arrary_1,...arrary_2,90,22];

console.log(arrary_3);

const obj_1 = {
    age: 18
}
const obj_2 = {
    gender:'male'
}

const obj_3 = {
    name: 'GG-bond',
    ...obj_1,
    ...obj_2
}

console.log(obj_3);

//  4.2.数组方法 1-Array.from()
function fn() {
    Array.from(arguments).forEach(function(item){
        console.log(item);
    })
}
fn(1,2,3,4);

// 4.3 对象的方法 Object.assign()
const objA = {
    name: 'GG-bond',
    age:99
}

const objB = {
    age:78,
    gender:'male',
    category:'user'
}
// 可以对对象进行一个拷贝功能或者合并 ， 基于旧对象生成新对象功能
const objC = Object.assign({},objA,objB)
console.log(objA,objB,objC)

//  5.Class 类的功能
class A {
    constructor (name,age) {
        this.name = name;
        this.age = age;
    }

    // 类似函数
    intruduces(){
        console.log(`瓦达西瓦${this.name}`);
    }

}

const a1 = new A('GG-bond',77);
console.log(a1);
a1.intruduces();

// 继承
class B extends A {
    constructor(name,age,gender){
        // 继承时若继承父类原有参数需要先用super进行导入，再创建其他新参数
        super(name,age);
        this.gender = gender;
    }

    Say (){
        console.log('GG-FF');
    }
}

const b1 = new B('FF',18,'female')
console.log(b1);
b1.Say();
b1.intruduces();

// 6.函数箭头(伪函数)
// 箭头前为传入值 箭头后为返回值
const getSum_1 = n => n + 3;
const getSum_2 = (n1,n2) => n1 + n2;
// 没有return则会返回undefined
const getSum_3 = (n1,n2, ...other) => console.log(n1,n2,other)

// const getSum3 = (n1,n2,...other) => {
//     const otherSum = other.reduce((sum,val) => sum + val,0);
//     return otherSum;
// }
// console.log(getSum3(1,2,55,66,77,88,99));

console.log(getSum_1(5));
console.log(getSum_2(7,7));
console.log(getSum_3(1,2,55,66,77,88,99));