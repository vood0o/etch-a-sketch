/**
 * OK- creez un grid principal;
 * OK- la incarcarea paginii se apeleaza o functie care genereaza 16x16 (256) div-uri in interiorul grid-ului
 * creez un form cu banda care schimba marimea grid-ului principal (minim 1x1, maxim 100x100)
 *      - OK- la selectia unui "numar" pe banda se va apela o functie care:
 *          -- OK- se cere permisiunea sa se stearga (confirm)
 *              --- OK- afiseaza vizual numarul de div-uri
 *              --- OK- se sterg toate div-urile existente in grid
 *              --- OK- se genereaza un numar de div-uri egal cu numar * numar
 *              --- OK- se schimba .style "grid-template-columns: repeat(***numar***, 1fr)"
 *              --- OK- se schimba .style "grid-template-rows: repeat(***numar***, 1fr)"
 *              --- OK- se adauga div-urile generate in grid-ul principal
 * 
 * creez o functie care se apeleaza la "onmouseenter" deasupra unui div din interiorul grid-ului:
 *      - DACA NU ARE clasa blackDiv
 *          -- se adauga clasa blackDiv cu background-color: rgba(0,0,0,0);
 *      - DACA NU ARE background-color: rgba(0,0,0,1)
 *          -- se adauga 0.1 la alpha din background-color: rgba(0,0,0, +0.1);
 * 
 * OK- creez un form care are un buton "Reset"
 *      - la apasarea butonului se va apela o functie care:
 *          -- sterge toate stilurile din toate div-urile din interiorul grid-ului
 *          -- sterge toate clasele din toate div-urile din interiorul grid-ului
 *          -- adauga clasa defaultDiv cu background-color: rgba(255,255,255,1);
 * 
 */

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