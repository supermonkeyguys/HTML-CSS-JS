function foo(){
    console.log("foo:",this)
}

var obj = {
    name:"Cookie"
}

foo.call(obj)
foo.call(123)
foo.call("Code")
foo.call(undefined)

//------(apply/call补充)------

function fo(name,age,height){
    console.log("fo:",this)
    console.log("参数：",name,age,height)
}

//apply
//第一个参数：绑定this
//第二个参数：传入额外的实参，以数组的形式
fo.apply("apply",["Cookie",99,180])

//call
//第一个参数：绑定this
//参数列表：后续参数以多参数的形式传递，会作为实参
fo.call("call","GG-bond",99,160)
//JavaScript中的所有函数都可以使用call和apply方法
//如果第一个参数未指向声明默认——指向windows

//bind
// 可以将fo函数中的this绑定在obj身上 并且不将函数添加在obj上
function fk(name,age,height,address){
    console.log("fk:",this)
    console.log("Element:",name,age,height,address)
}

var obj = {
    name:"Cookie"
}
//也可以绑参数
var bar = fk.bind(obj,"Code",99,180);
bar("CN") // this -> obj