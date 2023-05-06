const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "draw";

let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

const container = document.querySelector(".container");
const sizeBtn = document.querySelector("#size");
const clearBtn = document.querySelector("#clear");

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

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
    if (currentMode == "draw") {
        const squares = document.querySelectorAll('.square');

        squares.forEach(square => square.addEventListener('mouseover', function () {
            if (mouseDown == false) return;
            square.classList.add("hovered");
        }));
    }
}

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