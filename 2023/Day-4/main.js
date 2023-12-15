import * as utils from '../../utils/index.js'

const parseNumberData = (numberData) => {
    return new Set(numberData.trim().split(/ +/).map(el => Number.parseInt(el)));
};

const parseScratchCard = (stringLine) => {
    const [header, data] = stringLine.split(':');
    const cardNumber = Number.parseInt(header.replace("Card ",""));
    const [winningNumbers, givenNumbers] = data.split(' | ').map(parseNumberData);
    return { number: cardNumber, winningNumbers, givenNumbers };
};

const part1 = async () => {
    const file = await utils.loadFile('./input');
    const scratchCards = file.split('\n').map(parseScratchCard);
    const solution = scratchCards
        .map(card => card.winningNumbers.intersect(card.givenNumbers).size)
        .filter(numberOfMatches => numberOfMatches > 0)
        .map(numberOfMatches => 2 ** (numberOfMatches-1))
        .sum();
    
    console.log("Part 1 solution: ", solution); 
};

const part2 = async () => {
    console.log("Part 2 solution: ", 0);
};

await part1();
await part2();