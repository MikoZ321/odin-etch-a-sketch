const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "color";
const DEFAULT_COLOR = "#222831";

let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;

const container = document.querySelector(".container");
const colors = document.querySelectorAll(".color");
const otherInput = document.querySelector("#colorInput");
const colorBtn = document.querySelector("#color");
const rainbowBtn = document.querySelector("#rainbow");
const clearBtn = document.querySelector("#clear");
const sizeSlider = document.querySelector("#size");

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function setCurrentMode (newMode) {
    currentMode = newMode;
    changeColor(currentMode);
}

function setCurrentColor (e) {
    currentColor = e.target.dataset.color;
    setCurrentMode("color");
    rainbowBtn.classList.remove("activated");
    colorBtn.classList.add("activated");
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
colors.forEach(color => color.addEventListener('click', function (e) {
    colors.forEach(color => color.classList.remove("selected"));
    color.classList.add("selected");
    setCurrentColor(e);
    changeColor(currentMode);
}));

otherInput.addEventListener('input', function (e) {
    const otherTile = document.querySelector("#other");
    otherTile.style.backgroundColor = e.target.value;
    otherTile.setAttribute("data-color", e.target.value);
    changeColor(currentMode);
});

colorBtn.addEventListener('click', function () {
    if (currentColor == "#222831") {
        const lastColor = document.querySelector("#fakeBlack");
        lastColor.classList.add("selected");
    }
    else if (currentColor != 'red' && currentColor != 'blue' && currentColor != 'green' && currentColor != 'yellow' && currentColor != 'white') {
        const lastColor = document.querySelector("#other");
        lastColor.classList.add("selected");
    }
    else {
        const lastColor = document.querySelector(`#${currentColor}`);
        lastColor.classList.add("selected");
    }

    rainbowBtn.classList.remove("activated");
    colorBtn.classList.add("activated");
    setCurrentMode("color");
});

rainbowBtn.addEventListener('click', function () {
    const colors = document.querySelectorAll(".color");

    colors.forEach(color => color.classList.remove("selected"));
    colorBtn.classList.remove("activated");

    rainbowBtn.classList.add("activated");
    setCurrentMode("rainbow");
});

clearBtn.addEventListener('click', function () {
    removeGrid();
    makeGrid(+currentSize);
    changeColor(currentMode);
});

sizeSlider.oninput = function (e) {
    currentSize = e.target.value;

    const sizeText = document.querySelector("#sizeText");
    sizeText.textContent = `${currentSize} x ${currentSize}`;

    removeGrid();
    makeGrid(currentSize);
    changeColor(currentMode);
}

const sizeText = document.querySelector("#sizeText");
sizeText.textContent = `${currentSize} x ${currentSize}`;

makeGrid(currentSize);
changeColor(currentMode);