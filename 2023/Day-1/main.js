import * as utils from '../../utils/index.js'

function extractDigits(string) {
    const digits = string.split('')
        .filter(el => !isNaN(el));
    return Number.parseInt(digits.at(0) + digits.at(-1))
}

async function part1() {
    const file = await utils.loadFile('./input');
    const lines = file.split("\n");

    const solution = lines.map(extractDigits).sum();
        
    console.log("Part 1 solution: ", solution)
}

async function part2() {
    
}

await part1();
await part2();