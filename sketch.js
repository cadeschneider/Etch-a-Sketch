//Create pixel canvas
const container = document.querySelector('.canvas');
const pixel = document.createElement('div');

function setDensity(size){
    for (let i = 0; i < (size*size); i++) {
        pixel.remove()
   };
    for (let i = 0; i < (size*size); i++) {
        container.appendChild(pixel.cloneNode(true));
   };
}

setDensity(16)

//Listen for hovering mouse on pixels
const pixels = document.querySelectorAll('div');

pixels.forEach( item => item.addEventListener('mouseover', function(event){

    item.setAttribute('style','background-color:blue;');
}));

//Slider to adjust pixel density in canvas
var density = document.getElementById("density");

density.oninput = function() {

    setDensity(16)
    for (let i = 0; i < ((this.value*this.value) - (16*16)); i++) {
        container.appendChild(pixel.cloneNode(true));
    };
    pixels.forEach( item => item.setAttribute('style',`background-color:red; width:${400/this.value}px; length:${400/this.value}px;`));
}
