var carousel = document.querySelector('.carousel')
var li = carousel.children;
var prev_button = document.querySelector('#prev')
var next_button = document.querySelector('#next')
var bannerElement = document.querySelector(".banner")

// 1.动态设置页面 添加页面内容
// 1.1动态添加图片
var imgEl = document.querySelectorAll('.images')

// 1.2动态添加指示器
var indicatorEl = document.querySelectorAll( ".indicator > .item")
// for(var i = 0 ; i < )

var indicatorIndex = 0;
var index = 0;
var timer;

function startCarousel(){
    timer = setInterval(function(){
    li[index].classList.remove("focus");
    indicatorEl[indicatorIndex].classList.remove("focus");
    if(index === li.length - 1)index = 0;
    else index++;
    if(indicatorIndex === indicatorEl.length - 1)indicatorIndex = 0;
    else indicatorIndex ++ ;
    li[index].classList.add("focus");
    indicatorEl[indicatorIndex].classList.add("focus");
    },3000)
}

// imgEl.forEach(function(El) {
//     // console.log("stop")
//     El.addEventListener('mouseenter',function(){
//     clearInterval(timer);
//     })
// })
// imgEl.forEach(function(El){
//     // console.log("start");
//     El.addEventListener('mouseleave',function(){
//     startCarousel();
//     })
// })

bannerElement.onmouseenter = () => {
    clearInterval(timer);
}
bannerElement.onmouseleave = () => {
    startCarousel();
}

indicatorEl.forEach(function(item){
    item.addEventListener('click',function(){
        li[index].classList.remove("focus");
        indicatorEl[indicatorIndex].classList.remove("focus");

        index = Array.prototype.indexOf.call(indicatorEl,item);
        indicatorIndex = index;
        
        clearInterval(timer);
        li[index].classList.add("focus");
        indicatorEl[indicatorIndex].classList.add("focus");
    })
})


next_button.addEventListener('click',function(){
    li[index].classList.remove("focus");
    indicatorEl[indicatorIndex].classList.remove("focus");
    if(index === li.length - 1)index = 0;
    else index ++ ;
    if(indicatorIndex === indicatorEl.length - 1)indicatorIndex = 0;
    else indicatorIndex ++ ;
    // console.log(index);
    li[index].classList.add("focus");
    indicatorEl[indicatorIndex].classList.add("focus");
})
prev_button.addEventListener('click',function(){
    li[index].classList.remove("focus");
    indicatorEl[indicatorIndex].classList.remove("focus");
    if(index === 0)index = li.length - 1;
    else index--;
    if(indicatorIndex === 0)indicatorIndex = indicatorEl.length - 1;
    else indicatorIndex -- ;
    li[index].classList.add("focus");
    indicatorEl[indicatorIndex].classList.add("focus");
})

startCarousel();