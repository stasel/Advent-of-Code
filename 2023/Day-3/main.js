import * as utils from '../../utils/index.js'

const isSymbol = (char) => {
    return isNaN(char) && char !== '.';
};

const getSymbolsMap = (input) => {
    let symbols = [];
    const lines = input.split('\n');
    for (let row = 0; row < lines.length; row++) {
        const line = lines[row].split('');
        for (let col = 0; col < line.length; col++) {
            if (isSymbol(line[col])) {
                const char = line[col];
                symbols.push({ row, col, char });
            }
        }
    }
    return symbols;
};

const isAjestentToSymbol = (row, col, length, symbols) => {
    return !!symbols.find(symbol => {
        // Same row in the begining
        if(symbol.row === row && symbol.col === col - 1) {
            return true
        }
        // Same row in the end
        if(symbol.row === row && symbol.col === col + length) {
            return true
        }
        // Ajestent row, 
        if ((symbol.row === row + 1 || symbol.row === row - 1) 
            && symbol.col >= col - 1 && symbol.col <= col + length) {
            return true;
        }
        return false;
    });
};

const getAjestentNumbers = (symbol, numbers) => {
    return numbers.filter(number => {
        // Same row in the begining
        if(number.row === symbol.row && symbol.col === number.col -1) {
            return true;
        }
        // Same row in the end
        if(number.row === symbol.row && symbol.col === number.col + number.length) {
            return true;
        }
        // Ajestent row, 
        if ((number.row === symbol.row + 1 || number.row === symbol.row - 1) 
            && symbol.col >= number.col - 1 && symbol.col <= number.col + number.length) {
            return true;
        }
        return false;
    });
}

const getNumberMap = (input) => {
    let numberMap = [];
    input.split('\n').forEach((line, row) => {
        const matches = [...line.matchAll(/(\d+)/g)] ?? [];
        matches.forEach(match => {
            const value = match[0];
            const length = value.length;
            const col = match.index;
            numberMap.push({ row, col, length, value: Number.parseInt(value) });
        });
    });
    return numberMap;
};

const part1 = async () => {
    const file = await utils.loadFile('./input');
    const symbols = getSymbolsMap(file);
    const numbers = getNumberMap(file);
    const solution = numbers
        .filter(number => isAjestentToSymbol(number.row, number.col, number.length, symbols))
        .map(number => number.value)
        .sum();
    console.log("Part 1 solution: ", solution); // not: 522844
};

const part2 = async () => {
    const file = await utils.loadFile('./input');
    const symbols = getSymbolsMap(file);
    const numbers = getNumberMap(file);
    const solution = symbols
        .filter(symbol => symbol.char === '*')
        .map(symbol => getAjestentNumbers(symbol, numbers))
        .filter(adjestentNumbers => adjestentNumbers.length == 2)
        .map(adjestentNumbers => adjestentNumbers[0].value * adjestentNumbers[1].value)
        .sum();
    
    console.log("Part 2 solution: ", solution);
};

await part1();
await part2();