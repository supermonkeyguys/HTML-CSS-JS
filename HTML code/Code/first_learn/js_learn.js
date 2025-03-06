var block = document.querySelector('#block');
var header = document.querySelector('#header');
var a = document.querySelectorAll('#header a')

console.log(block);
console.log(header);
console.log(a);

//事件会被下面的优先覆盖可以采取其他方式(如下:addEventListener)
// block.onclick = function(){
//     alert('Hello!');
// }

block.onclick = function(){
    alert('Man!');
}

header.onclick = function(){
    alert('Man!');
}

// document.querySelectorAll 方法会返回一个 NodeList 对象
// 它类似于数组，包含了所有匹配选择器的元素节点
// 但 NodeList 本身并没有 onclick 这样的事件绑定方法
// 所以 a.onclick = function(){ alert('Are you OK?') } 这行代码会报错
// a.onclick = function(){
//     alert('Are you OK?')
// }

a.forEach(function(element){
    element.onclick = function(){
        alert('Are you OK?');
    }
})

block.addEventListener('click',function(){
    alert('HaJiMI')
})

block.addEventListener('click',function(){
    alert('ManBo')
})