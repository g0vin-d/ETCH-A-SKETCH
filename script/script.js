const grid = document.getElementById('grid');
const rstbtn = document.querySelector(".rst-btn");
const crtbtn = document.querySelector(".crt-btn");

defaultGrid();

function defaultGrid() {
    let setGrid = 16;
    drawGrid(setGrid, setGrid);
}

function drawGrid(rows, cols) {
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', cols);
    for (let i = 0; i < (rows * cols); i++) {
        let cell = document.createElement("div");
        grid.appendChild(cell).className = "grid-Item";
    }
}

function resetGrid() {
    const griditems = document.querySelectorAll(".grid-Item");
    griditems.forEach(griditem => griditem.style.background = 'white');
}

window.addEventListener("mouseover" , function(e) {
    if (e.target.className == "grid-Item") {
        shadeNode(e);
    }    
});

rstbtn.addEventListener("click" , resetGrid);

crtbtn.addEventListener("click", () => {
    let inp = Number(document.getElementById("gridsize").value);
    const griditems = document.querySelectorAll(".grid-Item");
    griditems.forEach(griditem => grid.removeChild(griditem));
    drawGrid(inp, inp);
});

function shadeNode(e) {
    let hsl;
    let rgb = e.target.style.backgroundColor;
  
    if (!rgb) {
        const hue = getRandomInteger(360);
        hsl = [hue, 100, 100];
    } else {
        rgb = rgb.slice(rgb.indexOf('(') + 1, rgb.lastIndexOf(')'));
        rgb = rgb.split(',');
        hsl = convertRGBToHSL(rgb);
    }

    hsl[2] = (hsl[2] > 10) ? hsl[2] - 10 : 0;

    e.target.style.backgroundColor = `hsl(${hsl[0]}, ${hsl[1]}%,${hsl[2]}%)`;
 }

function convertRGBToHSL(rgb) {
    const rPrime = rgb[0] / 255;
    const gPrime = rgb[1] / 255;
    const bPrime = rgb[2] / 255;
    const cMax = Math.max(rPrime, gPrime, bPrime);
    const cMin = Math.min(rPrime, gPrime, bPrime);
    const delta = cMax - cMin;

    const h = (delta == 0) ? 0 :
            (cMax == rPrime) ? 60 * ((gPrime - bPrime) / delta % 6) :
            (cMax == gPrime) ? 60 * ((bPrime - rPrime) / delta + 2) :
            60 * ((rPrime - gPrime) / delta + 4);

    const l = (cMax + cMin) / 2;

    const s = (delta == 0) ? 0 : delta / (1 - Math.abs(2 * l - 1));

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function getRandomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
}
