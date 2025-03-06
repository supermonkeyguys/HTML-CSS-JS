var carousel = document.querySelector('#carousel')
var li = carousel.children;
var prev_button = document.querySelector('#prev')
var next_button = document.querySelector('#next')

var index = 0;
var timer;

function startCarousel(){
    timer = setInterval(function(){
    li[index].classList.remove("focus");
    if(index === li.length - 1)index = 0;
    else index++;
    li[index].classList.add("focus");
    },3000)
}

next_button.addEventListener('click',function(){
    li[index].classList.remove("focus");
    if(index === li.length - 1)index = 0;
    else index++;
    // console.log(index);
    li[index].classList.add("focus");
})
prev_button.addEventListener('click',function(){
    li[index].classList.remove("focus");
    if(index === 0)index = 3;
    else index--;
    li[index].classList.add("focus");
})

startCarousel();