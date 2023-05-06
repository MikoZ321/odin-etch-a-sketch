const container = document.querySelector(".container");
function makeGrid (gridSize) {
    const grid = document.createElement('div');
    grid.classList.add("grid");

    for (let i = 0; i < gridSize * gridSize; i++) {
        const square = document.createElement('div');
        square.classList.add("square");
        grid.appendChild(square);
    }

    container.appendChild(grid);
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
});
makeGrid(16);

const squares = document.querySelectorAll('.square');

squares.forEach(square => square.addEventListener('mouseover', function (e) {
    square.classList.add("black");
}));