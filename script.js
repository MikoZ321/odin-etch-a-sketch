const DEFAULT_SIZE = 16;

const container = document.querySelector(".container");

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
const sizeBtn = document.querySelector("button");

sizeBtn.addEventListener('click', function (e) {
    const grid = document.querySelector(".grid");

    container.removeChild(grid);

    let gridSize = prompt("Enter grid side length:");

    while (+gridSize <= 0 || +gridSize > 100) {
        gridSize = prompt("Grid side length must be between 0 and 100");
    }

    makeGrid(+gridSize);

    const squares = document.querySelectorAll('.square');

    squares.forEach(square => square.addEventListener('mouseover', function () {
        if (mouseDown == false) return;
        square.classList.add("hovered");
}));
});
makeGrid(DEFAULT_SIZE);

const squares = document.querySelectorAll('.square');

squares.forEach(square => square.addEventListener('mouseover', function () {
    if (mouseDown == false) return;
    square.classList.add("hovered");
}));