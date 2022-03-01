const field = document.querySelector('.field');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const restrtBtn = document.querySelector('#restart');
const input = document.querySelector('#frequency');

const width = 10;

let alive = 0;

let cellNumber = 5;

let frequency = 5;

let intervalId;

let cells = [];
let nextGen = [];




function createField() {

    // field.style.gridTemplateColumns = `repeat(${width}, 1fr);`
    cellNumber = 5;


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
            if(cells[cells.length - 1].value === 1) total++;
        }
        if(i === width - 1) {
            if(cells[cells.length - width].value === 1) total++;
        }
        if(i === cells.length - width) {
            if(cells[width-1].value === 1) total++;
        }
        if(i === cells.length - 1) {
            if(cells[0].value === 1) total++;
        }

        if(isLeftEdge) {
            if(cells[i-1+width].value === 1) total++; // Left
            if(!isTopEdge && cells[i-1].value === 1) total++; //Top Left
            if(!isBottomEdge && cells[i-1+width*2].value === 1) total++; //Bottom Left
            if(!isTopEdge && cells[i-width].value === 1) total++; //Top
            if(!isBottomEdge && cells[i+width].value === 1) total++; //Bottom
            if(!isTopEdge && cells[i+1-width].value === 1) total++; //Top Right
            if(cells[i+1].value === 1) total++; //Right
            if(!isBottomEdge && cells[i+1+width].value === 1) total++;//Bottom Right
        }

        if(isTopEdge) {
            if(!isLeftEdge && cells[i-1].value === 1) total++; // Left
            if(!isLeftEdge && cells[i-1+(cells.length-width)].value === 1) total++; //Top Left
            if(cells[i-1+width].value === 1) total++; //Bottom Left
            if(cells[i+(cells.length-width)].value === 1) total++; //Top
            if(cells[i+width].value === 1) total++; //Bottom
            if(!isRightEdge && cells[i+1+(cells.length-width)].value === 1) total++; //Top Right
            if(!isRightEdge && cells[i+1].value === 1) total++; //Right
            if(!isRightEdge && cells[i+1+width].value === 1) total++;//Bottom Right
        }

        if(isRightEdge) {
            if(cells[i-1].value === 1) total++; // Left
            if(!isTopEdge && cells[i-1-width].value === 1) total++; //Top Left
            if(!isBottomEdge && cells[i-1+width].value === 1) total++; //Bottom Left
            if(!isTopEdge && cells[i-width].value === 1) total++; //Top
            if(!isBottomEdge && cells[i+width].value === 1) total++; //Bottom
            if(!isTopEdge && cells[i+1-width*2].value === 1) total++; //Top Right
            if(cells[i+1-width].value === 1) total++; //Right
            if(!isBottomEdge && cells[i+1].value === 1) total++;//Bottom Right
        }

        if(isBottomEdge) {
            if(!isLeftEdge && cells[i-1].value === 1) total++; // Left
            if(!isLeftEdge && cells[i-1-width].value === 1) total++; //Top Left
            if(!isLeftEdge && cells[i-1-(cells.length-width)].value === 1) total++; //Bottom Left
            if(cells[i-width].value === 1) total++; //Top
            if(cells[i-(cells.length-width)].value === 1) total++; //Bottom
            if(!isRightEdge && cells[i+1-width].value === 1) total++; //Top Right
            if(!isRightEdge && cells[i+1].value === 1) total++; //Right
            if(!isRightEdge && cells[i+1-(cells.length-width)].value === 1) total++;//Bottom Right
        }

        if(!isBottomEdge && !isLeftEdge && !isTopEdge && !isRightEdge) {

            if(cells[i - 1].value === 1) total++; //Left
            if(cells[i - 1 - width].value === 1) total++; //Top Left
            if(cells[i - 1 + width].value === 1) total++; //Bottom Left
            if(cells[i - width].value === 1) total++; //Top
            if(cells[i + width].value === 1) total++; //Bottom
            if(cells[i + 1].value === 1) total++; //Right
            if(cells[i + 1 - width].value === 1) total++; //Top Right
            if(cells[i + 1 + width].value === 1) total++; //Top Left
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
    if(cellNumber === 0) {
        cells.map(cell => cell.cell.removeEventListener('click', seedField));
    } else {
        cell.value = 1;
        cell.cell.classList.add('alive');
        cellNumber--;
    }
}

function initField() {

    cells.map(cell => cell.cell.addEventListener('click', () => seedField(cell)));

    // cells[55].value = 1;
    // cells[55].cell.classList.add('alive');

    // cells[53].value = 1;
    // cells[53].cell.classList.add('alive');

    // cells[44].value = 1;
    // cells[44].cell.classList.add('alive');

    // cells[45].value = 1;
    // cells[45].cell.classList.add('alive');

    // cells[56].value = 1;
    // cells[56].cell.classList.add('alive');
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

    input.addEventListener('change', () => {
        frequency = input.value;
        clearInterval(intervalId);
    })

    startBtn.addEventListener('click', () => {
        checkCells(1000/frequency);
    });

    stopBtn.addEventListener('click', () => clearInterval(intervalId));

    restrtBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        intervalId = null;
        clearField();      
        createField();
        // console.log(cells);
        initField();
    })

}

play();

