// "use strict"

//定义函数
function foo(){ 
    console.log("foo:",this);
}
//1.1.直接调用
foo();//默认绑定 

//1.2.函数定义在对象中，但是独立调用
var obj = {
    name:"why",
    bar:function(){
        console.log("bar:",this)
    }
}
var baz = obj.bar;
baz();//默认绑定

//1.3.高阶函数
function test(fn){
    fn();
}
test(obj.bar);

//2.1.通过对象
var obj = {name:"why"};
obj.aaa = foo;
obj.aaa();