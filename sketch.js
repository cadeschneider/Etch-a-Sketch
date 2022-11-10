document.addEventListener("DOMContentLoaded", function(event) {
    
    //Function that sets pixel density
    function setDensity(size){
        for (let i = 0; i < (size*size); i++) {
            container.appendChild(pixel.cloneNode(true));
    }}

    function getSprinkles(){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        console.log(color);
        return color;
        
    }

    function getShading(hexColor, magnitude){
        hexColor = hexColor.replace(`#`, ``);
        if (hexColor.length === 6) {
            const decimalColor = parseInt(hexColor, 16);
            let r = (decimalColor >> 16) + magnitude;
            r > 255 && (r = 255);
            r < 0 && (r = 0);
            let g = (decimalColor & 0x0000ff) + magnitude;
            g > 255 && (g = 255);
            g < 0 && (g = 0);
            let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
            b > 255 && (b = 255);
            b < 0 && (b = 0);
            return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
        } else {
            return hexColor;
        }
    }

    //Function to set listen for hovering mouse on pixels
    function setListener(color="black"){
        if (color === "sprinkles") {
            const pixels = document.querySelectorAll('div');
            pixels.forEach( item => item.addEventListener('mouseover', function(event){
                item.setAttribute('style',`background-color:${getSprinkles()};`);
            }));
        } else if (color === "modern") {
            color = "blue"
            const pixels = document.querySelectorAll('div');
            pixels.forEach( item => item.addEventListener('mouseover', function(event){
                    if (item.style.backgroundColor == "black"){
                        color = "#808080"
                        console.log("poop")
                    }else {
                        color = getShading(item.style.backgroundColor,-10);
                    }
                    console.log(item.style.backgroundColor)
                    item.setAttribute('style',`background-color:${color};`);
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

    const btn = document.querySelectorAll("button");
    btn.forEach( item => item.addEventListener('click', function(e){

        if (e.target.id === "clearBtn"){
            setUp(density.value);
        }else if (e.target.id === "eraserBtn"){
            setListener("white");
        }else if (e.target.id === "colorBtn"){
            setListener("modern");
        }else if (e.target.id === "sprinklesBtn"){
            setListener("sprinkles");
        }

    }));

});