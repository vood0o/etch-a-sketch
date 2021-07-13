//coloring divs with blackening
const bwButton = document.querySelector('#bwButton');
bwButton.addEventListener('click', function () {
    const allDivs = document.querySelectorAll('.divs');
    allDivs.forEach(anyDiv => anyDiv.removeEventListener('mouseenter', rainbowing));
    allDivs.forEach(anyDiv => anyDiv.addEventListener('mouseenter', blackening));
});

//coloring divs with rainbowing
const rainbowButton = document.querySelector('#rainbowButton');
rainbowButton.addEventListener('click', function () {
    const allDivs = document.querySelectorAll('.divs');
    allDivs.forEach(anyDiv => anyDiv.removeEventListener('mouseenter', blackening));
    allDivs.forEach(anyDiv => anyDiv.addEventListener('mouseenter', rainbowing));
});

const gameGrid = document.querySelector('#gameGrid');
const rangeBar = document.querySelector('#changeSquaresForm input[type=range]');
rangeBar.addEventListener('mouseup', changeNumberOfDivs);

//initialize 16x16 divs in the main grid
function initDivs() {
    for (let i = 0; i < 16 * 16; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'divs';
        gameGrid.appendChild(newDiv);
    }
}
initDivs(16);

//change number of divs
function changeNumberOfDivs() {
    if (confirm("By changing the density you will reset the entire board. Proceed?") == true) {
        // rangeBar.nextElementSibling.value = `${rangeBar.value}x${rangeBar.value}`;
        const squared = rangeBar.value * rangeBar.value;

        gameGrid.innerHTML = '';
        gameGrid.setAttribute('style', `grid-template-columns: repeat(${rangeBar.value}, 1fr); grid-template-rows: repeat(${rangeBar.value}, 1fr);`)

        for (let i = 0; i < squared; i++) {
            const newDiv = document.createElement('div');
            newDiv.className = 'divs';
            gameGrid.appendChild(newDiv);
        }
    }
}

//reset
const clearButton = document.querySelector('#clearButton');
clearButton.addEventListener('click', resetGrid);
function resetGrid() {
    gameGrid.innerHTML = '';
    gameGrid.setAttribute('style', `grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat(16, 1fr);`)
    initDivs(16);
}

function rainbowing(e) {
    let r = Math.floor(Math.random() * 255 + 1);
    let g = Math.floor(Math.random() * 255 + 1);
    let b = Math.floor(Math.random() * 255 + 1);
    let a = (Math.random() + 0.3).toFixed(1);
    e.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    e.target.style.transition = 'all 0.3s';
}

function blackening(e) {
    e.target.style.backgroundColor = `rgba(0, 0, 0, 1)`;
    e.target.style.transition = 'all 0.3s';
}
