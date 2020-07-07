const grid = document.getElementById('grid');
const rstbtn = document.querySelector(".rst-btn");
const crtbtn = document.querySelector(".crt-btn");

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

window.addEventListener("mouseover" , function(event) {
    if (event.target.className == "grid-Item") {
        const rand1 = Math.floor(Math.random() * 16777215).toString(16);
        event.target.style.background = '#' + rand1;
    }    
});

rstbtn.addEventListener("click" , resetGrid);

crtbtn.addEventListener("click", () => {
    let inp = Number(document.getElementById("gridsize").value);
    const griditems = document.querySelectorAll(".grid-Item");
    griditems.forEach(griditem => grid.removeChild(griditem));
    drawGrid(inp, inp);
});