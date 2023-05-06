const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "color";
const DEFAULT_COLOR = "#222831";

let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;

const container = document.querySelector(".container");
const colorBtn = document.querySelector("#color");
const rainbowBtn = document.querySelector("#rainbow");
const clearBtn = document.querySelector("#clear");
const sizeBtn = document.querySelector("#size");

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function setCurrentMode (newMode) {
    currentMode = newMode;
    removeGrid();
    makeGrid(currentSize);
    changeColor(currentMode);
}

function makeGrid (gridSize) {
    const controlsRight = document.querySelector('.right');

    const grid = document.createElement('div');
    grid.classList.add("grid");
    let squareSide = 720 / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const square = document.createElement('div');
        square.classList.add("square");
        square.style.width = `${squareSide}px`;
        square.style.height = `${squareSide}px`;
        grid.appendChild(square);
    }

    container.insertBefore(grid, controlsRight);
}

function removeGrid () {
    const grid = document.querySelector('.grid');
    container.removeChild(grid);
}

function changeColor (currentMode) {
    const squares = document.querySelectorAll('.square');

    squares.forEach(square => square.addEventListener('mouseover', function () {
        if (mouseDown == false) return;
        if (currentMode == "rainbow") {
            const randomR = Math.floor(Math.random() * 256);
            const randomG = Math.floor(Math.random() * 256);
            const randomB = Math.floor(Math.random() * 256);
            square.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        }
        else if (currentMode == "color") square.style.backgroundColor = currentColor;
    }));
}

colorBtn.addEventListener('click', function () {
    rainbowBtn.classList.remove("activated");
    colorBtn.classList.add("activated");
    setCurrentMode("color");
});

rainbowBtn.addEventListener('click', function () {
    colorBtn.classList.remove("activated");
    rainbowBtn.classList.add("activated");
    setCurrentMode("rainbow");
});

clearBtn.addEventListener('click', function () {
    removeGrid();
    makeGrid(+currentSize);
    changeColor(currentMode);
});

sizeBtn.addEventListener('click', function (e) {
    removeGrid();

    currentSize = prompt("Enter grid side length:");
    while (+currentSize <= 0 || +currentSize > 100) {
        currentSize = prompt("Grid side length must be between 0 and 100");
    }

    makeGrid(+currentSize);
    changeColor(currentMode);
});

makeGrid(currentSize);
changeColor(currentMode);