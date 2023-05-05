const gridSize = 16;

const container = document.querySelector(".container");
for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement('div');
    square.classList.add("square");
    container.appendChild(square);
}