var carousel = document.querySelector('.carousel-img');
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');
var li = carousel.children;

var timer;
var index = 0;

next.addEventListener('click',function(){
    li[index].className = '';
    if(index === li.length - 1)index = 0;
    else index++;
    // console.log(index);
    li[index].className = 'focus';
})
prev.addEventListener('click',function(){
    li[index].className = '';
    if(index === 0)index = 3;
    else index--;
    li[index].className = 'focus';
})

timer = setInterval(function(){
    li[index].className = '';
    if(index == li.length - 1)index = 0;
    else index ++;
    li[index].className = 'focus';

},2000)