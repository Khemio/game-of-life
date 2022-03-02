const field = document.querySelector('#field');

const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const restrtBtn = document.querySelector('#restart');

const sizeDetail = document.querySelector('#size');
const maxCellsDetail = document.querySelector('#max-live');
const cellsLeftDetail = document.querySelector('#cells-left');
const speedDetail = document.querySelector('#speed');

const setFrequency = document.querySelector('#set-frequency');
const setSize = document.querySelector('#set-size');
const setSeeds = document.querySelector('#set-seeds');





let width = 100;

let alive = 0;

let cellNumber;
let cellsLeft;

let frequency = 5;

let intervalId;

let cells = [];
let nextGen = [];



function createField() {

    field.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

    cellNumber = 5;
    cellsLeft = cellNumber;

    sizeDetail.innerText = `${width} X ${width}`;
    maxCellsDetail.innerText = `${cellNumber}`;
    cellsLeftDetail.innerText = `${cellsLeft}`;
    speedDetail.innerText = `${frequency}`;


    for(let i = 0; i < width*width; i++) {
        const box = {
            cell: null,
            value: 0
        }

        const cell = document.createElement('div');
        cell.classList.add('cell');
        field.appendChild(cell);
        box.cell = cell;

        cells.push(box);
        nextGen.push(box);

    }
}

function checkCells(time) {
    

    intervalId = setInterval(() => {for(let i = 0; i < cells.length; i++) {
        let total = 0;

        const isLeftEdge = (i % width === 0);
        const isRightEdge = (i % width === width - 1);
        const isTopEdge = (i < width);
        const isBottomEdge = (i >= width * width - width);

        if(i === 0) {
            if(cells[cells.length - 1].cell.classList.contains('alive')) total++;
        }
        if(i === width - 1) {
            if(cells[cells.length - width].cell.classList.contains('alive')) total++;
        }
        if(i === cells.length - width) {
            if(cells[width-1].cell.classList.contains('alive')) total++;
        }
        if(i === cells.length - 1) {
            if(cells[0].cell.classList.contains('alive')) total++;
        }

        if(isLeftEdge) {
            if(cells[i-1+width].cell.classList.contains('alive')) total++; // Left
            if(!isTopEdge && cells[i-1].cell.classList.contains('alive')) total++; //Top Left
            if(!isBottomEdge && cells[i-1+width*2].cell.classList.contains('alive')) total++; //Bottom Left
            if(!isTopEdge && cells[i-width].cell.classList.contains('alive')) total++; //Top
            if(!isBottomEdge && cells[i+width].cell.classList.contains('alive')) total++; //Bottom
            if(!isTopEdge && cells[i+1-width].cell.classList.contains('alive')) total++; //Top Right
            if(cells[i+1].cell.classList.contains('alive')) total++; //Right
            if(!isBottomEdge && cells[i+1+width].cell.classList.contains('alive')) total++;//Bottom Right
        }

        if(isTopEdge) {
            if(!isLeftEdge && cells[i-1].cell.classList.contains('alive')) total++; // Left
            if(!isLeftEdge && cells[i-1+(cells.length-width)].cell.classList.contains('alive')) total++; //Top Left
            if(cells[i-1+width].cell.classList.contains('alive')) total++; //Bottom Left
            if(cells[i+(cells.length-width)].cell.classList.contains('alive')) total++; //Top
            if(cells[i+width].cell.classList.contains('alive')) total++; //Bottom
            if(!isRightEdge && cells[i+1+(cells.length-width)].cell.classList.contains('alive')) total++; //Top Right
            if(!isRightEdge && cells[i+1].cell.classList.contains('alive')) total++; //Right
            if(!isRightEdge && cells[i+1+width].cell.classList.contains('alive')) total++;//Bottom Right
        }

        if(isRightEdge) {
            if(cells[i-1].cell.classList.contains('alive')) total++; // Left
            if(!isTopEdge && cells[i-1-width].cell.classList.contains('alive')) total++; //Top Left
            if(!isBottomEdge && cells[i-1+width].cell.classList.contains('alive')) total++; //Bottom Left
            if(!isTopEdge && cells[i-width].cell.classList.contains('alive')) total++; //Top
            if(!isBottomEdge && cells[i+width].cell.classList.contains('alive')) total++; //Bottom
            if(!isTopEdge && cells[i+1-width*2].cell.classList.contains('alive')) total++; //Top Right
            if(cells[i+1-width].cell.classList.contains('alive')) total++; //Right
            if(!isBottomEdge && cells[i+1].cell.classList.contains('alive')) total++;//Bottom Right
        }

        if(isBottomEdge) {
            if(!isLeftEdge && cells[i-1].cell.classList.contains('alive')) total++; // Left
            if(!isLeftEdge && cells[i-1-width].cell.classList.contains('alive')) total++; //Top Left
            if(!isLeftEdge && cells[i-1-(cells.length-width)].cell.classList.contains('alive')) total++; //Bottom Left
            if(cells[i-width].cell.classList.contains('alive')) total++; //Top
            if(cells[i-(cells.length-width)].cell.classList.contains('alive')) total++; //Bottom
            if(!isRightEdge && cells[i+1-width].cell.classList.contains('alive')) total++; //Top Right
            if(!isRightEdge && cells[i+1].cell.classList.contains('alive')) total++; //Right
            if(!isRightEdge && cells[i+1-(cells.length-width)].cell.classList.contains('alive')) total++;//Bottom Right
        }

        if(!isBottomEdge && !isLeftEdge && !isTopEdge && !isRightEdge) {

            if(cells[i - 1].cell.classList.contains('alive')) total++; //Left
            if(cells[i - 1 - width].cell.classList.contains('alive')) total++; //Top Left
            if(cells[i - 1 + width].cell.classList.contains('alive')) total++; //Bottom Left
            if(cells[i - width].cell.classList.contains('alive')) total++; //Top
            if(cells[i + width].cell.classList.contains('alive')) total++; //Bottom
            if(cells[i + 1].cell.classList.contains('alive')) total++; //Right
            if(cells[i + 1 - width].cell.classList.contains('alive')) total++; //Top Right
            if(cells[i + 1 + width].cell.classList.contains('alive')) total++; //Top Left
        }


        if(cells[i].value === 1) {
            if(total === 2 || total === 3) {
                nextGen[i].value = 1;
                nextGen[i].cell.classList.add('alive');
                alive++;
            } else {
                nextGen[i].value = 0
                nextGen[i].cell.classList.remove('alive');
                alive--;
            }

        } else {
            if (total === 3) {
                nextGen[i].value = 1;
                nextGen[i].cell.classList.add('alive');
                alive++;
            }
        }
    }}, time)

    cells = [...nextGen];
    
}

