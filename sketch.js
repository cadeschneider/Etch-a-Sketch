document.addEventListener("DOMContentLoaded", function(event) {
    
    //Function that sets pixel density
    function setDensity(size){
        for (let i = 0; i < (size*size); i++) {
            container.appendChild(pixel.cloneNode(true));
    }}

    //Function that generates random colors
    function getSprinkles(){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        console.log(color);
        return color;
    }

    //Function to set listen for hovering mouse on pixels
    function setListener(color="black"){
        if (color === "sprinkles") {
            const pixels = document.querySelectorAll('div');
            pixels.forEach( item => item.addEventListener('mouseover', function(event){
                item.setAttribute('style',`background-color:${getSprinkles()};`);
            }));
        }else {
            const pixels = document.querySelectorAll('div');
            pixels.forEach( item => item.addEventListener('mouseover', function(event){
                item.setAttribute('style',`background-color:${color};`);
            }));
        }
    }

    //Function that initiates canvas size and adds listeners
    function setUp(size){
        document.getElementById('canvas').innerHTML = '';
        setDensity(size);
        setListener();
        container.setAttribute('style',`background-color:white; grid-template-columns: repeat(${size}, 1fr);`);
    }

    //Initialize page
    const container = document.querySelector('#canvas');
    const pixel = document.createElement('div');

    setUp(16);
    setListener();

    //Slider to adjust pixel density in canvas
    var density = document.getElementById("density");
    var output = document.getElementById("displaySize");
    output.textContent = `${density.value} x ${density.value}`;

    density.oninput = function() {
        output.textContent = `${density.value} x ${density.value}`;
        document.getElementById('canvas').innerHTML = '';
        setUp(this.value);
    };

    //Set up responsive buttons
    const btn = document.querySelectorAll("button");
    btn.forEach( item => item.addEventListener('click', function(e){

        if (e.target.id === "clearBtn"){
            setUp(density.value);
        }else if (e.target.id === "eraserBtn"){
            setListener("white");
        }else if (e.target.id === "colorBtn"){
            setListener(e.target.textContent);
        }else if (e.target.id === "sprinklesBtn"){
            setListener("sprinkles");
        }

    }));

});