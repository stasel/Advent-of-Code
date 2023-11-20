import * as fs from 'fs/promises';

const SIZE = 5;

async function loadData() {
    const fileContents = await fs.readFile("input", {'encoding': 'utf8'});
    const components = fileContents.split("\n\n");
    const numbers = components[0].split(",").map(x=>parseInt(x));
    let boards = [];
    for (const stringBoard of components.splice(1)) {
        const board = stringBoard.split("\n").map(row=>row.split(" ").filter(el => el !== '').map(el => parseInt(el)));
        boards.push(board)
    } 
    return { numbers, boards };
}

function mark(number, board) {
    for(const row of board) {
        for(let col = 0; col < SIZE; col ++) {
            if(row[col] == number) {
                row[col] = null;
            }
        }
    }
}

function isBingo(board) {
    // Check rows
    for(let i = 0; i < SIZE; i++) {
        const row = board[i];
        const column = board.map(r => r[i]);
        if(row.every(el=> el === null) || column.every(el => el === null)) {
            return true;
        }
    }

    return false;
}

async function part1() {
    const data = await loadData();

    // Play bingo
    let winnerBoard = null;
    let lastNumber = null;
    while(winnerBoard === null) {
        lastNumber = data.numbers.shift();
        for (const board of data.boards) {
            mark(lastNumber, board);
            if(isBingo(board)) {
                // BINGO!
                winnerBoard = board;
                break;
            }
        }
    }

    // Calculate winner board value
    console.log(winnerBoard, lastNumber);
    let sum = winnerBoard.flat().filter(el => el !== null).reduce((a, b) => a + b, 0);
    console.log(`Result = ${sum * lastNumber}`);
}

async function part2() {
    const data = await loadData();

    // Play bingo
    let lastNumber = null;
    let lastBingoNumber = null;
    let boardWinners = []
    while(data.numbers.length > 0) {
        lastNumber = data.numbers.shift();
        for (let id in data.boards) {
            if(boardWinners.includes(id)) {
                continue;
            }
            const board = data.boards[id]
            mark(lastNumber, board);
            if(isBingo(board)) {
                // BINGO!
                lastBingoNumber = lastNumber;
                console.log(`Bingo board ${id}`);
                boardWinners.push(id);
            }
        }
    }

    // Calculate winner board value
    const lastWinnerBoard = data.boards[boardWinners.at(-1)];
    console.log(lastWinnerBoard, lastBingoNumber);
    let sum = lastWinnerBoard.flat().filter(el => el !== null).reduce((a, b) => a + b, 0);
    console.log(`Result = ${sum * lastBingoNumber}`);
}


await part1();
await part2();