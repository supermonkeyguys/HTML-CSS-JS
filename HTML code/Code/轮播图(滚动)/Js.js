var imgElement = document.querySelectorAll(".img");

var activeItemElement = null;
for(var i = 0 ; i < imgElement.length ; i ++ ){
    var banner = imgElement[i];

    var itemElement = document.createElement("li");
    itemElement.classList.add("item");
    if(i === 0){
        itemElement.classList.add("active");
        activeItemElement = itemElement;
    }

    var imagesElement = document.querySelector("images");
    imagesElement.appendChild(itemElement);
    

}