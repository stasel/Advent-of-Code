import * as utils from '../../utils/index.js'

const extractDigits = (string) => {
    const digits = string.split('')
        .filter(el => !isNaN(el));
    return Number.parseInt(digits.at(0) + digits.at(-1))
};

const replaceDigitNames = (line) => {
    // Special replacement because of overlapping digit names. Example: oneight should be mapped to 18
    // There is a side affect of extra letters in the result line but we ignore letters for the calculating anyways
    const replaceMap = {'one': 'o1e', 'two': 't2o', 'three': 't3e', 'four': '4', 'five': '5e', 'six': '6', 'seven': '7n', 'eight': 'e8t', 'nine': 'n9e'};

    let processedLine = line;
    let oldLength = null;
    // Replace until there is nothing to replace
    while(processedLine.length != oldLength) {
        oldLength = processedLine.length;
        for (const digitName in replaceMap) {
            processedLine = processedLine.replaceAll(digitName, replaceMap[digitName]);
        }
    }
    return processedLine;
};

const part1 = async () => {
    const file = await utils.loadFile('./input');
    const lines = file.split("\n");

    const solution = lines.map(extractDigits).sum();
    console.log("Part 1 solution: ", solution);
};

const part2 = async () => {
    const file = await utils.loadFile('./input');
    const lines = file.split("\n");
    const solution = lines
        .map(replaceDigitNames)
        .map(extractDigits)
        .sum();
        
    console.log("Part 2 solution: ", solution);
};

await part1();
await part2();