function seedField(cell) {
    if(cellsLeft === 0) {
        cells.map(cell => cell.cell.removeEventListener('click', seedField));
    } else {
        cell.value = 1;
        cell.cell.classList.add('alive');
        cellsLeft--;
        cellsLeftDetail.innerText = `${cellsLeft}`;
        cell.cell.removeEventListener('click', seedField)
    }
}

function initField() {

    cells.map(cell => cell.cell.addEventListener('click', () => seedField(cell)));
}

function clearField() {
    cells.map(cell => {
        // cell.cell.classList.remove()
        field.removeChild(cell.cell)
        cell.cell = null;
        cell.value = 0;
        
    })

    cells = [];
    nextGen = [];
}

function play() {
    createField();

    initField();

    setFrequency.addEventListener('change', () => {
        frequency = setFrequency.value;
        clearInterval(intervalId);
    })
    setSize.addEventListener('change', () => {
        width = setSize.value;
        clearInterval(intervalId);
        intervalId = null;
        clearField();      
        createField();
        initField();
        
    })
    setSeeds.addEventListener('change', () => {
        cellNumber = setSeeds.value;
        cellsLeft = cellNumber;

        maxCellsDetail.innerText = `${cellNumber}`;
        cellsLeftDetail.innerText = `${cellsLeft}`;
        
    })

    startBtn.addEventListener('click', () => {
        checkCells(1000/frequency);
    });

    stopBtn.addEventListener('click', () => clearInterval(intervalId));

    restrtBtn.addEventListener('click', () => {
        console.log('click');
        clearInterval(intervalId);
        intervalId = null;
        clearField();      
        createField();
        initField();
    })

}

play();

